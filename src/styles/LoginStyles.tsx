/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { Dimensions, StyleSheet } from 'react-native';


const height = Dimensions.get('window').height; // Lấy chiều cao màn hình
const width = Dimensions.get('window').width; // Lấy chiều rộng màn hình
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 64,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color:"black",
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    color:"black",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#bebebe',
    marginBottom: 20,
    bottom : "60%",
    width : width * 0.4,
    left : "56%",
  },
  rememberMeContainer: {
    left : "2%",
    width : width * 0.4,
  },
  signupLink: {
    textAlign: 'center',
    marginBottom: 40,
  },
  create: {
    textDecorationLine: 'underline',
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 25,
  },
  gradient: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width : width * 0.3,
    height : height * 0.05,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  loginChild: {
    width: width * 0.95, // Chiều rộng 95% của màn hình
    height: height * 0.14, // Chiều cao 14% của màn hình
    position: 'absolute',
    top: -15,
    left: '-5%', // Canh giữa màn hình theo chiều ngang
  },
  loginItem: {
    width: width * 0.95, // Chiều rộng 95% của màn hình
    height: height * 0.30, // Chiều cao 36% của màn hình
    position: 'absolute',
    bottom: 0,
    right: '80%',
  },

 
});

export default styles;
