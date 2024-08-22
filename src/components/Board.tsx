import { Chess, Square } from "chess.js";
import React, { useEffect, useState } from "react";
import { Button, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
  board: ReturnType<Chess["board"]>;
  player: "w" | "b";
  onTurn: () => void;
  resetGame: () => void;
  showWinModal: boolean;
  setShowWinModal: (show: boolean) => void;
  chess: Chess;
  mode: "competitive" | "ai" | "online";
}

const Board = ({
  board,
  player,
  onTurn,
  resetGame,
  showWinModal,
  setShowWinModal,
  chess,
  mode,
}: BoardProps) => {
  const [highlights, setHighlights] = useState<Square[]>([]);

  const handleCloseModal = () => {
    setShowWinModal(false);
    resetGame();
  };

  useEffect(() => {
    console.log("showWinModal:", showWinModal); // Kiểm tra giá trị của showWinModal
  }, [showWinModal]);


  return (
    <View style={styles.container}>
      <Background />
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

      <Modal
        transparent={true}
        visible={showWinModal}
        onRequestClose={() => setShowWinModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Game Over! {player === "w" ? "Black" : "White"} wins!</Text>
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
