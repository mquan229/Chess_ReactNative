import { Chess } from "chess.js";
import React, { useCallback, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Background from "../screen/Background";
import Piece from "./Piece";

const { width } = Dimensions.get("window");
const SIZE = width / 8;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: width,
  },
});

const Board = () => {
  const chess = useRef(new Chess()).current;
  const [state, setState] = useState({
    player: "w",
    board: chess.board(),
  });

  const onTurn = useCallback(() => {
    setState({
      player: state.player === "w" ? "b" : "w",
      board: chess.board(),
    });
  }, [chess, state.player]);

  return (
    <View style={styles.container}>
      <Background />
      {state.board.map((row, y) =>
        row.map((piece, x) => {
          if (piece) {
            return (
              <Piece
                key={`${x}-${y}`}
                id={`${piece.color}${piece.type}` as const}
                startPosition={{ x, y }}
                chess={chess}
                onTurn={onTurn}
                enabled={state.player === piece.color}
              />
            );
          }
          return null;
        })
      )}
    </View>
  );
};

export default Board;
