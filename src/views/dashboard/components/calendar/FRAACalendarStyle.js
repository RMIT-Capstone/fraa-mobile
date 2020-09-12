import {StyleSheet} from 'react-native';
import theme from '../../../../theme';

const styles = StyleSheet.create({
  calendar: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    borderBottomWidth: 0,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventsText: {
    backgroundColor: theme.palette.secondary.white,
    color: '#AFAFAF',
    fontWeight: '300',
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    // color: 'grey',
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
    backgroundColor: theme.palette.secondary.white,
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
    color: theme.palette.primary.red,
  },
  disabledItem: {
    backgroundColor: '#C4C4C4',
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
