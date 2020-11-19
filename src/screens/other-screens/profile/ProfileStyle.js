import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const styles = StyleSheet.create({
  emptyCoursesText: {
    marginTop: 35,
  },
  container: {
    flex: 1,
    backgroundColor: theme.palette.secondary.white,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredRow: {
    alignContent: 'center',
    flexDirection: 'row',
  },
  headerContainer: {
    flex: 5,
    paddingTop: 25,
  },
  bodyContainer: {
    flex: 6,
  },
  bodyChildContainer: {
    flex: 2,
  },
  carouselContainer: {
    padding: 10,
  },
  carouselItemStyle: {
    width: 250,
    height: '90%',
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
  profilePictureContainer: {
    flex: 2,
  },
  mockProfile: {
    backgroundColor: '#c4c4c4',
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  profileInfoContainer: {
    flex: 2,
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
