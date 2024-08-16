  import { Dimensions, StyleSheet } from "react-native";

  const { width, height } = Dimensions.get('window');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    button: {
      width: width * 0.15,
      height: width * 0.15,
      borderRadius: width * 0.075,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#4CAF50',
      position: 'absolute', // Đảm bảo nút không che khuất FlatList
      right : '10%',
      bottom : '5%',
    },
    item: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      width : width * 1,
    },
    image: {
      width: 50,
      height: 50,
      marginRight: 16,
    },
    itemContent: {
      flex: 1,
    },
    description: {
      fontSize: 14,
    },
  });
    export default styles;