import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topChildContainer: {
    flex: 4,
  },
  timeIndicatorContainer: {
    width: 137,
    height: 33,
    borderRadius: 41,
    marginBottom: 17,
  },
  happening: {
    backgroundColor: theme.palette.secondary.yellow,
  },
  upcoming: {
    backgroundColor: theme.palette.secondary.gray,
  },
  timeIndicatorText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
  },
  eventContainer: {
    height: 200,
    width: 360,
    borderRadius: 30,
    marginBottom: 17,
    backgroundColor: theme.palette.secondary.white,
  },
  checkInBtnContainer: {
    width: 200,
    height: 50,
    borderRadius: 55,
  },
  activeBtn: {
    backgroundColor: theme.palette.primary.red,
  },
  disabledBtn: {
    backgroundColor: '#FBFBFB',
  },
  checkInIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 15,
  },
  checkInText: {
    fontWeight: '500',
    color: theme.palette.secondary.white,
  },
  raised: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  bottomChildContainer: {
    flex: 2,
  },
});

export default styles;
