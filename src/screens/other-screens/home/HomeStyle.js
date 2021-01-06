import { StyleSheet } from 'react-native';
import theme from '../../../theme';

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
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 25,
    paddingRight: 25,
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
    borderRadius: 30,
    marginBottom: 17,
    padding: 20,
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
  checkedInBtn: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  checkInBtnContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 55,
    paddingRight: 55,
    borderRadius: 50,
  },
  activeBtn: {
    backgroundColor: theme.palette.primary.red,
  },
  disabledBtn: {
    backgroundColor: '#FBFBFB',
    padding: 15,
  },
  disabledText: {
    color: '#888888',
    fontWeight: '400',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
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
    padding: 27,
  },
  infoText: {
    color: '#444444',
    fontWeight: '400',
    fontSize: 15,
  },
});

export default styles;
