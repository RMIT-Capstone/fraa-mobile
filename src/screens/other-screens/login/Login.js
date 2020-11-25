import React from 'react';
import { object, func, bool } from 'prop-types';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './LoginStyle';
const GenericLoading = require('../../../assets/lottie-assets/GenericLoading');

const Login = ({ credentials, setCredentials, error, loading, onSignIn, handleOpenToast, handleCloseToast }) => {
  const { email, password, isLecturer } = credentials;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, styles.centered]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginContainer}>
          <Text style={styles.appName}>FRAA</Text>
          <View style={[styles.loginBody]}>
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
              secureTextEntry={true}
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
            <Text onPress={() => handleOpenToast()} style={styles.forgotPassword}>
              Forgot your password ?
            </Text>
            <Text
              onPress={
                // () => setCredentials((prevState) => ({ ...prevState, isLecturer: !isLecturer }))
                () => handleCloseToast()
              }
              style={styles.forgotPassword}>
              {isLecturer ? 'Login as student' : 'Login as staff'}
            </Text>
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
};

export default Login;
