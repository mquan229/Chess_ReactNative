import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../navigators/navigation';
import styles from '../styles/HomeScreenStyles';
import CreateRoom from './CreateRoom';

interface ListItem {
  title: string;
  description: string;
  image: any; // Thay thế bằng kiểu dữ liệu của hình ảnh nếu biết rõ
  link: any;
}

const HomeScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const data = [
    {
      title: 'Chơi Với Bạn',
      description: 'Chơi offline cùng với bạn của bạn',
      image: require('../assets/chess/bk.png'), // Đường dẫn đến hình ảnh
      link: 'Board',
    },
    {
      title: 'Chơi Với Máy',
      description: 'Đấu Offline với Máy',
      image: require('../assets/chess/bk.png'),
      link: '', 
    },
    {
      title: 'Chơi Với Người Lạ',
      description: 'Tìm bước đi đúng đắn! Đánh Bại Đối Thủ',
      image: require('../assets/chess/bk.png'),
      link: '', 
    },
  ];

  // Moved the renderItem function inside HomeScreen
  const renderItem = ({ item }: { item: ListItem }) => {
    console.log('Item:', item);
    return (
      <TouchableOpacity style={styles.item} onPress={() => {
        if (item.link) {
          navigation.navigate(item.link);
        }
      }}>
        <Image style={styles.image} source={item.image} />
        <View style={styles.itemContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

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

export default HomeScreen;
