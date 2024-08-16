/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../navigators/navigation';
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

interface Room {
  id: number;
  name: string;
  players: number;
  difficulty: string;
}

const ListRoom = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const rooms: Room[] = [
    { id: 1, name: 'Phòng 1', players: 2, difficulty: 'Dễ' },
    { id: 2, name: 'Phòng 2', players: 1, difficulty: 'Trung bình' },
    // ... thêm các phòng khác
  ];

  const handleCreateRoom = () => {
    navigation.navigate('CreateRoom');
  };

  const handleJoinRoom = (roomId: number) => {
    navigation.navigate('GameScreen', { roomId });
  };

  const renderItem = ({ item }: { item: Room }) => (
    <TouchableOpacity onPress={() => handleJoinRoom(item.id)}>
      <View style={styles.roomItem}>
        <Text style={styles.roomName}>{item.name}</Text>
        <Text style={styles.roomInfo}>
          {item.players} người chơi - {item.difficulty}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Phòng chơi</Text>
      <FlatList
        data={rooms}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.createRoomButton} onPress={handleCreateRoom}>
        <Text style={styles.buttonText}>Tạo phòng mới</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    paddingVertical: 8,
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
  createRoomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default ListRoom;
