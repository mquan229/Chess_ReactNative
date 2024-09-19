import { Chess } from "chess.js";
import { useCallback, useState } from "react";

export const useMoveHistory = (chess: Chess, onTurn: () => void) => {
  const [history, setHistory] = useState<{ move: string, fen: string, moveNumber: number, children?: any[] }[]>([]);
  const [expandedMoves, setExpandedMoves] = useState<Set<number>>(new Set());
  const [currentBranchIndex, setCurrentBranchIndex] = useState<number>(-1);

  const addMove = useCallback((move: string) => {
    setHistory(prevHistory => {
      const newHistory = [...prevHistory];
      const newMove = {
        move,
        fen: chess.fen(),
        moveNumber: chess.history().length,
        children: [],
      };
  
      console.log("Adding move: ", move); // Log nước đi được thêm vào
      console.log("Current branch index: ", currentBranchIndex); // Log nhánh hiện tại
  
      if (currentBranchIndex === -1) {
        newHistory.push(newMove);
      } else {
        const parentMove = newHistory[currentBranchIndex];
        parentMove.children = parentMove.children || [];
        parentMove.children.push(newMove);
      }
  
      return newHistory;
    });
  }, [currentBranchIndex, chess]);
  


  const handleBranchSelection = (index: number) => {
    setCurrentBranchIndex(index);
    undoToMove(index); 
  };

  const undoToMove = (index: number) => {
    chess.load(history[index].fen); // Reset the board to the FEN of the selected move
    setCurrentBranchIndex(index); // Update the branch index
    onTurn();
  };
  
  const addChildMove = (parentIndex: number, move: string) => {
    setHistory(prevHistory => {
      const newHistory = [...prevHistory];
      const parentMove = newHistory[parentIndex];
      if (parentMove) {
        if (parentMove.children) {
          parentMove.children.push({ move });
        } else {
          parentMove.children = [{ move }];
        }
      }
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
