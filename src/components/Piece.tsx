import { Chess, Square } from "chess.js";
import React, { useCallback, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Vector } from "react-native-redash";
import { SIZE, toPosition, toTranslation } from "../utils/Notation";
import PromotionPopup from "./PromotionPopup";
import convertMoveToNotation from "./convertMoveToNotation";

const styles = StyleSheet.create({
  piece: {
    width: SIZE,
    height: SIZE,
  },
});

type Player = "b" | "w";
type Type = "q" | "r" | "n" | "b" | "k" | "p";
type Piece = `${Player}${Type}`;
type Pieces = Record<Piece, ReturnType<typeof require>>;
export const PIECES: Pieces = {
  br: require("../assets/chess/br.png"),
  bp: require("../assets/chess/bp.png"),
  bn: require("../assets/chess/bn.png"),
  bb: require("../assets/chess/bb.png"),
  bq: require("../assets/chess/bq.png"),
  bk: require("../assets/chess/bk.png"),
  wr: require("../assets/chess/wr.png"),
  wn: require("../assets/chess/wn.png"),
  wb: require("../assets/chess/wb.png"),
  wq: require("../assets/chess/wq.png"),
  wk: require("../assets/chess/wk.png"),
  wp: require("../assets/chess/wp.png"),
};

interface PieceProps {
  id: Piece;
  startPosition: Vector;
  chess: Chess;
  onTurn: () => void;
  enabled: boolean;
  setShowWinModal: (show: boolean) => void;
  onMove: (move: string) => void;
  highlightMove: (from: Square, to: Square) => void;
}

const Piece = ({ 
  id,
  startPosition, 
  chess, 
  onTurn, 
  enabled, 
  setShowWinModal, 
  onMove, 
  highlightMove }
  : PieceProps) => {
  const isGestureActive = useSharedValue(false);
  const offsetX = useSharedValue(startPosition.x * SIZE);
  const offsetY = useSharedValue(startPosition.y * SIZE);
  const translateX = useSharedValue(offsetX.value);
  const translateY = useSharedValue(offsetY.value);

  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [promotionMove, setPromotionMove] = useState<{ from: Square; to: Square } | null>(null);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);


  const movePiece = useCallback(
    (to: Square) => {
      const moves = chess.moves({ verbose: true });
      const from = toPosition({ x: offsetX.value, y: offsetY.value });
      const move = moves.find((m) => m.from === from && m.to === to);
  
      if (move) {
        console.log("Move object: ", move); // Kiểm tra dữ liệu move
        // Nếu di chuyển là thăng cấp, mở popup thăng cấp
        if (move.promotion) {
          setPromotionMove({ from, to });
          setShowPromotionModal(true);
          isGestureActive.value = false;
          return;
        }
  
        // Cập nhật lịch sử di chuyển
        setMoveHistory(prevHistory => [
          ...prevHistory, 
          convertMoveToNotation(move) // Sử dụng hàm convertMoveToNotation
        ]);
  
        // Di chuyển quân cờ
        chess.move({ from, to });
        runOnJS(onMove)(convertMoveToNotation(move));
        runOnJS(onTurn)();
        highlightMove(from, to);
  
        // Kiểm tra tình trạng chiếu tướng
        if (chess.isCheckmate()) {
          setShowWinModal(true);
        }
  
        // Cập nhật animation
        const { x, y } = toTranslation(move.to);
        translateX.value = withTiming(x, {}, () => (offsetX.value = x));
        translateY.value = withTiming(y, {}, () => (offsetY.value = y));
        isGestureActive.value = false;
      }
    },
    [chess, isGestureActive, offsetX, offsetY, translateX, translateY, onTurn, setShowWinModal, onMove]
  );

  const handlePromotion = useCallback(
    (piece: string) => {
      if (promotionMove) {
        // Thực hiện di chuyển thăng cấp
        chess.move({
          from: promotionMove.from,
          to: promotionMove.to,
          promotion: piece,
        });
  
        // Cập nhật lịch sử di chuyển
        setMoveHistory(prevHistory => [...prevHistory, `${promotionMove.from}-${promotionMove.to}`]);
  
        // Đóng popup và xóa thông tin di chuyển
        setShowPromotionModal(false);
        setPromotionMove(null);
  
        runOnJS(onTurn)(); // Thông báo cho component cha về lượt di chuyển
      }
    },
    [chess, promotionMove, onTurn]
  );

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      isGestureActive.value = true;
    })
    .onUpdate((event) => {
      translateX.value = offsetX.value + event.translationX;
      translateY.value = offsetY.value + event.translationY;
    })
    .onEnd(() => {
      runOnJS(movePiece)(toPosition({ x: translateX.value, y: translateY.value }));
    });

  const style = useAnimatedStyle(() => ({
    position: "absolute",
    zIndex: isGestureActive.value ? 100 : 10,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={style}>
          <Image source={PIECES[id]} style={styles.piece} />
        </Animated.View>
      </GestureDetector>

      {/* Popup thăng cấp */}
      {showPromotionModal && (
        <PromotionPopup isVisible={showPromotionModal} onSelect={handlePromotion} />
      )}
    </>
  );
};

export default Piece;
