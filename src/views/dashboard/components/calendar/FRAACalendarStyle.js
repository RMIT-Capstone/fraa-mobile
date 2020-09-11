import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    borderBottomWidth: 0,
  },
  eventsText: {
    backgroundColor: '#fff',
    color: '#afafaf',
    fontWeight: '300',
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  section: {
    backgroundColor: '#fff',
    color: 'grey',
    // textTransform: 'capitalize',
    borderRadius: 6,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 0,
  },
  item: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 10,
    backgroundColor: 'white',
    // borderBottomWidth: 1,
    // borderBottomColor: 'lightgrey',
    flexDirection: 'row',
  },
  disabledItem: {
    backgroundColor: '#c4c4c4',
  },
  leftItem: {
    flex: 3,
  },
  rightItem: {
    flex: 7,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 0,
  },
  courseName: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 20,
  },
  rightItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomText: {
    color: '#888888',
    fontWeight: '300',
  },
  overdue: {
    marginTop: 5,
    color: '#e60028',
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
  },
  emptyItemText: {
    color: '#000',
    fontSize: 14,
  },
});

export default styles;
