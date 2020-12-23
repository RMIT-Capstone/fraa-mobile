import React, { useEffect, useState } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  getAttendanceSessionsState,
  setHomeScreenSessions,
  setSessions,
} from '../../../redux/reducers/AttendanceSessionsReducer';
import Calendar from './Calendar';
import { GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE } from '../../../constants/ApiEndpoints';
import { openToast, TOAST_POSITIONS, TOAST_TYPES } from '../../../redux/reducers/ToastReducer';
import { getUserState } from '../../../redux/reducers/UserReducer';

const CalendarWrapper = ({ attendanceSessions: { sessions }, user, handleSetSessions, handleSetHomeSessions, handleOpenToast }) => {
  const OPTIONS = ['Yesterday', 'Today', 'Tomorrow'];
  const [activeDay, setActiveDay] = useState({ day: OPTIONS[1], index: 1 });
  const [agendaDate, setAgendaDate] = useState(new Date().getDate());
  const [agendaSessions, setAgendaSessions] = useState([]);
  const [refetching, setRefetching] = useState(false);
  const { index } = activeDay;

  useEffect(() => {
    const today = new Date();
    if (sessions.length !== 0) {
      const dateSessions = sessions.filter((session) => {
        const { validOn } = session;
        const dateValidOn = validOn.split('T')[0];
        const filterDate = new Date(today.getFullYear(), today.getMonth(), agendaDate + 1).toISOString().split('T')[0];
        return filterDate === dateValidOn;
      });
      setAgendaSessions(dateSessions);
    }
  }, [agendaDate]);

  const handleSwipeRight = () => {
    if (index > 0 && index <= 2) {
      setActiveDay((prevState) => ({ ...prevState, day: OPTIONS[index - 1], index: index - 1 }));
      setAgendaDate(agendaDate - 1);
    }
  };

  const handleSwipeLeft = () => {
    if (index >= 0 && index < 2) {
      setActiveDay((prevState) => ({ ...prevState, day: OPTIONS[index + 1], index: index + 1 }));
      setAgendaDate(agendaDate + 1);
    }
  };

  const refetchAttendanceSessions = async () => {
    const { subscribedCourses } = user;
    setRefetching(true);
    try {
      const today = new Date();
      const request = {
        courses: subscribedCourses,
        startMonth: today.getMonth(),
        monthRange: 3,
      };
      (async () => {
        const { data, error } = await axios.post(GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE, request);
        if (error) {
          handleOpenToast(TOAST_TYPES.ERROR, 'Error refetch attendance sessions!', TOAST_POSITIONS.BOTTOM, 2000);
        } else {
          const {
            success: { sessions: axiosSessions },
          } = data;

          const homeScreenSessions = sessions.filter((session) => {
            const { expireOn } = session;
            const rightNow = new Date();
            return new Date(expireOn) > rightNow;
          });

          handleSetSessions(axiosSessions);
          handleSetHomeSessions(homeScreenSessions);
        }
        setRefetching(false);
      })();
    } catch (errorRefetchAttendanceSessions) {
      setRefetching(false);
      handleOpenToast(TOAST_TYPES.ERROR, 'Error refetch attendance sessions!', TOAST_POSITIONS.BOTTOM, 2000);
    }
  };

  return (
    <Calendar
      agendaSessions={agendaSessions}
      activeDay={activeDay}
      handleSwipeLeft={handleSwipeLeft}
      handleSwipeRight={handleSwipeRight}
      refetching={refetching}
      refetchAttendanceSessions={refetchAttendanceSessions}
      OPTIONS={OPTIONS}
    />
  );
};

CalendarWrapper.propTypes = {
  attendanceSessions: object.isRequired,
  user: object.isRequired,
  handleSetSessions: func.isRequired,
  handleSetHomeSessions: func.isRequired,
  handleOpenToast: func.isRequired,
};

const mapStateToProps = (state) => ({
  attendanceSessions: getAttendanceSessionsState(state),
  user: getUserState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetSessions: (sessions) => dispatch(setSessions(sessions)),
  handleSetHomeSessions: (homeSessions) => dispatch(setHomeScreenSessions(homeSessions)),
  handleOpenToast: (type, content, position, duration) => dispatch(openToast(type, content, position, duration)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarWrapper);
