import { Chess, Square } from "chess.js";
import React, { useEffect, useState } from "react";
import { Button, Dimensions, Modal, SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Collapsible from 'react-native-collapsible';
import Ionicons from "react-native-vector-icons/Ionicons";
import Background from "../screen/Background";
import { toPosition, toTranslation } from "../utils/Notation";
import Arrow from "./Arrow";
import { useMoveHistory } from "./MoveHistory";
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
  lastMove: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(255, 255, 0, 0.5)",
  },
  checkHighlight: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(255, 0, 0, 0.5)",
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
  moveHistoryList: {
    height : '58%',
    borderWidth :1,
    borderColor : "red"
  },
  moveText: {
    fontSize: 14,
    padding: 10,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
});

interface BoardProps {
  chess: Chess;
  board: ReturnType<Chess["board"]>;
  player: "w" | "b";
  onTurn: () => void;
  resetGame?: () => void;
  showWinModal: boolean;
  setShowWinModal: (show: boolean) => void;
  onMove: (move: string) => void;
  onTurnBack: () => void;
  resetHighlights: () => void;
  highlightMove: (from: Square, to: Square) => void;
  mode?: string;
}

interface Highlight {
  square: Square;
  color: string;
}

interface MoveItem {
  move: string;
  children?: MoveItem[];
}

interface SectionMoveItem {
  title: string;
  data: MoveItem[];
  index: number;
}

const Board = ({
  chess,
  board,
  player,
  onTurn,
  resetGame,
  showWinModal,
  setShowWinModal,
  onMove,
  onTurnBack,
  resetHighlights,
  mode,
}: BoardProps) => {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [checkArrow, setCheckArrow] = useState<{ from: Square; to: Square } | null>(null);
  const { history, setHistory, addMove, undoToMove,setCurrentBranchIndex,
     addChildMove, expandedMoves, toggleExpand, handleBranchSelection
     } = useMoveHistory(chess, onTurn);

  const handleCloseModal = () => {
    setShowWinModal(false);
    setHighlights([]);
    if (resetGame) {
      resetGame();
    }
  };

  const getCenter = (square: Square) => {
    const { x, y } = toTranslation(square);
    return {
      x: x + SIZE / 2,
      y: y + SIZE / 2,
    };
  };

  const renderArrow = () => {
    if (!checkArrow) return null;
    const from = getCenter(checkArrow.from);
    const to = getCenter(checkArrow.to);
    return <Arrow fromX={from.x} fromY={from.y} toX={to.x} toY={to.y} />;
  };

  useEffect(() => {
    console.log("showWinModal:", showWinModal);
  }, [showWinModal, resetHighlights]);

  const highlightMove = (from: Square, to: Square) => {
    const newHighlights: Highlight[] = [
      { square: from, color: "rgba(0, 255, 0, 0.15)" },
      { square: to, color: "rgba(0, 255, 0, 0.8)" },
    ];

    if (chess.inCheck()) {
      const kingSquare = chess.board().flatMap((row, y) =>
        row.map((piece, x) => {
          if (piece?.type === "k" && piece.color === chess.turn()) {
            return toPosition({ x: x * SIZE, y: y * SIZE });
          }
          return null;
        })
      ).find(Boolean) as Square | null;

      const attackingMove = chess.history({ verbose: true }).slice(-1)[0];
      if (kingSquare && attackingMove) {
        setCheckArrow({
          from: attackingMove.to,
          to: kingSquare,
        });
      } else {
        setCheckArrow(null);
      }

      if (kingSquare) {
        setHighlights([
          ...newHighlights.filter(h => h.square !== kingSquare),
          { square: kingSquare, color: "rgba(255, 0, 0, 0.5)" },
        ]);
        return;
      }
    } else {
      setCheckArrow(null);
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
      ).find(Boolean) as Square | null;

      const attackingMove = chess.history({ verbose: true }).slice(-1)[0];
      if (kingSquare && attackingMove) {
        setCheckArrow({
          to: attackingMove.to,
          from: kingSquare,
        });
      } else {
        setCheckArrow(null);
      }
    } else {
      setCheckArrow(null);
    }
  }, [chess]);

  const handleMove = (move: string) => {
    console.log("Move:", move);
    addMove(move);
    onMove(move);
  };

  const handlePressHistoryItem = (index: number) => {
    handleBranchSelection(index); 
    toggleExpand(index); 
  };

  // Prepare data for SectionList
  const sectionData: SectionMoveItem[] = history.map((moveItem, index) => ({
    title: moveItem.move, 
    data: moveItem.children || [],  
    index, 
  }));

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
      {renderArrow()}
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
                  onMove={handleMove}
                  highlightMove={highlightMove}
                />
              );
            }
            return null;
          })
        )}
      <Button title="Reset Game" onPress={() => {
        if (resetGame) {
          resetGame();
        }
        setHighlights([]);
        setCheckArrow(null);
        setHistory([]);
        setCurrentBranchIndex(-1);
      }} />
      <Button title="Turn Back" onPress={onTurnBack} />

      <SafeAreaView style={styles.moveHistoryList}>
        <SectionList
          sections={sectionData}
          keyExtractor={(item, index) => index.toString()}
          renderSectionHeader={({ section }) => {
            const sectionIndex = sectionData.findIndex(s => s.title === section.title);
            return (
              <View style={styles.headerContainer}>
                <TouchableOpacity 
                  style={{ flex: 1 }} 
                  onPress={() => handlePressHistoryItem(sectionIndex)}>
                  <Text style={styles.sectionHeader}>{section.title}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => toggleExpand(sectionIndex)}
                >
                  <Ionicons
                    style={{ borderColor: 'blue', borderWidth: 1 }}
                    name={expandedMoves.has(sectionIndex) ? 'chevron-up' : 'chevron-down'} 
                    size={24} 
                  />
                </TouchableOpacity>
              </View>
            );
          }}
          renderItem={({ item }) => {
            const sectionIndex = sectionData.findIndex(section => section.data.includes(item));
            return (
              <Collapsible collapsed={!expandedMoves.has(sectionIndex)}>
                <TouchableOpacity 
                  style={styles.moveText} 
                  onPress={() => console.log("Pressed child move:", item.move)}>
                  <Text>{item.move}</Text>
                </TouchableOpacity>
              </Collapsible>
            );
          }}
        />
      </SafeAreaView>

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
