import React, { useState } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/HomeScreenStyles';
import CreateRoom from './CreateRoom';


interface ListItem {
  title: string;
  description: string;
  image: any; // Thay thế bằng kiểu dữ liệu của hình ảnh nếu biết rõ
}

  const HomeScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePress = () => {
    setIsModalVisible(true);
  };
  const data = [
    {
      title: 'Chơi Với Bạn',
      description: 'Chơi offline cùng với bạn của bạn',
      image: require('../assets/chess/bk.png'), // Đường dẫn đến hình ảnh
    },
    {
      title: 'Chơi Với Máy',
      description: 'Đấu Offline với Máy',
      image: require('../assets/chess/bk.png'),
    },
    {
      title: 'Chơi Với Người Lạ',
      description: 'Tìm bước đi đúng đắn! Đánh Bại Đối Thủ',
      image: require('../assets/chess/bk.png'),
    },
  ];

  

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsModalVisible(true)}
      >
        <Ionicons name="add" size={35} color="white" />
      </TouchableOpacity>
      <CreateRoom isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </SafeAreaView>
  );
};

const renderItem = ({ item }: { item: ListItem }) => {
  console.log('Item:', item);
  return (
    // <View style={{flex:1,height : 80, width : 1000}}>
      <TouchableOpacity style={[styles.item,]}>
        <View style={styles.itemContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </TouchableOpacity>
  // </View>
  
)}



export default HomeScreen;
