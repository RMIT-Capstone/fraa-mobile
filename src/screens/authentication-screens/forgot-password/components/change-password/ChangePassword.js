import React from 'react';
import { string, func, bool } from 'prop-types';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Keyboard,
  Platform,
} from 'react-native';
import LottieView from 'lottie-react-native';
import styles from '../SharedStyle';

const GenericLoading = require('../../../../../assets/lottie-assets/GenericLoading');

const ChangePassword = ({ password, setPassword, onChangePassword, error, loading }) => (
  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.innerContainer}>
        <Text style={styles.inputLabel}>Enter new password</Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Enter new password"
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#88888888"
        />
        <View>{error !== '' && <Text style={styles.inputError}>{error}</Text>}</View>
        <TouchableOpacity onPress={onChangePassword} style={[styles.btn, styles.centered]}>
          {loading ? (
            <LottieView source={GenericLoading} autoPlay loop />
          ) : (
            <Text style={styles.btnText}>Change Password</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.goBackText}>* New password must have at least 6 characters</Text>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

ChangePassword.propTypes = {
  password: string.isRequired,
  setPassword: func.isRequired,
  onChangePassword: func.isRequired,
  error: string,
  loading: bool.isRequired,
};

ChangePassword.defaultProps = {
  error: '',
};

export default ChangePassword;
