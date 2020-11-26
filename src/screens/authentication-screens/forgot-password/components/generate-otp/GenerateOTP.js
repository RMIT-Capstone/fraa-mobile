import React, { useState } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Keyboard,
  Platform,
  StyleSheet,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { isEmail, stringIsEmpty } from '../../../../../helpers/utils';
import { GENERATE_OTP_API } from '../../../../../constants/ApiEndpoints';
import { openToast } from '../../../../../redux/reducers/ToastReducer';
import theme from '../../../../../theme';
import { navigateTo } from '../../../../../helpers/navigation';
import ROUTES from '../../../../../navigation/routes';

const GenericLoading = require('../../../../../assets/lottie-assets/GenericLoading');

const GenerateOTP = ({ screens, setScreen, handleOpenToast }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const onGenerateOTP = async () => {
    if (stringIsEmpty(email)) {
      setEmailError('Email must not be empty');
    } else if (!isEmail(email)) {
      setEmailError('Email is invalid');
    } else {
      try {
        const {
          data: { error },
        } = await axios.post(GENERATE_OTP_API, { email });
        if (error) {
          handleOpenToast('Error generate OTP!');
        } else {
          handleOpenToast(`OTP code sent to ${email}`);
        }
      } catch (errorGenerateOTP) {
        handleOpenToast('Error generate OTP!');
      }
    }
  };

  return (
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
          <TouchableOpacity onPress={onGenerateOTP} style={[styles.btn, styles.centered]}>
            {loading ? (
              <LottieView soruce={GenericLoading} autoPlay loop />
            ) : (
              <Text style={styles.btnText}>Generate OTP</Text>
            )}
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={() => navigateTo(navigation, ROUTES.LOGIN)}>
            <Text style={styles.goBackText}>Go Back</Text>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

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
  input: {
    height: 50,
    fontSize: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 53,
    padding: 15,
    width: '100%',
  },
  inputError: {
    color: theme.palette.primary.red,
    fontSize: 14,
    fontWeight: '300',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
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

GenerateOTP.propTypes = {
  screens: object.isRequired,
  setScreen: func.isRequired,
  handleOpenToast: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleOpenToast: (content) => dispatch(openToast(content)),
});

export default connect(null, mapDispatchToProps)(GenerateOTP);
