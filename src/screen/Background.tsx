import React from "react";
import { Text, View } from "react-native";
import styles from '../styles/BackgroundStyle';

const WHITE = "rgb(100, 133, 68)";
const BLACK = "rgb(230, 233, 198)";

interface BaseProps {
  white: boolean;
}

interface RowProps extends BaseProps {
  row: number;
}

interface SquareProps extends RowProps {
  col: number;
}

const Square = ({ white, row, col }: SquareProps) => {
  const backgroundColor = white ? WHITE : BLACK;
  const color = white ? BLACK : WHITE;
  const textStyle = { fontWeight: "500" as const, color };
  return (
    <View style={[styles.square, { backgroundColor }]}>
      <Text style={[textStyle, styles.rowLabel, { opacity: col === 0 ? 1 : 0 }]}>
        {"" + (8 - row)}
      </Text>
      {row === 7 && (
        <Text style={[textStyle, styles.colLabel]}>
          {String.fromCharCode(97 + col)}
        </Text>
      )}
    </View>
  );
};

const Row = ({ white, row }: RowProps) => {
  const offset = white ? 0 : 1;
  return (
    <View style={styles.row}>
      {new Array(8).fill(0).map((_, i) => (
        <Square row={row} col={i} key={i} white={(i + offset) % 2 === 1} />
      ))}
    </View>
  );
};

const Background = () => {
  return (
    <View style={styles.chessboard}>
      {new Array(8).fill(0).map((_, i) => (
        <Row key={i} white={i % 2 === 0} row={i} />
      ))}
    </View>
  );
};

export default Background;