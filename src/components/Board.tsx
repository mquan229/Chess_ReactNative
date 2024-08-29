import { Chess, Square } from "chess.js";
import React, { useEffect, useState } from "react";
import { Button, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Background from "../screen/Background";
import { toPosition, toTranslation } from "../utils/Notation";
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
    backgroundColor: "rgba(0, 255, 0, 0.5)", // Màu xanh lá cho ô di chuyển mới
  },
  lastMove: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(255, 255, 0, 0.5)", // Màu vàng cho ô đứng trước đó
  },
  checkHighlight: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(255, 0, 0, 0.5)", // Màu đỏ khi bị chiếu tướng
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});

interface BoardProps {
  chess: Chess;
  board: ReturnType<Chess["board"]>;
  player: "w" | "b";
  onTurn: () => void;
  resetGame: () => void;
  showWinModal: boolean;
  setShowWinModal: (show: boolean) => void;
  onMove: (move: string) => void; // Thêm prop onMove
  onTurnBack: () => void;         // Thêm prop onTurnBack
  resetHighlights: () => void;
}
interface Highlight {
  square: Square;
  color: string;
}

const Board = ({
  chess,
  board,
  player,
  onTurn,
  resetGame,
  showWinModal,
  setShowWinModal,
  onMove,       // Thêm onMove ở đây
  onTurnBack,  // Thêm onTurnBack ở đây
  resetHighlights,
}: BoardProps) => {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  

  const handleCloseModal = () => {
    setShowWinModal(false);
    setHighlights([]);
    resetGame();
  };

  useEffect(() => {
    console.log("showWinModal:", showWinModal); {/* Kiểm tra giá trị của showWinModal*/}
  }, [showWinModal,resetHighlights]);

  const highlightMove = (from: Square, to: Square) => {
    const newHighlights: Highlight[] = [
      { square: from, color: "rgba(0, 255, 0, 0.15)" },
      { square: to, color: "rgba(0, 255, 0, 0.8)" },
    ];

    if (chess.inCheck()) {
      const kingSquare = chess.board().flatMap((row, y) =>
        row.map((piece, x) => {
          if (piece?.type === "k" && piece.color === chess.turn()) {
            const square = toPosition({ x: x * SIZE, y: y * SIZE });
            return { square, color: "rgba(255, 0, 0, 0.5)" };
          }
          return null;
        })
      ).find(Boolean);

      if (kingSquare) {
        setHighlights([...newHighlights.filter(h => h.square !== kingSquare.square), kingSquare as Highlight]);
        return;
      }
    }

    setHighlights(newHighlights);
  };

useEffect(() => {
  if (chess.inCheck()) {
    const kingSquare = chess.board().flatMap((row, y) =>
      row.map((piece, x) => {
        if (piece?.type === "k" && piece.color === chess.turn()) {
          return toPosition({ x: x * SIZE, y: y * SIZE });
        }
        return null;
      })
    ).find(Boolean);

    if (kingSquare) {
      setHighlights(prev => [...prev, { square: kingSquare as Square, color: "rgba(255, 0, 0, 0.5)" }]);
    }
  }
}, [chess]);


  return (
    <View style={styles.container}>
      <Background />
      {lastMove && (
        <View
          style={[
            styles.lastMove,
            { transform: [{ translateX: toTranslation(lastMove.from).x }, { translateY: toTranslation(lastMove.from).y }] },
          ]}
        />
      )}
      {highlights.map((highlight) => (
        <View
          key={highlight.square}
          style={[
            highlight.color === "rgba(255, 0, 0, 0.5)" ? styles.checkHighlight : styles.highlight,
            {
              transform: [
                { translateX: toTranslation(highlight.square).x },
                { translateY: toTranslation(highlight.square).y },
              ],
            },
          ]}
        />
      ))}
      {board &&
        board.map((row, y) =>
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
                  setShowWinModal={setShowWinModal}
                  onMove={onMove}
                  highlightMove={highlightMove}
                />
              );
            }
            return null;
          })
        )}
      <Button title="Reset Game" onPress={() => {
        resetGame();
        setHighlights([]);

      }} />
      <Button title="Turn Back" onPress={onTurnBack} />
      {/* Modal chiến thắng */}
      <Modal
        transparent={true}
        visible={showWinModal}
        onRequestClose={() => setShowWinModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Game Over! {player === "w" ? "White" : "Black"} wins!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Board;
