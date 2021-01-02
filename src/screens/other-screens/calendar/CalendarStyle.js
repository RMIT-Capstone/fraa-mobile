import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import theme from '../../../theme';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  datesContainer: {
    height: windowHeight * 0.1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
  },
  dateBtn: {
    borderRadius: 41,
    padding: 10,
    width: 100,
  },
  activeDateBtn: {
    backgroundColor: theme.palette.primary.blue,
  },
  inactiveBtn: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  text: {
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
  },
  inactiveText: {
    color: theme.palette.secondary.arctic,
  },
  agendaContainer: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    marginTop: 20,
  },
  eventsText: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 26.2,
    color: '#AFAFAF',
  },
  sessionsWrapper: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  sessionDateWrapper: {
    flex: 1,
  },
  sessionDate: {
    color: theme.palette.primary.red,
    fontWeight: '400',
    fontSize: 31,
  },
  sessionDay: {
    color: theme.palette.primary.blue,
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  sessionInfoWrapper: {
    flex: 4,
  },
  sessionInfo: {
    borderRadius: 20,
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  courseName: {
    color: theme.palette.secondary.orange,
    fontSize: 17,
    fontWeight: '500',
  },
  sessionTimeWrapper: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  sessionTimeAndLocation: {
    color: '#888888',
  },
  fixedBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 90,
    padding: 10,
    borderRadius: 32,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  fixedBtnText: {
    color: theme.palette.secondary.azure,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});

export default styles;
