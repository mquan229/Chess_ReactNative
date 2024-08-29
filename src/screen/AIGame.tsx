import { Chess } from "chess.js";
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
        const aiMove = findBestMove(chess, 2); // Tăng độ sâu của AI lên 2 để tăng chất lượng
        if (aiMove) {
          // Tóm gọn thông tin nước đi và log ra
            const { color, from, lan, piece, to } = aiMove;
            const AIMove = { color, from, lan, piece, to };
            console.log('AI Move:', AIMove);

            //lưu nước đi vào csdl
            saveMove({ type: 'AIMove', details: AIMove });

            // Lưu nước đi của AI vào lịch sử
            setHistory(prevHistory => [...prevHistory, { player: "b", move: aiMove }]);
          
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
    setHistory([]);
  }, [chess]);

  const onTurnBack = useCallback(() => {
    if (history.length > 0) {
      // Quay lại hai nước đi để đảm bảo quay lại cả người chơi và AI
      chess.undo(); // Undo nước đi của AI
      chess.undo(); // Undo nước đi của người chơi
      const lastMove = history.slice(-2, -1)[0];
      setHistory(history.slice(0, -2));
      
      setState({
        player: lastMove ? lastMove.player : "w",
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
    mode="ai"
    onTurnBack={onTurnBack} // Truyền hàm onTurnBack
    />
  );
};

export default AIGame;
