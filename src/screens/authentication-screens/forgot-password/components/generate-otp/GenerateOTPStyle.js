import { StyleSheet } from 'react-native';
import theme from '../../../../../theme';

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: theme.palette.secondary.white,
  },
  innerContainer: {
    flex: 1,
    width: '80%',
    top: 200,
  },
  inputLabel: {
    color: '#444444',
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 10,
    marginBottom: 10,
  },
  inputError: {
    color: theme.palette.primary.red,
    fontSize: 12,
    fontWeight: '300',
    marginLeft: 10,
    marginTop: 15,
  },
  input: {
    height: 50,
    fontSize: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 53,
    padding: 15,
    width: '100%',
  },
  btn: {
    width: '100%',
    backgroundColor: theme.palette.primary.red,
    height: 50,
    borderRadius: 30,
    marginTop: 15,
  },
  btnText: {
    color: theme.palette.secondary.white,
    fontSize: 17,
    fontWeight: '500',
  },
  goBackText: {
    marginTop: 25,
    fontSize: 13,
    color: '#A6A6A6',
    textAlign: 'center',
  },
});

export default styles;
