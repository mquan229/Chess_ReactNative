import { Chess, Square } from "chess.js";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Board from "../components/Board";
import { findBestMove } from "../utils/AI";
import { saveMove } from "../utils/api";

const AIGame = () => {
  const [history, setHistory] = useState<{ player: string; move: any }[]>([]);
  const chess = useRef(new Chess()).current;
  const [state, setState] = useState({
    player: "w" as "w" | "b",
    board: chess.board(),
  });
  const [showWinModal, setShowWinModal] = useState(false);

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
          saveMove({ type: 'AIMove', details: { color, from, lan, piece, to } });
          setHistory(prevHistory => [...prevHistory, { player: "b", move: aiMove }]);
          chess.move(aiMove);
          setState({
            player: "w",
            board: chess.board(),
          });

          if (chess.inCheck()) {
            highlightMove(aiMove.from, aiMove.to);
          }
        }
      }, 200);
    }
  }, [state.player, chess]);

  const resetGame = useCallback(() => {
    chess.reset();
    setState({
      player: "w",
      board: chess.board(),
    });
    setShowWinModal(false);
    setHistory([]);
    resetHighlights();
  }, [chess, resetHighlights]);

  const onTurnBack = useCallback(() => {
    if (history.length > 0) {
      chess.undo(); // Undo AI move
      chess.undo(); // Undo player move
      setHistory(history.slice(0, -2));
      setState({
        player: "w",
        board: chess.board(),
      });
    }
  }, [chess, history]);

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
