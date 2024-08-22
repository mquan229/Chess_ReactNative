import { Chess, Square } from "chess.js";
import React, { useCallback, useState } from "react";
import { Alert, Button, Dimensions, StyleSheet, View } from "react-native";
import Background from "../screen/Background";
import { toTranslation } from "../utils/Notation";
import Piece from "./Piece";

const { width } = Dimensions.get("window");
const SIZE = width / 8;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: width,
  },
  highlight: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(0, 255, 0, 0.5)",
  },
});

const Board = () => {
  const [chess] = useState(new Chess());
  const [player, setPlayer] = useState<"w" | "b">("w");
  const [board, setBoard] = useState(chess.board());
  const [highlights, setHighlights] = useState<Square[]>([]);

  const onTurn = useCallback(() => {
    setPlayer((prev) => (prev === "w" ? "b" : "w"));
    setBoard(chess.board());

    if (chess.isCheckmate()) {
      Alert.alert("Game Over", `${player === "w" ? "Black" : "White"} wins!`);
    }
  }, [chess, player]);

  const highlightMoves = useCallback((moves: Square[]) => {
    setHighlights(moves);
  }, []);

  const resetGame = useCallback(() => {
    chess.reset();
    setPlayer("w");
    setBoard(chess.board());
    setHighlights([]);
  }, [chess]);

  return (
    <View style={styles.container}>
      <Background />
      {board.map((row, y) =>
        row.map((piece, x) => {
          if (piece) {
            return (
              <Piece
                key={`${x}-${y}`}
                id={`${piece.color}${piece.type}` as const}
                startPosition={{ x, y }}
                chess={chess}
                onTurn={onTurn}
                enabled={player === piece.color}
              />
            );
          }
          return null;
        })
      )}
      {highlights.map((highlight) => {
        const { x, y } = toTranslation(highlight);
        return <View key={`${x}-${y}`} style={[styles.highlight, { left: x, top: y }]} />;
      })}
      <Button title="Reset Game" onPress={resetGame} />
    </View>
  );
};

export default Board;
