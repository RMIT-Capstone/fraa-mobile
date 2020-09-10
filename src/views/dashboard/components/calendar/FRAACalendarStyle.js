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
  agendaHeader: {
    backgroundColor: '#fff',
  },
  agenda: {
    width: windowWidth,
    flex: 1,
  },
  agendaItem: {
    backgroundColor: '#fff',
    height: '100%',
  },
  emptyEventText: {
    fontWeight: '600',
  },
});

export default styles;
