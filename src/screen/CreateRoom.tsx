import axios from 'axios';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import styles from '../styles/CreateRoomStyles';

interface CreateRoomProps {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
}

const CreateRoom = ({ isModalVisible, setIsModalVisible }: CreateRoomProps) => {
  const [roomName, setRoomName] = useState('');
  const [mode, setMode] = useState('Người vs Người'); // Mặc định là chế độ Người vs Người

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCreateRoom = async () => {
    try {
      const response = await axios.put('http://covua.coi.vn/api/v1.0.0/room/create', {
        name: roomName,
        mode, // Có thể là "Người vs Người" hoặc "Người vs AI"
      });

      if (response.data.data) {
        // Xử lý thêm nếu cần, như cập nhật danh sách phòng
        handleCloseModal(); // Đóng modal sau khi tạo thành công
      }
    } catch (error) {
      console.error('Error creating room:', error);
      // Hiển thị thông báo lỗi nếu cần
    }
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
          <Text style={styles.title}>Tạo Phòng</Text>
          <TextInput
            style={styles.input}
            placeholder="Tên phòng"
            value={roomName}
            onChangeText={setRoomName}
          />
          <View style={styles.modeContainer}>
            <Text style={styles.label}>Chế độ:</Text>
            <TouchableOpacity onPress={() => setMode('Người vs Người')}>
              <Text style={[styles.modeText, mode === 'Người vs Người' && styles.activeMode]}>Người vs Người</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMode('Người vs AI')}>
              <Text style={[styles.modeText, mode === 'Người vs AI' && styles.activeMode]}>Người vs AI</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.createButton} onPress={handleCreateRoom}>
            <Text style={styles.buttonText}>Tạo Phòng</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default CreateRoom;
