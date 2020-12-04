import React, { useState, useEffect } from 'react';
import { string, object, func, bool } from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { stringIsEmpty } from '../../../../../helpers/utils';
import { openToast, TOAST_TYPES } from '../../../../../redux/reducers/ToastReducer';
import { VERIFY_OTP_API } from '../../../../../constants/ApiEndpoints';
import VerifyOTP from './VerifyOTP';

const VerifyOTPWrapper = ({ screens, setScreen, handleOpenToast, targetEmail, fromProfile }) => {
  const [OTP, setOTP] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { CHANGE_PASSWORD, GENERATE_OTP } = screens;

  useEffect(() => {
    if (!stringIsEmpty(OTP)) setError('');
  }, [OTP]);

  const onVerifyOTP = async () => {
    if (stringIsEmpty(OTP)) {
      setError('OTP must not be empty');
    } else if (OTP.length < 0 || OTP.length > 6) {
      setError('OTP code must be between 0 and 6 characters');
    } else {
      try {
        setLoading(true);
        const {
          data: { error: errorAxios },
        } = await axios.post(VERIFY_OTP_API, { email: targetEmail, OTP });
        if (errorAxios) {
          if (errorAxios === 'Invalid OTP.') {
            setError('Invalid OTP, try again');
          } else if (errorAxios === 'OTP expired.') {
            setError('OTP expired, please request for another OTP');
          } else {
            const { user, OTP: errorOTP } = errorAxios;
            if (user || OTP) {
              setError(user || errorOTP);
            }
          }
        } else {
          handleOpenToast(TOAST_TYPES.SUCCESS, 'OTP verified!', 2500);
          setTimeout(() => {
            setScreen(CHANGE_PASSWORD);
          }, 1000);
        }
        setLoading(false);
      } catch (errorVerifyOTP) {
        handleOpenToast(TOAST_TYPES.ERROR, 'Error verify OTP!', 2000);
        setLoading(false);
      }
    }
  };

  const goBack = () => {
    setScreen(GENERATE_OTP);
  };

  return (
    <VerifyOTP
      loading={loading}
      onVerifyOTP={onVerifyOTP}
      error={error}
      OTP={OTP}
      setOTP={setOTP}
      goBack={goBack}
      fromProfile={fromProfile}
    />
  );
};

VerifyOTPWrapper.propTypes = {
  screens: object.isRequired,
  setScreen: func.isRequired,
  handleOpenToast: func.isRequired,
  targetEmail: string.isRequired,
  fromProfile: bool,
};

VerifyOTPWrapper.defaultProps = {
  fromProfile: false,
};

const mapDispatchToProps = (dispatch) => ({
  handleOpenToast: (type, content, duration) => dispatch(openToast(type, content, duration)),
});

export default connect(null, mapDispatchToProps)(VerifyOTPWrapper);
