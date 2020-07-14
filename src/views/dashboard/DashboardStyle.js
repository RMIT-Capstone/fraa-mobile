import {StyleSheet} from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.palette.primary.red,
  },
});

export default styles;
