
import { Dimensions, StyleSheet } from 'react-native';


const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding : '5%',
    margin : '10%',
    borderRadius: 15,
    shadowColor: '#000',
    width : width * 0.8,
    height : height * 0.8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: '1%',
    right: '2%',
    width: width * 0.08, 
    height: width * 0.08, 
    borderRadius: width * 0.04,
    backgroundColor: '#f00',
    alignItems :'center',
    justifyContent:'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize : 15,

  },
  modalText: {
    textAlign: 'center',
  },
});

export default styles;
