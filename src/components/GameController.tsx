// GameController.tsx
import { Chess } from "chess.js";
import React, { useCallback, useRef, useState } from "react";
import Board from "./Board";

const GameController = () => {
    const chess = useRef(new Chess()).current;
    const [state, setState] = useState<{
      player: "w" | "b";
      board: ReturnType<Chess["board"]>;
    }>({
      player: "w",
      board: chess.board(),
    });
  
    const onTurn = useCallback(() => {
      setState({
        player: state.player === "w" ? "b" : "w",
        board: chess.board(),
      });
    }, [chess, state.player]);
  
    const resetGame = useCallback(() => {
      chess.reset();
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
        chess={chess}
      />
    );
  };

export default GameController;
