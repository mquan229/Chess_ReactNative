import { Square } from "chess.js";
import { Dimensions } from "react-native";
import { Vector } from "react-native-redash";

const { width } = Dimensions.get("window");
export const SIZE = width / 8;

export const toTranslation = (to: Square) => {
  "worklet";
  const col = to.charCodeAt(0) - "a".charCodeAt(0);
  const row = 8 - parseInt(to[1], 10);
  return {
    x: col * SIZE,
    y: row * SIZE,
  };
};

export const toPosition = ({ x, y }: Vector): Square => {
  "worklet";
  const col = String.fromCharCode(97 + Math.round(x / SIZE));
  const row = `${8 - Math.round(y / SIZE)}`;
  return `${col}${row}` as Square;
};
