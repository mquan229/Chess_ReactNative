import { Dimensions, StyleSheet } from 'react-native';
import { Color, FontFamily, FontSize } from '../themes/GlobalStyles';
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  forgotPassword: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: Color.colorWhite,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    position: 'absolute',
    top: '8%',
    left: '5%',
    zIndex: 10,
  },
  resetPassword: {
    fontSize: 40,
    fontWeight: '700',
    bottom : '20%',
    marginVertical: 20,
    color: Color.colorGray,
    fontFamily: FontFamily.openSans,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  emailIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  resetButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 25,
    marginTop: 20,
    width : '50%'
  },
  gradient: {
    borderRadius: 25,
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  reset: {
    fontSize: FontSize.size_6xl,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 50,
  },
  forgotPasswordChild: {
    width: width * 0.95,
    height: height * 0.14,
    position: 'absolute',
    top: '-1.8%',
    left: '-50%',
  },

  forgotPasswordChild1: {
    width: width * 0.95, // Chiều rộng 95% của màn hình
    height: height * 0.30, // Chiều cao 36% của màn hình
    position: 'absolute',
    bottom: 0,
    right: '75%',
    top:'80%',
  },
  forgotPasswordItem: {
    width: width * 0.2,
    height: height * 0.1,
    position: 'absolute',
    bottom: 0,
    right : '10%',
  },
});

export default styles;
