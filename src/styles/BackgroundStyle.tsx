import { StyleSheet } from 'react-native';
import { BOARD_SIZE, SIZE } from '../utils/Notation';

const styles = StyleSheet.create({
  chessboard: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowLabel: {
    position: 'absolute',
    top: 2,
    left: 2,
  },
  colLabel: {
    position: 'absolute',
    bottom: 2,
    right: 2,
  },
});

export default styles;
