import { Chess, Move, Square } from "chess.js";
import React, { useCallback } from "react";
import { Image, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue
} from "react-native-reanimated";
import { Vector } from "react-native-redash";
import { SIZE, toPosition, toTranslation } from "../utils/Notation";

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
}

const Piece = ({ id, startPosition, chess, onTurn, enabled }: PieceProps) => {
  const isGestureActive = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const translateX = useSharedValue(startPosition.x * SIZE);
  const translateY = useSharedValue(startPosition.y * SIZE);

  function convertToSquare(position: { row: number; col: number }): Square {
    'worklet';
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const file = files[position.col];
    const rank = (8 - position.row).toString();
    return `${file}${rank}` as Square;
  }

  const movePiece = useCallback(
    (to: Square) => {
      runOnJS(() => {
        console.log(`Attempting to move to ${to}`);
        const moves: Move[] = chess.moves({ verbose: true }) as Move[];
        const fromPosition = toPosition({ x: offsetX.value, y: offsetY.value });
        const from = convertToSquare(fromPosition);
        const move = moves.find((m) => m.from === from && m.to === to);
        if (move) {
          chess.move(move.san);
          onTurn(); // Cập nhật trạng thái bàn cờ và chuyển lượt
        } else {
          console.log(`Invalid move from ${from} to ${to}`);
        }
      })();
    },
    [chess, offsetX, offsetY, onTurn]
  );

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
      isGestureActive.value = true;
    })
    .onUpdate((event) => {
      translateX.value = offsetX.value + event.translationX;
      translateY.value = offsetY.value + event.translationY;
    })
    .onEnd(() => {
      const position = toPosition({ x: translateX.value, y: translateY.value });
      const square = convertToSquare(position);
      runOnJS(movePiece)(square);
      isGestureActive.value = false; // Reset trạng thái
    });

  const style = useAnimatedStyle(() => ({
    position: "absolute",
    zIndex: isGestureActive.value ? 100 : 10,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const original = useAnimatedStyle(() => ({
    position: "absolute",
    width: SIZE,
    height: SIZE,
    zIndex: 0,
    backgroundColor: isGestureActive.value ? "rgba(255, 255, 0, 0.5)" : "transparent",
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value },
    ],
  }));

  const underlay = useAnimatedStyle(() => {
    const position = toPosition({ x: translateX.value, y: translateY.value });
    const translation = toTranslation(position);
    return {
      position: "absolute",
      width: SIZE,
      height: SIZE,
      zIndex: 0,
      backgroundColor: isGestureActive.value ? "rgba(255, 255, 0, 0.5)" : "transparent",
      transform: [
        { translateX: translation.x },
        { translateY: translation.y },
      ],
    };
  });

  return (
    <>
      <Animated.View style={original} />
      <Animated.View style={underlay} />
      <GestureDetector gesture={panGesture}>
        <Animated.View style={style}>
          <Image source={PIECES[id]} style={styles.piece} />
        </Animated.View>
      </GestureDetector>
    </>
  );
};

export default Piece;