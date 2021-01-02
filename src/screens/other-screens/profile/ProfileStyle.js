import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';
import theme from '../../../theme';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  emptyCoursesText: {
    marginTop: 35,
  },
  container: {
    flex: 1,
    backgroundColor: theme.palette.secondary.white,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredRow: {
    alignContent: 'center',
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  header: {
    position: 'relative',
    flex: 1,
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#44444444',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
  },
  fixedIconWrapper: {
    position: 'absolute',
    right: 20,
  },
  fixedIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  scrollViewContainer: {
    flex: 11,
    marginTop: 15,
  },
  mockProfile: {
    backgroundColor: '#c4c4c4',
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  userFullName: {
    fontWeight: '600',
    color: '#444444',
    marginBottom: 5,
    fontSize: 19,
  },
  userEmail: {
    fontWeight: '300',
    color: '#888888',
    marginBottom: 5,
  },
  notVerified: {
    fontWeight: '500',
    color: theme.palette.primary.red,
  },
  verified: {
    fontWeight: '500',
    color: theme.palette.secondary.green,
  },
  carouselContainer: {
    padding: 10,
    height: windowHeight / 6,
  },
  carouselItemStyle: {
    width: 250,
    borderRadius: 16,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  courseContainer: {
    padding: 10,
    position: 'relative',
    height: '100%',
  },
  courseName: {
    color: theme.palette.secondary.white,
    fontWeight: '600',
  },
  courseCode: {
    color: theme.palette.secondary.white,
    fontWeight: '300',
  },
  coursePercentage: {
    color: theme.palette.secondary.white,
    fontWeight: '600',
    fontSize: 20,
    position: 'absolute',
    bottom: 10,
    right: 15,
  },
  fixedText: {
    top: 0,
    left: 15,
    fontSize: 16,
    fontWeight: '600',
  },
  profileStatisticsContainer: {
    flex: 2,
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  profileStatisticsColumn: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '50%',
    height: 50,
  },
  rightBorder: {
    borderRightWidth: 1,
    borderColor: '#C4C4C4',
  },
  profileStatisticsNumber: {
    fontWeight: '600',
    color: '#444444',
  },
  profileStatisticsTitle: {
    fontWeight: '300',
  },
  circle: {
    borderWidth: 12,
    backgroundColor: theme.palette.secondary.white,
    height: 120,
    width: 120,
    borderRadius: 60,
    borderColor: theme.palette.secondary.green,
  },
  greenText: {
    fontWeight: '600',
    color: theme.palette.secondary.green,
    fontSize: 17,
  },
});
export default styles;
