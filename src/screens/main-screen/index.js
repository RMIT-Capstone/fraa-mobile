import React, { useState, useEffect } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import ROUTES from '../../navigation/routes';
import { CHECK_IDENTITY_API, GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE } from '../../constants/ApiEndpoints';

import { setAllSessions } from '../../redux/reducers/AttendanceSessionsReducer';
import { getUserState, setRegisteredIdentity } from '../../redux/reducers/UserReducer';
import MainScreen from './MainScreen';
import { getAsyncStringData } from '../../helpers/async-storage';
import { navigateTo } from '../../helpers/navigation';

const MainScreenWrapper = ({ navigation, user, handleSetAllSessions, handleSetRegisteredIdentity }) => {
  const [currentTab, setCurrentTab] = useState(ROUTES.HOME);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    (async () => {
      const value = await getAsyncStringData('fbToken');
      if (!value) {
        navigateTo(navigation, ROUTES.LOGIN);
      }
    })();
  }, []);

  useEffect(() => {
    setLoading(true);

    const fetchAttendanceSessions = async () => {
      const { subscribedCourses } = user;
      try {
        const today = new Date();
        const request = {
          courses: subscribedCourses,
          startMonth: today.getMonth(),
          monthRange: 3,
        };
        const {
          data,
          data: { error: fetchAttendanceSessionsError },
        } = await axios.post(GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE, request);
        if (fetchAttendanceSessionsError) {
          console.warn('error fetchAttendanceSessions: ', fetchAttendanceSessionsError);
        } else {
          const { sessions: axiosSessions, markedDates } = data;
          const dateSessions = axiosSessions.filter((session) => {
            const { validOn } = session;
            const eventDate = validOn.split('T')[0];
            return eventDate === new Date().toISOString().split('T')[0];
          });
          handleSetAllSessions(axiosSessions, axiosSessions, dateSessions, markedDates);
        }
      } catch (errorFetchAttendanceSessions) {
        console.warn('error fetchAttendanceSessions: ', errorFetchAttendanceSessions);
      }
    };

    const fetchUserIdentity = async () => {
      const { data, error: fetchUserIdentityError } = await axios.get(CHECK_IDENTITY_API);
      if (fetchUserIdentityError) {
        console.warn('error fetchUserIdentity: ', fetchUserIdentityError);
      } else {
        const { msg } = data;
        handleSetRegisteredIdentity(msg);
      }
    };

    Promise.all([fetchAttendanceSessions(), fetchUserIdentity()])
      .then(() => {
        setLoading(false);
      })
      .catch((errorLoadUser) => {
        setLoading(false);
        setError(JSON.stringify(errorLoadUser));
        console.warn('error load user: ', errorLoadUser);
      });
  }, []);

  return <MainScreen currentTab={currentTab} setCurrentTab={setCurrentTab} loading={loading} error={error} />;
};

MainScreenWrapper.propTypes = {
  navigation: object.isRequired,
  user: object.isRequired,
  handleSetAllSessions: func.isRequired,
  handleSetRegisteredIdentity: func.isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetAllSessions: (sessions, homeScreenSessions, agendaSessions, markedDates) =>
    dispatch(setAllSessions(sessions, homeScreenSessions, agendaSessions, markedDates)),
  handleSetRegisteredIdentity: (registered) => dispatch(setRegisteredIdentity(registered)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreenWrapper);
