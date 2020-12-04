import React, { useEffect, useState } from 'react';
import { object, func, bool } from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { isEmail, stringIsEmpty } from '../../../../../helpers/utils';
import { GENERATE_OTP_API } from '../../../../../constants/ApiEndpoints';
import { openToast, TOAST_POSITIONS, TOAST_TYPES } from '../../../../../redux/reducers/ToastReducer';
import GenerateOTP from './GenerateOTP';

const GenerateOTPWrapper = ({ screens, setScreen, handleOpenToast, setTargetEmail, fromProfile }) => {
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
            handleOpenToast(TOAST_TYPES.ERROR, 'Error generate OTP!', TOAST_POSITIONS.BOTTOM, 2000);
          }
        } else {
          handleOpenToast(TOAST_TYPES.SUCCESS, 'OTP code sent!', TOAST_POSITIONS.BOTTOM, 2000);
          setTargetEmail(email);
          setTimeout(() => {
            setScreen(VERIFY_OTP);
          }, 1000);
        }
        setLoading(false);
      } catch (errorGenerateOTP) {
        setLoading(false);
        handleOpenToast(TOAST_TYPES.ERROR, 'Error generate OTP!', TOAST_POSITIONS.BOTTOM, 2000);
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
      fromProfile={fromProfile}
    />
  );
};

GenerateOTPWrapper.propTypes = {
  screens: object.isRequired,
  setScreen: func.isRequired,
  handleOpenToast: func.isRequired,
  setTargetEmail: func.isRequired,
  fromProfile: bool,
};

GenerateOTPWrapper.defaultProps = {
  fromProfile: false,
};

const mapDispatchToProps = (dispatch) => ({
  handleOpenToast: (type, content, position, duration) => dispatch(openToast(type, content, position, duration)),
});

export default connect(null, mapDispatchToProps)(GenerateOTPWrapper);
