import { Chess, Square } from "chess.js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Board from "../components/Board";
import { useMoveHistory } from "../components/MoveHistory"; // Import useMoveHistory
import { findBestMove } from "../utils/AI";
import { saveMove } from "../utils/api";

const AIGame = () => {
  const chess = useRef(new Chess()).current;
  const [state, setState] = useState({
    player: "w" as "w" | "b",
    board: chess.board(),
  });
  const [showWinModal, setShowWinModal] = useState(false);
  const { addMove, history } = useMoveHistory(chess, () => onTurn());

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
    // Clear highlights in the board (implementation depends on your logic)
  }, []);

  const highlightMove = useCallback((from: Square, to: Square) => {
    // Implement move highlighting logic here if needed
  }, []);

  useEffect(() => {
    if (state.player === "b" && !chess.isGameOver()) {
      setTimeout(() => {
        const aiMove = findBestMove(chess, 2);
        if (aiMove) {
          const { color, from, lan, piece, to } = aiMove;
          console.log("Nước đi của AI: ", lan);
  
          // Highlight nước đi của AI trước khi cập nhật trạng thái
          highlightMove(from, to);
  
          // Lưu nước đi AI vào API
          saveMove({ type: 'AIMove', details: { color, from, lan, piece, to } });
  
          chess.move(aiMove);

          // Lưu nước đi AI vào lịch sử
          addMove(lan); // Gọi addMove để thêm nước đi AI vào lịch sử
  
          setState({
            player: "w",
            board: chess.board(),
          });
  
        }
      }, 200);
    }
  }, [state.player, chess, addMove, highlightMove]); // Đảm bảo highlightMove có trong dependencies
  

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
    chess.undo(); // Undo AI move
    chess.undo(); // Undo player move
    setState({
      player: "w",
      board: chess.board(),
    });
  }, [chess]);

  return (
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
      highlightMove={highlightMove}
    />
  );
};

export default AIGame;
