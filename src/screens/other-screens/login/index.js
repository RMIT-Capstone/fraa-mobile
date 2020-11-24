import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';
import axios from 'axios';
import { GET_USER_API, SIGN_IN_API } from '../../../constants/ApiEndpoints';
import { storeAsyncStringData } from '../../../helpers/async-storage';
import { resetRoute } from '../../../helpers/navigation';
import ROUTES from '../../../navigation/routes';
import Login from './Login';
import { setUser } from '../../../redux/reducers/UserReducer';

const LoginWrapper = ({ navigation, handleSetUser }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '', isLecturer: false });
  const [error, setError] = useState({ email: '', otherError: '' });
  const [loading, setLoading] = useState(false);

  const stringIsEmpty = (string) => {
    return string === '';
  };

  const isEmail = (email) => {
    let regEx;
    // eslint-disable-next-line no-useless-escape,max-len
    regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return Boolean(email.match(regEx));
  };

  const validateInputs = () => {
    const { email, password } = credentials;
    const inputErrors = {};
    if (stringIsEmpty(email)) {
      inputErrors.email = 'Email must not be empty.';
    } else if (!isEmail(email)) {
      inputErrors.email = 'Email is invalid.';
    }
    if (stringIsEmpty(password)) {
      inputErrors.otherError = 'Password must not be empty.';
    } else if (password.length < 6) {
      inputErrors.otherError = 'Password must have more than 6 characters.';
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
        console.warn('error setUser: ', axiosError);
        return { success: false };
      } else {
        handleSetUser(data);
        return { success: true };
      }
    } catch (errorSetUser) {
      console.warn('error setUser: ', errorSetUser);
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
        console.warn('error onSignIn: ', errorOnSignIn);
        setLoading(false);
      }
    } else {
      setError(inputErrors);
    }
  };

  return (
    <Login
      credentials={credentials}
      setCredentials={setCredentials}
      error={error}
      loading={loading}
      onSignIn={onSignIn}
    />
  );
};

LoginWrapper.propTypes = {
  navigation: object.isRequired,
  handleSetUser: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleSetUser: (user) => dispatch(setUser(user)),
});

export default connect(null, mapDispatchToProps)(LoginWrapper);
