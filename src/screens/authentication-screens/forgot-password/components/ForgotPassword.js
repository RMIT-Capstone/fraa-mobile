import React, { useState } from 'react';
import { View, Text } from 'react-native';
import GenerateOTP from './generate-otp/GenerateOTP';
import VerifyOTP from './verify-otp/VerifyOTP';
import ChangePassword from './change-password/ChangePassword';

const ForgotPassword = () => {
  const SCREENS = {
    GENERATE_OTP: 'generate_otp',
    VERIFY_OTP: 'verify_otp',
    CHANGE_PASSWORD: 'change_password',
  };

  const [screen, setScreen] = useState(SCREENS.GENERATE_OTP);

  switch (screen) {
    case SCREENS.GENERATE_OTP:
      return <GenerateOTP screens={SCREENS} setScreen={setScreen} />;
    case SCREENS.VERIFY_OTP:
      return <VerifyOTP screens={SCREENS} setScreen={setScreen} />;
    case SCREENS.CHANGE_PASSWORD:
      return <ChangePassword screens={SCREENS} setScreen={setScreen} />;
    default:
      return (
        <View>
          <Text>You&apos;re not supposed to be here</Text>
        </View>
      );
  }
};

export default ForgotPassword;
