import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { string, object, func, bool } from 'prop-types';
import axios from 'axios';
import { stringIsEmpty } from '../../../../../helpers/utils';
import { openToast, TOAST_TYPES } from '../../../../../redux/reducers/ToastReducer';
import { CHANGE_PASSWORD_API } from '../../../../../constants/ApiEndpoints';
import ROUTES from '../../../../../navigation/routes';
import ChangePassword from './ChangePassword';
import { resetRoute } from '../../../../../helpers/navigation';

const ChangePasswordWrapper = ({ targetEmail, navigation, handleOpenToast, fromProfile }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!stringIsEmpty(password)) {
      setError('');
    }
  }, [password]);

  const onChangePassword = async () => {
    if (stringIsEmpty(password)) {
      setError('New password must not be empty');
    } else if (password.length < 6) {
      setError('New password must have more than 6 characters');
    } else {
      try {
        setLoading(true);
        const {
          data: { error: axiosError },
        } = await axios.post(CHANGE_PASSWORD_API, {
          email: targetEmail,
          password,
        });
        if (axiosError) {
          setError(JSON.stringify(axiosError));
        } else {
          handleOpenToast(TOAST_TYPES.SUCCESS, 'Password changed successfully!', 2500);
          if (fromProfile) {
            setTimeout(() => {
              resetRoute(navigation, ROUTES.MAIN);
            }, 1000);
          } else {
            setTimeout(() => {
              resetRoute(navigation, ROUTES.LOGIN);
            }, 1000);
          }
        }
        setLoading(false);
      } catch (errorOnChangePassword) {
        handleOpenToast(TOAST_TYPES.ERROR, 'Error change password!', 2000);
        setLoading(false);
      }
    }
  };

  return (
    <ChangePassword
      password={password}
      loading={loading}
      setPassword={setPassword}
      onChangePassword={onChangePassword}
      error={error}
      fromProfile={fromProfile}
    />
  );
};

ChangePasswordWrapper.propTypes = {
  targetEmail: string.isRequired,
  navigation: object.isRequired,
  handleOpenToast: func.isRequired,
  fromProfile: bool,
};

ChangePasswordWrapper.defaultProps = {
  fromProfile: false,
};

const mapDispatchToProps = (dispatch) => ({
  handleOpenToast: (type, content, duration) => dispatch(openToast(type, content, duration)),
});

export default connect(null, mapDispatchToProps)(ChangePasswordWrapper);
