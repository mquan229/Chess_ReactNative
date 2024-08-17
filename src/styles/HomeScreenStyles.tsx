  import { Dimensions, StyleSheet } from "react-native";

  const { width, height } = Dimensions.get('window');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      padding: '5%',
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      bottom : "10%",
      width : "80%",
      textAlign : "justify",
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
      padding: '3%',
      paddingBottom : '10%',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      width : width * 1,
    },
    image: {
      width: width * 0.25,
      height: height * 0.15,
      marginRight: '4%',
    },
    itemContent: {
      flex: 1,
    },
    description: {
      fontSize: 14,
      width : '80%',
    },
  });
    export default styles;