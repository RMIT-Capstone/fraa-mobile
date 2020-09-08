import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    height: 170,
  },
  carousel: {
    marginTop: 15,
    padding: 10,
  },
  carouselItemStyle: {
    width: 250,
    height: 120,
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
  fixedText: {
    position: 'absolute',
    top: 0,
    left: 15,
    fontSize: 16,
    fontWeight: '600',
  },
  courseName: {
    color: '#fff',
    fontWeight: '600',
  },
  courseCode: {
    color: '#fff',
    fontWeight: '200',
  },
  profilePictureContainer: {
    flex: 2,
  },
  mockProfile: {
    backgroundColor: '#c4c4c4',
    height: 100,
    width: 100,
    borderRadius: 50,
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
  error: {
    fontWeight: '300',
    color: '#e60028',
  },
  profileStatisticsContainer: {
    flex: 2,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  statisticsColumn: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '50%',
    height: 50,
  },
  rightBorder: {
    borderRightWidth: 1,
  },
  statisticsNumber: {
    fontWeight: '600',
    color: '#444444',
  },
  statisticsTitle: {
    fontWeight: '300',
  },
});
export default styles;
