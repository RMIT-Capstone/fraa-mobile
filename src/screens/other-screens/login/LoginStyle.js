import { StyleSheet } from 'react-native';
import theme from '../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.palette.secondary.white,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topChildContainer: {
    flex: 3,
  },
  logo: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 60,
    color: '#C4C4C4',
  },
  bottomChildContainer: {
    flex: 6,
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
    marginBottom: 25,
    padding: 15,
    width: '100%',
  },
  signInBtn: {
    width: '100%',
    backgroundColor: theme.palette.primary.red,
    height: 50,
    borderRadius: 30,
    marginTop: 25,
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
