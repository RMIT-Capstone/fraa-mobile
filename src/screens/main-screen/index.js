import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { object, func } from 'prop-types';

import ROUTES from '../../navigation/routes';
import { getAttendanceSessionsState, setAttendanceSessions } from '../../redux/reducers/AttendanceSessionsReducer';
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
  attendanceSessions,
  user,
  handleSetAttendanceSessions,
  handleSetRegisteredIdentity,
  handleSetUser,
}) => {
  const [currentTab, setCurrentTab] = useState(ROUTES.HOME);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({ errorLoadUser: '', errorLoadSessions: '' });

  useEffect(() => {
    const userRequest = {
      email: DEMO_EMAIL,
    };

    const fetchUser = async () => {
      const { data } = await axios.post(GET_USER_API, userRequest);
      if (data) {
        const { error } = data;
        if (error) {
          console.warn('error fetchUser: ', error);
        } else {
          handleSetUser(data);
        }
      }
    };

    const fetchUserIdentity = async () => {
      const { data } = await axios.get(CHECK_IDENTITY_API);
      if (data) {
        const { msg } = data;
        handleSetRegisteredIdentity(msg);
      }
    };

    const { email: reduxEmail } = user;
    if (!reduxEmail) {
      setLoading(true);
      try {
        Promise.all([fetchUser(), fetchUserIdentity()]);
      } catch (errorLoadUser) {
        setErrors((prevState) => ({ ...prevState, errorLoadUser }));
      }
    }
  }, []);

  useEffect(() => {
    const { sessions } = attendanceSessions;
    const { subscribedCourses } = user;

    if (sessions.length === 0 && subscribedCourses) {
      setLoading(true);
      const sessionsRequest = {
        courses: subscribedCourses,
        startMonth: 9,
        monthRange: 3,
      };
      try {
        (async () => {
          const { data } = await axios.post(GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE, sessionsRequest);
          if (data) {
            const { sessions: axiosSessions, markedDates, error } = data;
            if (error) {
              console.warn('error fetchAttendanceSessions: ', error);
            } else {
              handleSetAttendanceSessions(axiosSessions, markedDates);
            }
          }
          setLoading(false);
        })();
      } catch (errorFetchAttendanceSessions) {
        console.warn('error fetch sessions: ', errorFetchAttendanceSessions);
      }
    }
  }, [attendanceSessions, user]);

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
  attendanceSessions: getAttendanceSessionsState(state),
  user: getUserState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetAttendanceSessions: (sessions, markedDates) => dispatch(setAttendanceSessions(sessions, markedDates)),
  handleSetRegisteredIdentity: (registered) => dispatch(setRegisteredIdentity(registered)),
  handleSetUser: (user) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreenWrapper);
