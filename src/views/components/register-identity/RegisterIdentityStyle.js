import {StyleSheet} from 'react-native';
import theme from '../../../theme';

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  snapButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: theme.palette.primary.red,
    padding: 15,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  snapText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
  },
  faceBounds: {
    borderWidth: 1.5,
    position: 'absolute',
    borderColor: theme.palette.secondary.yellow,
  },
  tooManyFacesView: {
    backgroundColor: theme.palette.primary.red,
    padding: 15,
    borderRadius: 10,
    position: 'absolute',
    bottom: 15,
  },
  tooManyFacesText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  lottieView: {
    height: 30,
    width: 15,
  },
});

export default styles;
