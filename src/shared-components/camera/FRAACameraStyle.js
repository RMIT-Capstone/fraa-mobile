import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraMessageContainer: {
    position: 'absolute',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 55,
  },
  topCameraMessageContainer: {
    top: 35,
    backgroundColor: '#AFAFAF',
  },
  bottomCameraMessageContainer: {
    bottom: 60,
    backgroundColor: theme.palette.primary.blue,
  },
  cameraMessage: {
    color: theme.palette.secondary.white,
    fontWeight: '500',
    fontSize: 15,
  },
  snapButtonRow: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    width: 180,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recapture: {
    backgroundColor: theme.palette.primary.red,
    padding: 15,
    borderRadius: 16,
    height: 50,
  },
  capture: {
    position: 'absolute',
    bottom: 30,
    borderWidth: 5,
    borderColor: theme.palette.primary.blue,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 35,
    height: 70,
    width: 70,
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
    position: 'absolute',
    bottom: 10,
    height: 70,
    width: 70,
  },
});

export default styles;
