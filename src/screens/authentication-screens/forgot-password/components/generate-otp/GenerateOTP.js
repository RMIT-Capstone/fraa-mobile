import React from 'react';
import { string, object, func, bool } from 'prop-types';
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
import { navigateTo } from '../../../../../helpers/navigation';
import styles from '../SharedStyle';
import ROUTES from '../../../../../navigation/routes';

const GenericLoading = require('../../../../../assets/lottie-assets/GenericLoading');

const GenerateOTP = ({ email, setEmail, emailError, onGenerateOTP, loading, navigation }) => (
  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.innerContainer}>
        <Text style={styles.inputLabel}>Enter email address</Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Enter email"
          style={styles.input}
          placeholderTextColor="#88888888"
        />
        <View>{emailError !== '' && <Text style={styles.inputError}>{emailError}</Text>}</View>
        <TouchableOpacity onPress={onGenerateOTP} style={[styles.btn, styles.centered]}>
          {loading ? (
            <LottieView source={GenericLoading} autoPlay loop />
          ) : (
            <Text style={styles.btnText}>Generate OTP</Text>
          )}
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={() => navigateTo(navigation, ROUTES.LOGIN)}>
          <Text style={styles.goBackText}>Go back to Login</Text>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

GenerateOTP.propTypes = {
  email: string.isRequired,
  setEmail: func.isRequired,
  emailError: string.isRequired,
  onGenerateOTP: func.isRequired,
  loading: bool.isRequired,
  navigation: object.isRequired,
};

export default GenerateOTP;
