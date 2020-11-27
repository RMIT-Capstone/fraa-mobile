import React, { useEffect, useState } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { isEmail, stringIsEmpty } from '../../../../../helpers/utils';
import { GENERATE_OTP_API } from '../../../../../constants/ApiEndpoints';
import { openToast } from '../../../../../redux/reducers/ToastReducer';
import GenerateOTP from './GenerateOTP';

const GenerateOTPWrapper = ({ screens, setScreen, handleOpenToast, setTargetEmail }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const { VERIFY_OTP } = screens;

  useEffect(() => {
    if (!stringIsEmpty(email)) {
      setEmailError('');
    }
  }, [email]);

  const onGenerateOTP = async () => {
    if (stringIsEmpty(email)) {
      setEmailError('Email must not be empty');
    } else if (!isEmail(email)) {
      setEmailError('Email is invalid');
    } else {
      setLoading(true);
      try {
        const {
          data: { error },
        } = await axios.post(GENERATE_OTP_API, { email });
        if (error) {
          const { user } = error;
          if (user) setEmailError(user);
          else {
            setEmailError(JSON.stringify(error));
            handleOpenToast('Error generate OTP!', 2000);
          }
        } else {
          handleOpenToast('OTP code sent!', 2500);
          setTargetEmail(email);
          setTimeout(() => {
            setScreen(VERIFY_OTP);
          }, 1000);
        }
        setLoading(false);
      } catch (errorGenerateOTP) {
        setLoading(false);
        handleOpenToast('Error generate OTP!', 2000);
      }
    }
  };

  return (
    <GenerateOTP
      onGenerateOTP={onGenerateOTP}
      loading={loading}
      setEmail={setEmail}
      navigation={navigation}
      email={email}
      emailError={emailError}
    />
  );
};

GenerateOTPWrapper.propTypes = {
  screens: object.isRequired,
  setScreen: func.isRequired,
  handleOpenToast: func.isRequired,
  setTargetEmail: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleOpenToast: (content, duration) => dispatch(openToast(content, duration)),
});

export default connect(null, mapDispatchToProps)(GenerateOTPWrapper);
