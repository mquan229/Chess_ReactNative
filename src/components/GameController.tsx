import { Chess } from "chess.js";
import React, { createContext, useCallback, useContext, useState } from "react";

// Context để chia sẻ trạng thái giữa các component
const GameContext = createContext(null);

export const useGame = () => useContext(GameContext);

const GameController = ({ children }) => {
  const [chess] = useState(new Chess());
  const [state, setState] = useState({
    player: "w",
    board: chess.board(),
    selectedPiece: null,
    validMoves: [],
  });

  const onTurn = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      player: prevState.player === "w" ? "b" : "w",
      board: chess.board(),
    }));
  }, [chess]);

  const resetBoard = useCallback(() => {
    chess.reset();
    setState({
      player: "w",
      board: chess.board(),
      selectedPiece: null,
      validMoves: [],
    });
  }, [chess]);

  const selectPiece = useCallback((piece, fromSquare) => {
    const moves = chess.moves({ square: fromSquare, verbose: true });
    setState((prevState) => ({
      ...prevState,
      selectedPiece: piece,
      validMoves: moves.map((move) => move.to),
    }));
  }, [chess]);

  const movePiece = useCallback(
    (from, to) => {
      const move = chess.move({ from, to });
      if (move) {
        onTurn();
      }
      setState((prevState) => ({
        ...prevState,
        selectedPiece: null,
        validMoves: [],
        board: chess.board(),
      }));
    },
    [chess, onTurn]
  );

  const checkWinner = useCallback(() => {
    if (chess.isCheckmate()) {
      return state.player === "w" ? "Black Wins" : "White Wins";
    }
    return null;
  }, [chess, state.player]);

  return (
    <GameContext.Provider
      value={{
        state,
        selectPiece,
        movePiece,
        resetBoard,
        checkWinner,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameController;
