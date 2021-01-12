import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { storeAsyncStringData } from '../../../helpers/async-storage';
import { resetRoute } from '../../../helpers/navigation';
import { isEmail, stringIsEmpty } from '../../../helpers/utils';
import { setUser, setUserStats, setUserCourses } from '../../../redux/reducers/UserReducer';
import { openToast, TOAST_POSITIONS, TOAST_TYPES } from '../../../redux/reducers/ToastReducer';
import {
  ATTENDANCE_STATS_NO_GROUPING,
  CURRENT_SEMESTER,
  GET_COURSES_BY_CODES,
  SIGN_IN_API,
} from '../../../constants/ApiEndpoints';
import ROUTES from '../../../navigation/routes';
import Login from './Login';

const LoginWrapper = ({ navigation, handleSetUser, handleSetUserStats, handleSetUserCourses, handleOpenToast }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '', isLecturer: false });
  const [error, setError] = useState({ email: '', otherError: '' });
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setError({ email: '', otherError: '' });
    }, []),
  );

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
      setError({ email: '', otherError: '' });
    }
  }, [credentials]);

  const setUserInRedux = async (user, token) => {
    await storeAsyncStringData('fbToken', token);
    handleSetUser(user);
  };

  const fetchUserStats = async (email, courses) => {
    try {
      const {
        data: { success, error: errorAxios },
      } = await axios.post(ATTENDANCE_STATS_NO_GROUPING, { email, courses, semester: CURRENT_SEMESTER });
      if (errorAxios) {
        handleOpenToast(TOAST_TYPES.ERROR, 'Error fetch user stats!', TOAST_POSITIONS.BOTTOM, 1500);
      } else {
        handleSetUserStats(success);
      }
    } catch (errorFetchUserStats) {
      handleOpenToast(TOAST_TYPES.ERROR, 'Error fetch user stats!', TOAST_POSITIONS.BOTTOM, 1500);
    }
  };

  const getSubscribedCourses = async (subscribedCourses) => {
    try {
      const {
        data,
        data: { error: errorGetCourses },
      } = await axios.post(GET_COURSES_BY_CODES, { courses: subscribedCourses });
      if (data && data.success) {
        const {
          success: { courses },
        } = data;
        handleSetUserCourses(courses);
      }
      if (errorGetCourses) {
        handleOpenToast(TOAST_TYPES.ERROR, 'Error get courses!', TOAST_POSITIONS.BOTTOM, 1500);
      }
    } catch (errorGetSubscribedCourses) {
      handleOpenToast(TOAST_TYPES.ERROR, 'Error get courses!', TOAST_POSITIONS.BOTTOM, 1500);
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
            setError((prevState) => ({ ...prevState, otherError: 'Password is incorrect' }));
          } else {
            const { user } = errorAxios;
            setError((prevState) => ({ ...prevState, otherError: user }));
          }
        } else {
          const {
            success: {
              user,
              token,
              user: { email, subscribedCourses },
            },
          } = data;
          await Promise.all([setUserInRedux(user, token), fetchUserStats(email, subscribedCourses)]);
          await getSubscribedCourses(subscribedCourses);
          setLoggedIn(true);
          setTimeout(() => {
            resetRoute(navigation, ROUTES.MAIN);
          }, 1000);
        }
        setLoading(false);
      } catch (errorOnSignIn) {
        handleOpenToast(TOAST_TYPES.ERROR, 'Error fetch user!', TOAST_POSITIONS.BOTTOM, 2000);
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
      loggedIn={loggedIn}
      onSignIn={onSignIn}
    />
  );
};

LoginWrapper.propTypes = {
  navigation: object.isRequired,
  handleSetUser: func.isRequired,
  handleSetUserStats: func.isRequired,
  handleSetUserCourses: func.isRequired,
  handleOpenToast: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleSetUser: (user) => dispatch(setUser(user)),
  handleSetUserStats: (stats) => dispatch(setUserStats(stats)),
  handleSetUserCourses: (courses) => dispatch(setUserCourses(courses)),
  handleOpenToast: (type, content, position, duration) => dispatch(openToast(type, content, position, duration)),
});

export default connect(null, mapDispatchToProps)(LoginWrapper);
