import React, { useState, useEffect } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import ROUTES from '../../navigation/routes';
import { GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE } from '../../constants/ApiEndpoints';
import { getAttendanceSessionsState, setAllSessions } from '../../redux/reducers/AttendanceSessionsReducer';
import { getUserState, setRegisteredIdentity } from '../../redux/reducers/UserReducer';
import { getAsyncStringData } from '../../helpers/async-storage';
import { resetRoute} from '../../helpers/navigation';
import { openToast, TOAST_POSITIONS, TOAST_TYPES } from '../../redux/reducers/ToastReducer';
import MainScreen from './MainScreen';

const MainScreenWrapper = ({
  navigation,
  user,
  attendanceSessions: { sessions },
  handleSetAllSessions,
  handleOpenToast,
}) => {
  const [currentTab, setCurrentTab] = useState(ROUTES.HOME);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    (async () => {
      const value = await getAsyncStringData('fbToken');
      if (!value || user === {}) {
        handleOpenToast(TOAST_TYPES.INFO, 'Logged out', TOAST_POSITIONS.BOTTOM, 1000);
        resetRoute(navigation, ROUTES.LOGIN);
      }
    })();
  }, [user]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      if (sessions.length === 0) {
        const { subscribedCourses } = user;
        try {
          const today = new Date();
          const request = {
            courses: subscribedCourses,
            startMonth: today.getMonth(),
            monthRange: 3,
          };
          const { data, error: fetchAttendanceSessionsError } = await axios.post(
            GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE,
            request,
          );
          if (fetchAttendanceSessionsError) {
            setError(JSON.stringify(fetchAttendanceSessionsError));
            handleOpenToast(TOAST_TYPES.ERROR, 'Fetch attendance session error!', TOAST_POSITIONS.BOTTOM, 2000);
          } else {
            const {
              success: { sessions: axiosSessions, markedDates },
            } = data;

            const agendaSessions = axiosSessions.filter((session) => {
              const { validOn } = session;
              const eventDate = validOn.split('T')[0];
              return eventDate === new Date().toISOString().split('T')[0];
            });

            const homeScreenSessions = axiosSessions.filter((session) => {
              const { expireOn } = session;
              const rightNow = new Date();
              return new Date(expireOn) > rightNow;
            });

            handleSetAllSessions(axiosSessions, homeScreenSessions, agendaSessions, markedDates);
          }
        } catch (errorFetchAttendanceSessions) {
          setError(JSON.stringify(errorFetchAttendanceSessions));
          handleOpenToast(TOAST_TYPES.ERROR, 'Fetch attendance session error!', TOAST_POSITIONS.BOTTOM, 2000);
        }
      }
    })();
    setLoading(false);
  }, []);

  return <MainScreen currentTab={currentTab} setCurrentTab={setCurrentTab} loading={loading} error={error} />;
};

MainScreenWrapper.propTypes = {
  navigation: object.isRequired,
  user: object.isRequired,
  attendanceSessions: object.isRequired,
  handleSetAllSessions: func.isRequired,
  handleOpenToast: func.isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserState(state),
  attendanceSessions: getAttendanceSessionsState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetAllSessions: (sessions, homeScreenSessions, agendaSessions, markedDates) =>
    dispatch(setAllSessions(sessions, homeScreenSessions, agendaSessions, markedDates)),
  handleSetRegisteredIdentity: (registered) => dispatch(setRegisteredIdentity(registered)),
  handleOpenToast: (type, content, position, duration) => dispatch(openToast(type, content, position, duration)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreenWrapper);
