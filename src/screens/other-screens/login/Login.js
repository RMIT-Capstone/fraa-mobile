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

const LOGO = require('../../../assets/logo/FRAA_LOGO.png');
const GenericLoading = require('../../../assets/lottie-assets/GenericLoading');

const Login = ({ credentials, setCredentials, error, loading, onSignIn, handleOpenToast }) => {
  const { email, password, isLecturer } = credentials;
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
            <Text style={styles.inputError}>{error.email && error.email}</Text>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              onChangeText={(text) => setCredentials((prevState) => ({ ...prevState, password: text }))}
              value={password}
              placeholder="Enter password"
              secureTextEntry
              style={styles.input}
              placeholderTextColor="#888888"
            />
            <Text style={styles.inputError}>{error.otherError && error.otherError}</Text>
            <TouchableOpacity onPress={onSignIn} style={[styles.signInBtn, styles.centered]}>
              {loading ? (
                <LottieView source={GenericLoading} autoPlay loop style={styles.lottieView} />
              ) : (
                <Text style={styles.signInText}>Sign In</Text>
              )}
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={() => handleOpenToast()}>
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
  credentials: object.isRequired,
  setCredentials: func.isRequired,
  error: object.isRequired,
  loading: bool.isRequired,
  onSignIn: func.isRequired,
  handleOpenToast: func.isRequired,
};

export default Login;
