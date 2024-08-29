import { Chess, Move } from "chess.js";

const evaluateBoard = (chess: Chess): number => {
  const board = chess.board();
  let totalEvaluation = 0;

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const piece = board[y][x];
      if (piece) {
        const pieceValue = getPieceValue(piece.type);
        const positionalValue = getPiecePositionValue(piece.type, piece.color, x, y);
        const evaluation = piece.color === "w" ? pieceValue + positionalValue : -(pieceValue + positionalValue);
        totalEvaluation += evaluation;
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

const getPiecePositionValue = (piece: string, color: string, x: number, y: number): number => {
  // Vị trí chiến lược cho từng loại quân cờ
  const pawnEvalWhite = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [5, 10, 10, -20, -20, 10, 10, 5],
    [5, -5, -10, 0, 0, -10, -5, 5],
    [0, 0, 0, 20, 20, 0, 0, 0],
    [5, 5, 10, 25, 25, 10, 5, 5],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const pawnEvalBlack = pawnEvalWhite.slice().reverse(); // Đánh giá ngược lại cho quân đen

  // Các mảng đánh giá vị trí cho các loại quân khác có thể được thêm vào tương tự

  let piecePositionValue;
  switch (piece) {
    case "p":
      piecePositionValue = color === "w" ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x];
      break;
    // Các trường hợp khác cho các loại quân khác như mã, tượng, xe, hậu, vua
    default:
      piecePositionValue = 0;
  }

  return piecePositionValue;
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
      const evaluation = minimax(chess, depth - 1, false, alpha, beta);
      chess.undo();
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) {
        break; // Cắt tỉa beta
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      chess.move(move);
      const evaluation = minimax(chess, depth - 1, true, alpha, beta);
      chess.undo();
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) {
        break; // Cắt tỉa alpha
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
    const moveValue = minimax(chess, depth - 1, false, -Infinity, Infinity);
    chess.undo();

    if (moveValue > bestValue) {
      bestValue = moveValue;
      bestMove = move;
    }
  }

  return bestMove;
};
