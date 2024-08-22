import { Chess } from "chess.js";
import React, { useCallback, useRef, useState } from "react";
import Board from "../components/Board";
import { findBestMove } from "../utils/AI";

const AIGame = () => {
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

    if (chess.turn() === "b") {
      const aiMove = findBestMove(chess, 3); // Sử dụng depth = 3 cho AI
      if (aiMove) {
        chess.move(aiMove);
        setState({
          player: "w",
          board: chess.board(),
        });
      }
    }
  }, [chess]);

  const resetGame = useCallback(() => {
    chess.reset();
    setState({
      player: "w",
      board: chess.board(),
    });
    setShowWinModal(false);
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
      mode="ai"
    />
  );
};

export default AIGame;
