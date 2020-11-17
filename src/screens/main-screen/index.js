import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { object, func } from 'prop-types';

import ROUTES from '../../navigation/routes';
import { setAttendanceSessions } from '../../redux/reducers/AttendanceSessionsReducer';
import {
  CHECK_IDENTITY_API,
  GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE,
  GET_USER_API,
  DEMO_EMAIL,
} from '../../constants/ApiEndpoints';
import { getUserState, setRegisteredIdentity, setUser } from '../../redux/reducers/UserReducer';
import MainScreen from './MainScreen';

const MainScreenWrapper = ({
  navigation,
  user,
  handleSetAttendanceSessions,
  handleSetRegisteredIdentity,
  handleSetUser,
}) => {
  const [currentTab, setCurrentTab] = useState(ROUTES.HOME);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({ errorLoadUser: '', errorLoadSessions: '' });

  useEffect(() => {
    setLoading(true);

    const userRequest = {
      email: DEMO_EMAIL,
      isLecturer: false,
    };

    const fetchAttendanceSessions = async (subscribedCourses) => {
      try {
        const request = {
          courses: subscribedCourses,
          startMonth: 10,
          monthRange: 3,
        };

        const { data } = await axios.post(GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE, request);
        if (data) {
          const { sessions: axiosSessions, markedDates, error } = data;
          if (error) {
            console.warn('error fetchAttendanceSessions: ', error);
          } else {
            handleSetAttendanceSessions(axiosSessions, markedDates);
          }
        }
      } catch (errorFetchAttendanceSessions) {
        console.warn('error fetchAttendanceSessions: ', errorFetchAttendanceSessions);
      }
    };

    const fetchUser = async () => {
      const { data, error } = await axios.post(GET_USER_API, userRequest);
      if (error) {
        console.warn('error fetchUser: ', error);
      } else {
        handleSetUser(data);
        await fetchAttendanceSessions(data.subscribedCourses);
      }
    };

    const fetchUserIdentity = async () => {
      const { data, error } = await axios.get(CHECK_IDENTITY_API);
      if (error) {
        console.warn('error fetchUserIdentity: ', error);
      }
      const { msg } = data;
      handleSetRegisteredIdentity(msg);
    };

    const { email: reduxEmail } = user;
    if (!reduxEmail) {
      Promise.all([fetchUser(), fetchUserIdentity()])
        .then(() => {})
        .catch((errorLoadUser) => {
          console.warn('error load user: ', errorLoadUser);
          setErrors((prevState) => ({ ...prevState, errorLoadUser }));
        });
    }
    setLoading(false);
  }, []);

  return (
    <MainScreen
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      navigation={navigation}
      loading={loading}
      errors={errors}
    />
  );
};

MainScreenWrapper.propTypes = {
  navigation: object.isRequired,
  attendanceSessions: object.isRequired,
  user: object.isRequired,
  handleSetAttendanceSessions: func.isRequired,
  handleSetUser: func.isRequired,
  handleSetRegisteredIdentity: func.isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetAttendanceSessions: (sessions, markedDates) => dispatch(setAttendanceSessions(sessions, markedDates)),
  handleSetRegisteredIdentity: (registered) => dispatch(setRegisteredIdentity(registered)),
  handleSetUser: (user) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreenWrapper);
