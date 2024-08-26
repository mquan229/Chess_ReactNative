// src/components/PromotionPopup.tsx

import React from "react";
import { Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native";

// Tạo đối tượng chứa hình ảnh
const pieceImages = {
  q: require('../assets/chess/bq.png'),
  r: require('../assets/chess/br.png'),
  b: require('../assets/chess/bb.png'),
  n: require('../assets/chess/bn.png'),
};

interface PromotionPopupProps {
  isVisible: boolean;
  onSelect: (piece: string) => void;
}

const PromotionPopup: React.FC<PromotionPopupProps> = ({ isVisible, onSelect }) => {
  return (
    <Modal transparent={true} visible={isVisible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {Object.entries(pieceImages).map(([piece, source]) => (
            <TouchableOpacity key={piece} onPress={() => onSelect(piece)}>
              <Image source={source} style={styles.piece} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  piece: {
    width: 60,
    height: 60,
    margin: 5,
  },
});

export default PromotionPopup;
