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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    borderBottomWidth: 0,
  },
  section: {
    backgroundColor: '#fff',
    color: 'grey',
    // textTransform: 'capitalize',
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
  },
  itemHourText: {
    color: 'black',
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgrey',
    backgroundColor: '#fff',
  },
  emptyItemText: {
    color: '#000',
    fontSize: 14,
  },
});

export default styles;
