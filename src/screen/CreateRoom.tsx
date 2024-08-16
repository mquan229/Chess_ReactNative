// CreateRoom.js
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import styles from '../styles/CreateRoomStyles';

interface CreateRoomProps {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
}

const CreateRoom = ({ isModalVisible, setIsModalVisible }: CreateRoomProps) => {
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={handleCloseModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={{ margin: 0 }}
        backdropOpacity={0.5}
      >
        <View style={[styles.modalContent]}>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text>Đây là nội dung của pop-up Create Room</Text>
        </View>
      </Modal>
    </View>
  );
};

export default CreateRoom;
