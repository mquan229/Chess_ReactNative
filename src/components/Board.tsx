import { Chess } from "chess.js";
import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import Background from "../screen/Background";
import { BOARD_SIZE } from "../utils/Notation";
import Piece from "./Piece";

const styles = StyleSheet.create({
  container: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  },
});

const Board = () => {
  const chess = new Chess(); // Khởi tạo đối tượng chess toàn cục
  const [state, setState] = useState({
    player: "w",
    board: chess.board(), // Khởi tạo với trạng thái ban đầu
  });

  const onTurn = useCallback(() => {
    setState((prevState) => {
      const newPlayer = prevState.player === "w" ? "b" : "w";
      chess.board(); // Cập nhật trạng thái của chess
      return {
        player: newPlayer,
        board: chess.board(),
      };
    });
  }, [chess]);

  return (
    <View style={styles.container}>
      <Background />
      {state.board.map((row, y) =>
        row.map((piece, x) => {
          if (piece !== null) {
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
