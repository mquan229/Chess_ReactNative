import { Chess, Square } from "chess.js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import Arrow from "../components/Arrow"; // Import Arrow component
import Board from "../components/Board";
import convertMoveToNotation from "../components/convertMoveToNotation";
import { useMoveHistory } from "../components/MoveHistory";
import { findBestMove } from "../utils/AI";
import { saveMove } from "../utils/api";
import { toTranslation } from "../utils/Notation";

interface Highlight {
  square: Square;
  color: string;
}

const AIGame = () => {
  const chess = useRef(new Chess()).current;
  const [state, setState] = useState({
    player: "w" as "w" | "b",
    board: chess.board(),
  });
  const [showWinModal, setShowWinModal] = useState(false);
  const { addMove, history } = useMoveHistory(chess, () => onTurn());
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [arrowCoordinates, setArrowCoordinates] = useState<{ fromX: number; fromY: number; toX: number; toY: number } | null>(null);

  const onTurn = useCallback(() => {
    if (chess.isGameOver()) {
      setShowWinModal(true);
      return;
    }
    setState((prevState) => ({
      player: prevState.player === "w" ? "b" : "w",
      board: chess.board(),
    }));
  }, [chess]);

  const resetHighlights = useCallback(() => {
    setHighlights([]);
    setLastMove(null);
    setArrowCoordinates(null); // Reset arrow when resetting highlights
  }, []);

  const highlightMoveAI = useCallback((from: Square, to: Square) => {
    // Highlight chỉ áp dụng cho ô from và to, không hiển thị arrow
    const newHighlights: Highlight[] = [
      { square: from, color: "rgba(0, 255, 0, 0.15)" },
      { square: to, color: "rgba(0, 255, 0, 0.8)" },
    ];
  
    if (chess.inCheck()) {
      const kingSquare = chess.board().flatMap((row, y) =>
        row.map((piece, x) => {
          if (piece?.type === "k" && piece.color === chess.turn()) {
            return `${'abcdefgh'[x]}${8 - y}` as Square;
          }
          return null;
        })
      ).find(Boolean) as Square | null;
  
      if (kingSquare) {
        newHighlights.push({ square: kingSquare, color: "rgba(255, 0, 0, 0.5)" });
  
        // Arrow coordinates - king being checked to checking piece
        const fromCoords = { x: 'abcdefgh'.indexOf(to[0]), y: 8 - parseInt(to[1], 10) };  // Ô đến của quân chiếu
        const toCoords = { x: 'abcdefgh'.indexOf(kingSquare[0]), y: 8 - parseInt(kingSquare[1], 10) };  // Ô của vua bị chiếu
        setArrowCoordinates({
          fromX: fromCoords.x * 50 + 25,
          fromY: fromCoords.y * 50 + 25,
          toX: toCoords.x * 50 + 25,
          toY: toCoords.y * 50 + 25,
        });
      }
    }
  
    setHighlights(newHighlights);
    setLastMove({ from, to });
  }, [chess]);


  useEffect(() => {
    if (state.player === "b" && !chess.isGameOver()) {
      setTimeout(() => {
        const aiMove = findBestMove(chess, 2);
        if (aiMove) {
          const { from, to } = aiMove;
          chess.move(aiMove);
          const notationMove = convertMoveToNotation(aiMove);
  
          // Thêm nước đi của AI vào lịch sử
          addMove(notationMove);  // Thêm nước đi của AI vào lịch sử sectionList
          console.log ('==============AIMOVE',aiMove)

          setState({
            player: "w",
            board: chess.board(),
          });
          highlightMoveAI(from, to); // Highlight move
          saveMove({ type: 'AIMove', details: aiMove });
        }
      });//them do tre vao neu can thiet
    }
  }, [state.player, chess, addMove, highlightMoveAI]);
  
  console.log ('History after adding AI move:',history)
 
  const resetGame = useCallback(() => {
    chess.reset();
    setState({
      player: "w",
      board: chess.board(),
    });
    setShowWinModal(false);
    resetHighlights();
  }, [chess, resetHighlights]);

  const onTurnBack = useCallback(() => {
    chess.undo();
    chess.undo();
    setState({
      player: "w",
      board: chess.board(),
    });
    resetHighlights();
  }, [chess, resetHighlights]);

  
  return (
    <>
      <Board
        board={state.board}
        player={state.player}
        onTurn={onTurn}
        resetGame={resetGame}
        showWinModal={showWinModal}
        setShowWinModal={setShowWinModal}
        chess={chess}
        onTurnBack={onTurnBack}
        resetHighlights={resetHighlights}
        onMove={() => {}} 
        highlights={highlights}
        lastMove={lastMove}
      />
      {arrowCoordinates && (
        <Arrow
          fromX={arrowCoordinates.fromX}
          fromY={arrowCoordinates.fromY}
          toX={arrowCoordinates.toX}
          toY={arrowCoordinates.toY}
        />
      )}
      {lastMove && (
        <View
          style={[
            {
              position: "absolute",
              width: 50, // Kích thước của một ô cờ (có thể điều chỉnh dựa vào kích thước board của bạn)
              height: 50,
              backgroundColor: "rgba(0, 255, 0, 0.3)", // Màu highlight cho lastMove
              transform: [
                { translateX: toTranslation(lastMove.from).x },
                { translateY: toTranslation(lastMove.from).y },
              ],
            },
          ]}
        />
      )}

      {highlights.map((highlight) => (
        <View
          key={highlight.square}
          style={[
            {
              position: "absolute",
              width: 50, // Kích thước của ô cờ
              height: 50,
              backgroundColor: highlight.color, // Sử dụng màu sắc từ đối tượng highlight
              transform: [
                { translateX: toTranslation(highlight.square).x },
                { translateY: toTranslation(highlight.square).y },
              ],
            },
          ]}
        />
      ))}
    </>
  );
};

export default AIGame;
