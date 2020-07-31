import {StyleSheet} from 'react-native';
import theme from '../../../theme';

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rescanButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: theme.palette.primary.red,
    padding: 15,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  rescanText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
  },
  lottieView: {
    height: 30,
    width: 15,
  },
});

export default styles;
