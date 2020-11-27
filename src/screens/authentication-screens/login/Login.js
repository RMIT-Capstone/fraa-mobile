import React, { useState, useEffect } from 'react';
import { object, func, bool } from 'prop-types';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './LoginStyle';
import { navigateTo } from '../../../helpers/navigation';
import ROUTES from '../../../navigation/routes';

const LOGO = require('../../../assets/logo/FRAA_LOGO.png');
const GenericLoading = require('../../../assets/lottie-assets/GenericLoading');

const Login = ({ navigation, credentials, setCredentials, error, loading, onSignIn }) => {
  const { email, password, isLecturer } = credentials;
  const { email: emailError, otherError } = error;
  const [logoHidden, setLogoHidden] = useState(false);

  const hideLogo = () => ({ display: 'none' });

  const keyboardWillShow = () => {
    setLogoHidden(true);
  };

  const keyboardWillHide = () => {
    setLogoHidden(false);
  };

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', keyboardWillHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardWillShow', keyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', keyboardWillHide);
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, styles.centered]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.loginContainer, styles.centered]}>
          <Image source={LOGO} style={[styles.logo, logoHidden ? hideLogo() : null]} />
          <View style={styles.loginBody}>
            <Text style={styles.inputLabel}>{isLecturer ? 'Staff email address' : 'Student email address'}</Text>
            <TextInput
              onChangeText={(text) => setCredentials((prevState) => ({ ...prevState, email: text }))}
              value={email}
              placeholder="Enter email"
              style={styles.input}
              placeholderTextColor="#888888"
            />
            {emailError !== '' && <Text style={styles.inputError}>{emailError}</Text>}
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              onChangeText={(text) => setCredentials((prevState) => ({ ...prevState, password: text }))}
              value={password}
              placeholder="Enter password"
              secureTextEntry
              style={styles.input}
              placeholderTextColor="#888888"
            />
            {otherError !== '' && <Text style={styles.inputError}>{otherError}</Text>}
            <TouchableOpacity onPress={onSignIn} style={[styles.signInBtn, styles.centered]}>
              {loading ? (
                <LottieView source={GenericLoading} autoPlay loop />
              ) : (
                <Text style={styles.signInText}>Sign In</Text>
              )}
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={() => navigateTo(navigation, ROUTES.FORGOT_PASSWORD)}>
              <Text style={styles.forgotPassword}>Forgot your password ?</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => setCredentials((prevState) => ({ ...prevState, isLecturer: !isLecturer }))}>
              <Text style={styles.forgotPassword}>{isLecturer ? 'Login as student' : 'Login as staff'}</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

Login.propTypes = {
  navigation: object.isRequired,
  credentials: object.isRequired,
  setCredentials: func.isRequired,
  error: object.isRequired,
  loading: bool.isRequired,
  onSignIn: func.isRequired,
};

export default Login;
