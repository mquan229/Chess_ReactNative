import { Chess } from "chess.js";
import { useCallback, useState } from "react";
import convertMoveToNotation from "./convertMoveToNotation";

export const useMoveHistory = (chess: Chess, onTurn: () => void) => {
  const [history, setHistory] = useState<{ move: string, fen: string, moveNumber: number, children?: any[] }[]>([]);
  const [expandedMoves, setExpandedMoves] = useState<Set<number>>(new Set());
  const [currentBranchIndex, setCurrentBranchIndex] = useState<number>(-1);

  const addMove = useCallback((move: string | { move: string, fen: string }) => {
    console.log("Adding move:", move);
    
    // Kiểm tra nếu move là một chuỗi và chuyển đổi thành đối tượng
    const moveObject = typeof move === 'string' ? { move, fen: chess.fen() } : move;
  
    setHistory(prevHistory => {
      const newHistory = [...prevHistory];
      const newMove = {
        move: moveObject.move,
        fen: moveObject.fen,
        moveNumber: chess.history().length,
        children: [],
      };
  
      console.log("Current branch index: ", currentBranchIndex);
  
      if (currentBranchIndex === -1) {
        newHistory.push(newMove);
      } else {
        const parentMove = newHistory[currentBranchIndex];
        parentMove.children = parentMove.children || [];
        parentMove.children.push(newMove);
      }
  
      console.log("New history:", newHistory);
      return newHistory;
    });
  }, [currentBranchIndex, chess]);
  

  const handleBranchSelection = (index: number) => {
    const fen = history[index]?.fen; // Lấy FEN từ lịch sử nước đi dựa trên index
    if (fen) {
      setCurrentBranchIndex(index);
      undoToMove(fen); // Truyền FEN (kiểu string) vào undoToMove
    } else {
      console.error("FEN không tồn tại cho index này");
    }
  };

  const undoToMove = (fen: string) => {
  chess.load(fen);  // Reset bàn cờ về trạng thái FEN được cung cấp
  onTurn();  // Gọi lại hàm onTurn để cập nhật UI
};
  
const addChildMove = (parentIndex: number, move: any) => {
  setHistory(prevHistory => {
    const newHistory = [...prevHistory];
    const parentMove = newHistory[parentIndex];

    if (parentMove) {
      console.log("Parent Move:", parentMove);
      console.log("Move to add:", move);

      let notationMove: string;
      if (typeof move === 'string') {
        console.log("Move is already a string notation:", move);
        notationMove = move;
      } else {
        notationMove = convertMoveToNotation(move);
        console.log("Converted Move Notation:", notationMove);
      }

      if (parentMove.children) {
        parentMove.children.push({ move: notationMove, fen: chess.fen() });
      } else {
        parentMove.children = [{ move: notationMove, fen: chess.fen() }];
      }

      console.log("Updated Parent Move:", parentMove);
    }

    console.log("Updated History:", newHistory);
    return newHistory;
  });
};


  const toggleExpand = (index: number) => {
    setExpandedMoves(prev => {
      const newExpandedMoves = new Set(prev);
      if (newExpandedMoves.has(index)) {
        newExpandedMoves.delete(index);
      } else {
        newExpandedMoves.add(index);
      }
      return newExpandedMoves;
    });
  };

  return { history, setHistory, addMove, undoToMove,setCurrentBranchIndex, 
    addChildMove, expandedMoves, toggleExpand, handleBranchSelection };
};