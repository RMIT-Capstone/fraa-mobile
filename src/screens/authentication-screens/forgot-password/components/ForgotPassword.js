import React, { useState } from 'react';
import { object } from 'prop-types';
import { View, Text } from 'react-native';
import GenerateOTP from './generate-otp';
import VerifyOTP from './verify-otp';
import ChangePassword from './change-password';

const ForgotPassword = ({ navigation }) => {
  const SCREENS = {
    GENERATE_OTP: 'generate_otp',
    VERIFY_OTP: 'verify_otp',
    CHANGE_PASSWORD: 'change_password',
  };

  const [screen, setScreen] = useState(SCREENS.GENERATE_OTP);
  const [targetEmail, setTargetEmail] = useState('');

  switch (screen) {
    case SCREENS.GENERATE_OTP:
      return <GenerateOTP screens={SCREENS} setScreen={setScreen} setTargetEmail={setTargetEmail} />;
    case SCREENS.VERIFY_OTP:
      return <VerifyOTP screens={SCREENS} setScreen={setScreen} targetEmail={targetEmail} />;
    case SCREENS.CHANGE_PASSWORD:
      return <ChangePassword targetEmail={targetEmail} navigation={navigation} />;
    default:
      return (
        <View>
          <Text>You&apos;re not supposed to be here</Text>
        </View>
      );
  }
};

ForgotPassword.propTypes = {
  navigation: object.isRequired,
};

export default ForgotPassword;
