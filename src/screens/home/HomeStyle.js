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
    padding: 23,
    backgroundColor: theme.palette.secondary.white,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  firstEventRow: {
    flex: 3,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  time: {
    fontWeight: '400',
    fontSize: 17,
    color: '#444444',
    marginBottom: 40,
  },
  courseName: {
    color: theme.palette.primary.blue,
    fontWeight: '500',
    fontSize: 20,
    marginBottom: 15,
  },
  location: {
    color: '#444444',
    fontWeight: '400',
    fontSize: 17,
  },
  secondEventRow: {
    flex: 2,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  day: {
    color: theme.palette.primary.red,
    fontWeight: '500',
    fontSize: 20,
    marginBottom: 3,
  },
  date: {
    color: theme.palette.primary.blue,
    fontWeight: '300',
    fontSize: 35,
    marginBottom: 3,
  },
  month: {
    color: '#444444',
    fontWeight: '400',
    fontSize: 17,
    marginBottom: 3,
  },
  checkInBtnContainer: {
    width: 228,
    height: 60,
    borderRadius: 50,
  },
  activeBtn: {
    backgroundColor: theme.palette.primary.red,
  },
  disabledBtn: {
    backgroundColor: '#FBFBFB',
    padding: 10,
  },
  disabledText: {
    color: '#888888',
    fontWeight: '400',
    fontSize: 13,
  },
  checkInIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 15,
  },
  checkInText: {
    color: theme.palette.secondary.white,
    fontWeight: '500',
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
  infoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    width: 360,
    height: 88,
    padding: 25,
  },
  infoText: {
    color: '#444444',
    fontWeight: '400',
    fontSize: 15,
  },
});

export default styles;
