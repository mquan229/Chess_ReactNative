import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import io from 'socket.io-client';

const RoomSelectionScreen = () => {
  const navigation = useNavigation();
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const socket = io('http://localhost:3001');

  useEffect(() => {
    // B1: Khi bấm vào nút Chơi trực tuyến
    handleOnlineMatching();
  }, []);

  const handleOnlineMatching = async () => {
    try {
      // B3: Gọi API ghi nhận online
      await axios.put('http://covua.coi.vn/api/v1.0.0/matching/online', {}, { headers: { Authorization: 'Bearer YOUR_TOKEN' } });

      // B4: Gọi API lấy danh sách các phòng chơi của hệ thống
      const response = await axios.put('http://covua.coi.vn/api/v1.0.0/room/get-all', {
        status: 'A',
        skip: 0,
        limit: 100,
      }, { headers: { Authorization: 'Bearer YOUR_TOKEN' } });

      setRooms(response.data.data);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lấy danh sách phòng.');
    }
  };

  const handleJoinRoom = async () => {
    if (!selectedRoomId) {
      Alert.alert('Thông báo', 'Vui lòng chọn một phòng để tham gia.');
      return;
    }

    try {
      // B6: Gọi API để chọn phòng
      await axios.put('http://covua.coi.vn/api/v1.0.0/matching/pick', { room: selectedRoomId }, { headers: { Authorization: 'Bearer YOUR_TOKEN' } });
      
      // B8: Gọi API tìm kiếm người chơi phù hợp
      const searchResponse = await axios.put('http://covua.coi.vn/api/v1.0.0/matching/search', {}, { headers: { Authorization: 'Bearer YOUR_TOKEN' } });

      // Nếu tìm kiếm không có người chơi, tạo bàn cờ
      if (searchResponse.data.data) {
        // Tham gia bàn cờ
        await axios.put('http://covua.coi.vn/api/v1.0.0/table/join', { id: searchResponse.data.data._id }, { headers: { Authorization: 'Bearer YOUR_TOKEN' } });
        socket.emit('JOIN', { roomId: selectedRoomId });
        // Chuyển sang màn hình chơi game
        navigation.navigate('GameScreen', { roomId: selectedRoomId });
      } else {
        Alert.alert('Thông báo', 'Không tìm thấy người chơi phù hợp.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tham gia phòng.');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedRoomId(item._id)} style={[styles.roomItem, selectedRoomId === item._id && styles.selectedRoom]}>
      <Text style={styles.roomName}>{item.name}</Text>
      <Text style={styles.roomInfo}>{item.players} người chơi - {item.difficulty}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn Phòng Chơi</Text>
      <FlatList
        data={rooms}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
      <TouchableOpacity style={styles.playButton} onPress={handleJoinRoom}>
        <Text style={styles.buttonText}>Chơi Ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  roomItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  roomInfo: {
    fontSize: 14,
    color: '#888',
  },
  selectedRoom: {
    backgroundColor: '#f0f0f0',
  },
  playButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RoomSelectionScreen;
