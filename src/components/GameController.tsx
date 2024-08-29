import { Chess } from "chess.js";
import React, { useCallback, useRef, useState } from "react";
import Board from "./Board";

interface GameControllerProps {
  mode: "competitive" | "ai" | "online";
}

const GameController = ({ mode }: GameControllerProps) => {
  const chess = useRef(new Chess()).current;
  const [state, setState] = useState({
    player: "w" as "w" | "b",
    board: chess.board(),
  });
  const [showWinModal, setShowWinModal] = useState(false);

  const onTurn = useCallback(() => {
    setState((prevState) => ({
      player: prevState.player === "w" ? "b" : "w",
      board: chess.board(),
    }));

    if (chess.isCheckmate()) {
      setShowWinModal(true);
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


  const onTurnBack = useCallback(() => {
    // Logic để quay lại nước đi trước
    chess.undo();
    setState({
      player: chess.turn() === "w" ? "b" : "w",
      board: chess.board(),
    });
  }, [chess]);

  return (
    <Board
      chess={chess}
      board={state.board}
      player={state.player}
      onTurn={onTurn}
      resetGame={resetGame}
      showWinModal={showWinModal}
      setShowWinModal={setShowWinModal}
      // onMove={onMove}
      onTurnBack={onTurnBack}
    />
  );
};

export default GameController;
