import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {
  getAttendanceSessionsState,
  setAllSessions,
  setDisplaySession,
  setHomeScreenSessions,
} from '../../../redux/reducers/AttendanceSessionsReducer';
import Home from './Home';
import { getUserState } from '../../../redux/reducers/UserReducer';
import { GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE } from '../../../constants/ApiEndpoints';
import { openToast, TOAST_POSITIONS, TOAST_TYPES } from '../../../redux/reducers/ToastReducer';

const HomeWrapper = ({
  user: { email, subscribedCourses },
  attendanceSessions: { sessions, homeScreenSessions, displaySession },
  handleSetAllSessions,
  handleSetHomeSessions,
  handleSetDisplaySession,
  handleOpenToast,
}) => {
  const navigation = useNavigation();
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const [isHappening, setIsHappening] = useState(false);
  const [timeDifference, setTimeDifference] = useState({ hours: '', minutes: '' });

  useEffect(() => {
    setIsLoadingSessions(true);

    (async () => {
      if (sessions.length === 0) {
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
            handleOpenToast(TOAST_TYPES.ERROR, 'Fetch attendance session error!', TOAST_POSITIONS.BOTTOM, 2000);
          } else {
            const {
              success: { sessions: axiosSessions },
            } = data;

            const filterSessions = axiosSessions.filter((session) => {
              const { expireOn } = session;
              const rightNow = new Date();
              return new Date(expireOn) > rightNow;
            });
            if (filterSessions.length !== 0) {
              handleSetAllSessions(axiosSessions, filterSessions, filterSessions[0]);
            } else {
              handleSetAllSessions(axiosSessions, filterSessions, {});
            }
          }
        } catch (errorFetchAttendanceSessions) {
          handleOpenToast(TOAST_TYPES.ERROR, 'Fetch attendance session error!', TOAST_POSITIONS.BOTTOM, 2000);
        }
      }
    })();
    setIsLoadingSessions(false);
  }, []);

  const loadDisplaySession = () => {
    const rightNow = new Date();

    const filteredSessions = homeScreenSessions.filter((session) => {
      const { expireOn } = session;
      return new Date(expireOn) > rightNow;
    });

    if (filteredSessions.length !== homeScreenSessions.length) {
      if (filteredSessions.length !== 0) {
        handleSetHomeSessions(filteredSessions);
        handleSetDisplaySession(filteredSessions[0]);
      } else {
        handleSetHomeSessions([]);
        handleSetDisplaySession({});
      }
    }

    const { validOn, expireOn } = displaySession;
    setIsHappening(rightNow > new Date(validOn) && rightNow < new Date(expireOn));

    const timeDifferenceLoad = new Date(validOn) - rightNow;
    const truncated = Math.trunc(timeDifferenceLoad / 1000);
    setTimeDifference({ hours: Math.floor(truncated / 3600), minutes: Math.floor((truncated % 3600) / 60) + 1 });
  };

  useEffect(() => {
    setIsLoadingSessions(true);
    if (homeScreenSessions.length !== 0) {
      loadDisplaySession();
    }
    setIsLoadingSessions(false);
  }, []);

  useEffect(() => {
    let interval = null;

    if (homeScreenSessions.length !== 0 && displaySession !== {}) {
      interval = setInterval(() => {
        loadDisplaySession();
      }, 300);
    }

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <Home
      email={email}
      isLoadingSessions={isLoadingSessions}
      timeDifference={timeDifference}
      navigation={navigation}
      isHappening={isHappening}
      homeScreenSessions={homeScreenSessions}
      displaySession={displaySession}
    />
  );
};

HomeWrapper.propTypes = {
  user: object.isRequired,
  attendanceSessions: object.isRequired,
  handleSetAllSessions: func.isRequired,
  handleSetHomeSessions: func.isRequired,
  handleSetDisplaySession: func.isRequired,
  handleOpenToast: func.isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserState(state),
  attendanceSessions: getAttendanceSessionsState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetAllSessions: (sessions, homeSessions, displaySession) =>
    dispatch(setAllSessions(sessions, homeSessions, displaySession)),
  handleSetHomeSessions: (homeSessions) => dispatch(setHomeScreenSessions(homeSessions)),
  handleSetDisplaySession: (displaySession) => dispatch(setDisplaySession(displaySession)),
  handleOpenToast: (type, content, position, duration) => dispatch(openToast(type, content, position, duration)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeWrapper);
