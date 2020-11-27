import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.secondary.white,
  },
  loginContainer: {
    flex: 1,
    padding: 20,
    width: '100%',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  loginBody: {
    justifyContent: 'flex-start',
    width: '100%',
    padding: 45,
  },
  inputLabel: {
    color: '#444444',
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 10,
    marginBottom: 10,
  },
  input: {
    height: 50,
    fontSize: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 53,
    padding: 15,
    width: '100%',
    marginBottom: 10,
  },
  inputError: {
    color: theme.palette.primary.red,
    fontSize: 12,
    fontWeight: '300',
    marginLeft: 10,
    marginBottom: 15,
  },
  signInBtn: {
    width: '100%',
    backgroundColor: theme.palette.primary.red,
    height: 50,
    borderRadius: 30,
    marginTop: 15,
  },
  signInText: {
    color: theme.palette.secondary.white,
    fontSize: 17,
    fontWeight: '500',
  },
  forgotPassword: {
    marginTop: 25,
    fontSize: 13,
    color: '#A6A6A6',
    textAlign: 'center',
  },
});

export default styles;
