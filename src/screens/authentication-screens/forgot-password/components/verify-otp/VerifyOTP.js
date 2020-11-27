import React from 'react';
import { string, func, object, bool } from 'prop-types';
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
import styles from '../generate-otp/GenerateOTPStyle';

const GenericLoading = require('../../../../../assets/lottie-assets/GenericLoading');

const VerifyOTP = ({ OTP, setOTP, onVerifyOTP, goBack, error, loading }) => (
  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.innerContainer}>
        <Text style={styles.inputLabel}>Enter OTP Code</Text>
        <TextInput
          onChangeText={(text) => setOTP(text)}
          value={OTP}
          placeholder="Enter OTP"
          style={styles.input}
          placeholderTextColor="#88888888"
        />
        <View>{error !== '' && <Text style={styles.inputError}>{error}</Text>}</View>
        <TouchableOpacity onPress={onVerifyOTP} style={[styles.btn, styles.centered]}>
          {loading ? (
            <LottieView source={GenericLoading} autoPlay loop />
          ) : (
            <Text style={styles.btnText}>Verify OTP</Text>
          )}
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={goBack}>
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

VerifyOTP.propTypes = {
  OTP: string.isRequired,
  setOTP: func.isRequired,
  onVerifyOTP: func.isRequired,
  error: string,
  loading: bool.isRequired,
  goBack: func.isRequired,
};

VerifyOTP.defaultProps = {
  error: '',
};

export default VerifyOTP;
