import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './LoginStyle';
import { SIGN_IN_API } from '../../../constants/ApiEndpoints';
const GenericLoading = require('../../../assets/lottie-assets/GenericLoading');

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '', isLecturer: false });
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const onSignIn = async () => {
    try {
      setLoading(true);
      const { data, error } = await axios.post(SIGN_IN_API, credentials);
      if (error) {
        console.warn('error onSignIn: ', error);
      } else {
        console.log(data);
      }
      setLoading(false);
    } catch (errorOnSignIn) {
      console.warn('error onSignIn: ', errorOnSignIn);
      setLoading(false);
    }
  };

  const { email, password } = credentials;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, styles.centered]}>
      <View style={[styles.topChildContainer, styles.centered]}>
        <Text style={styles.appName}>FRAA</Text>
      </View>
      <View style={[styles.bottomChildContainer]}>
        <Text style={styles.inputLabel}>Email address</Text>
        <TextInput
          onChangeText={(text) => setCredentials((prevState) => ({ ...prevState, email: text }))}
          value={email}
          placeholder="Enter email"
          style={styles.input}
          placeholderTextColor="#888888"
        />
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          onChangeText={(text) => setCredentials((prevState) => ({ ...prevState, password: text }))}
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          style={styles.input}
          placeholderTextColor="#888888"
        />
        <Text>AAA</Text>
        <TouchableOpacity onPress={onSignIn} style={[styles.signInBtn, styles.centered]}>
          {loading ? (
            <LottieView source={GenericLoading} autoPlay loop style={styles.lottieView} />
          ) : (
            <Text style={styles.signInText}>Sign In</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot your password ?</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
