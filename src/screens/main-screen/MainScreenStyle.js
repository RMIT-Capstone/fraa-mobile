import { StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  centeredColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 11,
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    backgroundColor: theme.palette.secondary.white,
  },
  tabButton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default styles;
