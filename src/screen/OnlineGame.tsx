import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Board from "../components/Board";

const OnlineGame = () => {
  const [board, setBoard] = useState<ReturnType<Chess["board"]>>([]);
  const [playerColor, setPlayerColor] = useState<"w" | "b">("w");
  const [currentTurn, setCurrentTurn] = useState<"w" | "b">("w");
  const [showWinModal, setShowWinModal] = useState(false);
  const chess = new Chess(); // Tạo một instance của Chess

  // Khởi tạo kết nối socket
  const socket = io("http://localhost:3001");

  useEffect(() => {
    socket.on("move", (move: string) => {
      chess.move(move);
      setBoard(chess.board());
      setCurrentTurn(chess.turn());
    });
  }, [chess, socket]);

  const handleMove = (move: string) => {
    if (chess.move(move)) {
      setBoard(chess.board());
      setCurrentTurn(chess.turn());
      socket.emit("move", move); // Gửi nước đi tới server
    }
  };

  const handleTurn = () => {
    // Logic chuyển lượt
  };

  const handleResetGame = () => {
    chess.reset();
    setBoard(chess.board());
    setCurrentTurn("w");
  };

  return (
    <Board
      board={board}
      player={playerColor}
      onMove={handleMove}
      currentTurn={currentTurn}
      onTurn={handleTurn} // Bổ sung prop onTurn
      resetGame={handleResetGame} // Bổ sung prop resetGame
      showWinModal={showWinModal} // Bổ sung prop showWinModal
      setShowWinModal={setShowWinModal} // Bổ sung prop setShowWinModal
      chess={chess} // Bổ sung prop chess
      mode="online" // Bổ sung prop mode
    />
  );
};

export default OnlineGame;
