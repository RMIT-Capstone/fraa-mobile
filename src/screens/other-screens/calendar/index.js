import React, { useEffect, useState } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { getAttendanceSessionsState, setAllSessions } from '../../../redux/reducers/AttendanceSessionsReducer';
import Calendar from './Calendar';
import { GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE } from '../../../constants/ApiEndpoints';
import { openToast, TOAST_POSITIONS, TOAST_TYPES } from '../../../redux/reducers/ToastReducer';
import { getUserState } from '../../../redux/reducers/UserReducer';

const CalendarWrapper = ({
  attendanceSessions: { sessions },
  user: { subscribedCourses },
  handleSetAllSessions,
  handleOpenToast,
}) => {
  const todayDate = new Date().getDate();
  const OPTIONS = ['Yesterday', 'Today', 'Tomorrow'];
  const [activeDay, setActiveDay] = useState({ day: OPTIONS[1], date: todayDate, index: 1 });
  const [agendaSessions, setAgendaSessions] = useState([]);
  const [refetching, setRefetching] = useState(false);
  const { date } = activeDay;

  useEffect(() => {
    const today = new Date();
    if (sessions.length !== 0) {
      const dateSessions = sessions.filter((session) => {
        const { validOn } = session;
        const dateValidOn = validOn.split('T')[0];
        const filterDate = new Date(today.getFullYear(), today.getMonth(), date + 1).toISOString().split('T')[0];

        return filterDate === dateValidOn;
      });
      setAgendaSessions(dateSessions);
    }
  }, [date]);

  const handleDatePress = (dateIndex) => {
    setActiveDay((prevState) => ({ ...prevState, day: OPTIONS[dateIndex], index: dateIndex }));
    if (dateIndex === 0) {
      setActiveDay((prevState) => ({ ...prevState, date: todayDate - 1 }));
    } else if (dateIndex === 1) {
      setActiveDay((prevState) => ({ ...prevState, date: todayDate }));
    } else {
      setActiveDay((prevState) => ({ ...prevState, date: todayDate + 1 }));
    }
  };

  const refetchAttendanceSessions = async () => {
    setRefetching(true);
    try {
      const today = new Date();
      const request = {
        courses: subscribedCourses,
        startMonth: today.getMonth(),
        startYear: today.getFullYear() - 1,
        endYear: today.getFullYear(),
        monthRange: 3,
      };
      (async () => {
        const { data, error } = await axios.post(GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE, request);
        if (data && data.success) {
          const {
            success: { sessions: axiosSessions },
          } = data;

          const homeScreenSessions = axiosSessions.filter((session) => {
            const { expireOn } = session;
            const rightNow = new Date();
            return new Date(expireOn) > rightNow;
          });

          const filteredSessions = axiosSessions.filter((session) => {
            const { validOn } = session;
            const dateValidOn = validOn.split('T')[0];
            const filterDate = new Date(today.getFullYear(), today.getMonth(), date + 1).toISOString().split('T')[0];
            return filterDate === dateValidOn;
          });

          if (homeScreenSessions.length !== 0) {
            handleSetAllSessions(axiosSessions, homeScreenSessions, homeScreenSessions[0]);
          } else {
            handleSetAllSessions(axiosSessions, homeScreenSessions, {});
          }

          setAgendaSessions(filteredSessions);
        }
        if (error) {
          handleOpenToast(TOAST_TYPES.ERROR, 'Error refetch attendance sessions!', TOAST_POSITIONS.BOTTOM, 2000);
        }
      })();
    } catch (errorRefetchAttendanceSessions) {
      handleOpenToast(TOAST_TYPES.ERROR, 'Error refetch attendance sessions!', TOAST_POSITIONS.BOTTOM, 2000);
    }
    setRefetching(false);
  };

  return (
    <Calendar
      agendaSessions={agendaSessions}
      activeDay={activeDay}
      handleDatePress={handleDatePress}
      refetching={refetching}
      refetchAttendanceSessions={refetchAttendanceSessions}
      OPTIONS={OPTIONS}
    />
  );
};

CalendarWrapper.propTypes = {
  attendanceSessions: object.isRequired,
  user: object.isRequired,
  handleSetAllSessions: func.isRequired,
  handleOpenToast: func.isRequired,
};

const mapStateToProps = (state) => ({
  attendanceSessions: getAttendanceSessionsState(state),
  user: getUserState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetAllSessions: (sessions, homeSessions, displaySession) =>
    dispatch(setAllSessions(sessions, homeSessions, displaySession)),
  handleOpenToast: (type, content, position, duration) => dispatch(openToast(type, content, position, duration)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarWrapper);
