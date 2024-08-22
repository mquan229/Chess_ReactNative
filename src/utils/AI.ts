import { Chess, Move } from "chess.js";

const evaluateBoard = (chess: Chess): number => {
  const board = chess.board();
  let totalEvaluation = 0;

  for (const row of board) {
    for (const piece of row) {
      if (piece) {
        const pieceValue = getPieceValue(piece.type);
        totalEvaluation += piece.color === "w" ? pieceValue : -pieceValue;
      }
    }
  }
  return totalEvaluation;
};

const getPieceValue = (piece: string): number => {
  switch (piece) {
    case "p":
      return 10;
    case "r":
      return 50;
    case "n":
      return 30;
    case "b":
      return 30;
    case "q":
      return 90;
    case "k":
      return 900;
    default:
      return 0;
  }
};

export const minimax = (
  chess: Chess,
  depth: number,
  isMaximizingPlayer: boolean,
  alpha: number,
  beta: number
): number => {
  if (depth === 0 || chess.isGameOver()) {
    return evaluateBoard(chess);
  }

  const moves = chess.moves({ verbose: true });

  if (isMaximizingPlayer) {
    let maxEval = -Infinity;

    for (const move of moves) {
      chess.move(move);
      const evaluation = minimax(chess, depth - 1, false, alpha, beta); // Đổi tên biến từ eval thành evaluation
      chess.undo();
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) {
        break;
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;

    for (const move of moves) {
      chess.move(move);
      const evaluation = minimax(chess, depth - 1, true, alpha, beta); // Đổi tên biến từ eval thành evaluation
      chess.undo();
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) {
        break;
      }
    }
    return minEval;
  }
};

export const findBestMove = (chess: Chess, depth: number): Move | null => {
  let bestMove: Move | null = null;
  let bestValue = -Infinity;

  const moves = chess.moves({ verbose: true });

  for (const move of moves) {
    chess.move(move);
    const moveValue = minimax(chess, depth - 1, false, -Infinity, Infinity); // Đổi tên biến từ eval thành evaluation
    chess.undo();

    if (moveValue > bestValue) {
      bestValue = moveValue;
      bestMove = move;
    }
  }

  return bestMove;
};
