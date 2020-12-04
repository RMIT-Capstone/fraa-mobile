import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import { View, Text } from 'react-native';
import GenerateOTP from './generate-otp';
import VerifyOTP from './verify-otp';
import ChangePassword from './change-password';

const ForgotPassword = ({
  route: {
    params: { fromProfile, email },
  },
  navigation,
}) => {
  const SCREENS = {
    GENERATE_OTP: 'generate_otp',
    VERIFY_OTP: 'verify_otp',
    CHANGE_PASSWORD: 'change_password',
  };

  const [screen, setScreen] = useState(SCREENS.GENERATE_OTP);
  const [targetEmail, setTargetEmail] = useState('');

  useEffect(() => {
    if (fromProfile) {
      setTargetEmail(email);
      setScreen(SCREENS.VERIFY_OTP);
    }
  }, [fromProfile]);

  switch (screen) {
    case SCREENS.GENERATE_OTP:
      return (
        <GenerateOTP
          screens={SCREENS}
          setScreen={setScreen}
          setTargetEmail={setTargetEmail}
          fromProfile={fromProfile}
        />
      );
    case SCREENS.VERIFY_OTP:
      return <VerifyOTP screens={SCREENS} setScreen={setScreen} targetEmail={targetEmail} fromProfile={fromProfile} />;
    case SCREENS.CHANGE_PASSWORD:
      return <ChangePassword targetEmail={targetEmail} navigation={navigation} fromProfile={fromProfile} />;
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
  route: object,
};

ForgotPassword.defaultProps = {
  route: {},
};

export default ForgotPassword;
