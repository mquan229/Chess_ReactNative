/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Color, FontFamily, FontSize } from '../themes/GlobalStyles';
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: Color.colorWhite,
    padding: 20,
    justifyContent:'center',
    alignItems:'center',
  },
  backIcon: {
    position: 'absolute',
    top: '8%',
    left: '5%',
    zIndex: 10,
  },
  createAccount: {
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
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
    top:'12%'
  },
  profileIcon: {
    width: wp('6%'),
    height: hp('4%'),
    marginRight: 10,
  },
  vectorIcon: {
    width: wp('5%'),
    height: hp('3%'),
    marginRight: 10,
  },
  emailIcon: {
    width: wp('6%'),
    height: hp('2%'),
    marginRight: 10,
  },

  mobileIcon: {
    width: wp('5%'),
    height: hp('3%'),
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  orCreateAccount: {
    textAlign: 'center',
    fontSize: FontSize.size_mini,
    marginVertical: 30,
    color: Color.colorGray,
    fontFamily: FontFamily.openSans,
    top:'20%',
  },
  createButton: {
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
  create: {
    fontSize: FontSize.size_6xl,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    justifyContent:"center",
    lineHeight: 50,
  },
  signupChild: {
    width: width * 0.95,
    height: height * 0.14,
    position: 'absolute',
    top: '-1.8%',
    left: '-50%',
  },
  signupItem: {
    width: width * 0.2,
    height: height * 0.1,
    position: 'absolute',
    bottom: 0,
    left: width * 0.4,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top:"25%",
  },
  facebookIcon: {
    width: wp('10%'),
    height: hp('5%'),
  },
  twitterIcon: {
    width: wp('10%'),
    height: hp('5%'),
  },
  googleIcon: {
    width: wp('10%'),
    height: hp('5%'),
  },
  signupChild1: {
    width: width * 0.95, // Chiều rộng 95% của màn hình
    height: height * 0.30, // Chiều cao 36% của màn hình
    position: 'absolute',
    bottom: 0,
    right: '75%',
    top:'80%',
  },
});

export default styles;
