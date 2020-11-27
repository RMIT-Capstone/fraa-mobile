import React, { useState } from 'react';
import { View, Text } from 'react-native';
import GenerateOTP from './generate-otp';
import VerifyOTP from './verify-otp';
import ChangePassword from './change-password/ChangePassword';

const ForgotPassword = () => {
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
      return <ChangePassword screens={SCREENS} setScreen={setScreen} targetEmail={targetEmail} />;
    default:
      return (
        <View>
          <Text>You&apos;re not supposed to be here</Text>
        </View>
      );
  }
};

export default ForgotPassword;
