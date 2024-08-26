import { Chess } from "chess.js";
import React, { useCallback, useEffect, useRef, useState } from "react";
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

    // Thay đổi người chơi
    setState((prevState) => ({
      player: prevState.player === "w" ? "b" : "w",
      board: chess.board(),
    }));
  }, [chess]);

  useEffect(() => {
    // Kiểm tra nếu đến lượt AI (đối thủ) thì thực hiện nước đi của AI
    if (state.player === "b" && !chess.isGameOver()) {
      setTimeout(() => {
        const aiMove = findBestMove(chess, 2); // Sử dụng depth = 2 cho AI để giảm lag
        if (aiMove) {
          chess.move(aiMove);
          setState({
            player: "w",
            board: chess.board(),
          });
        }
      }, 200); // Thêm độ trễ nhỏ để tạo cảm giác mượt mà
    }
  }, [state.player, chess]);

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
