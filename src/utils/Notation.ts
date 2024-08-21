import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
export const BOARD_SIZE = width * 0.8; // Adjust the factor based on your design
export const SIZE = BOARD_SIZE / 8  ; // Chessboard has 8x8 squares

export const toPosition = (translation: { x: number; y: number }): { row: number; col: number } => {
  'worklet';
  const col = Math.floor(translation.x / SIZE);
  const row = Math.floor(translation.y / SIZE);
  return { row, col };
};

export const toTranslation = (position: { row: number; col: number }) => {
  'worklet';
  return { x: position.col * SIZE, y: position.row * SIZE };
};
