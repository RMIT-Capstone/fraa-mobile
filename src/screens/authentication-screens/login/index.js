import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';
import axios from 'axios';
import { GET_USER_API, SIGN_IN_API } from '../../../constants/ApiEndpoints';
import { storeAsyncStringData } from '../../../helpers/async-storage';
import { resetRoute } from '../../../helpers/navigation';
import { isEmail, stringIsEmpty } from '../../../helpers/utils';
import { setUser } from '../../../redux/reducers/UserReducer';
import { openToast } from '../../../redux/reducers/ToastReducer';
import ROUTES from '../../../navigation/routes';
import Login from './Login';

const LoginWrapper = ({ navigation, handleSetUser, handleOpenToast }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '', isLecturer: false });
  const [error, setError] = useState({ email: '', otherError: '' });
  const [loading, setLoading] = useState(false);



  const validateInputs = () => {
    const { email, password } = credentials;
    const inputErrors = {};
    if (stringIsEmpty(email)) {
      inputErrors.email = 'Email must not be empty';
    } else if (!isEmail(email)) {
      inputErrors.email = 'Email is invalid';
    }
    if (stringIsEmpty(password)) {
      inputErrors.otherError = 'Password must not be empty';
    } else if (password.length < 6) {
      inputErrors.otherError = 'Password must have more than 6 characters';
    }

    return { valid: Object.keys(inputErrors).length === 0, inputErrors };
  };

  useEffect(() => {
    const { email, password } = credentials;
    if (!stringIsEmpty(email) || !stringIsEmpty(password)) {
      setError({ email: '', password: '' });
    }
  }, [credentials]);

  const setUserInRedux = async () => {
    const { email, isLecturer } = credentials;
    const userRequest = {
      email,
      isLecturer,
    };
    try {
      const {
        data,
        data: { error: axiosError },
      } = await axios.post(GET_USER_API, userRequest);
      if (axiosError) {
        handleOpenToast('Error fetch user!');
        return { success: false };
      }
      handleSetUser(data);
      return { success: true };
    } catch (errorSetUser) {
      handleOpenToast('Error fetch user!');
      return { success: false };
    }
  };

  const onSignIn = async () => {
    const { valid, inputErrors } = validateInputs();
    if (valid) {
      try {
        setLoading(true);
        const {
          data,
          data: { error: errorAxios },
        } = await axios.post(SIGN_IN_API, credentials);
        if (errorAxios) {
          if (errorAxios === 'Password is incorrect') {
            setError((prevState) => ({ ...prevState, otherError: 'Password is incorrect.' }));
          } else {
            const { student, lecturer } = errorAxios;
            setError((prevState) => ({ ...prevState, otherError: student || lecturer }));
          }
        } else {
          const { token } = data;
          await storeAsyncStringData('fbToken', token);
          const { success } = await setUserInRedux();
          if (success) {
            resetRoute(navigation, ROUTES.MAIN);
          }
        }
        setLoading(false);
      } catch (errorOnSignIn) {
        handleOpenToast('Error fetch user!');
        setLoading(false);
      }
    } else {
      setError(inputErrors);
    }
  };

  return (
    <Login
      navigation={navigation}
      credentials={credentials}
      setCredentials={setCredentials}
      error={error}
      loading={loading}
      onSignIn={onSignIn}
      handleOpenToast={handleOpenToast}
    />
  );
};

LoginWrapper.propTypes = {
  navigation: object.isRequired,
  handleSetUser: func.isRequired,
  handleOpenToast: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleSetUser: (user) => dispatch(setUser(user)),
  handleOpenToast: (type, content) => dispatch(openToast(type, content)),
});

export default connect(null, mapDispatchToProps)(LoginWrapper);
