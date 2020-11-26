import React, { useState } from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';
import axios from 'axios';
import FRAAAgenda from './FRAAAgenda';
import { getUserState } from '../../../../../redux/reducers/UserReducer';
import { getAttendanceSessionsState, setAllSessions } from '../../../../../redux/reducers/AttendanceSessionsReducer';
import { openToast } from '../../../../../redux/reducers/ToastReducer';
import { GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE } from '../../../../../constants/ApiEndpoints';

const FRAAAgendaWrapper = ({
  attendanceSessions: { agendaSessions },
  user,
  handleSetAllAttendanceSessions,
  handleOpenToast,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const refetchAttendanceSessions = async () => {
    const { subscribedCourses } = user;
    setRefreshing(true);
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
          handleOpenToast('Error refetch attendance sessions!');
        } else {
          const { sessions, markedDates } = data;
          const dateSessions = sessions.filter((session) => {
            const { validOn } = session;
            const eventDate = validOn.split('T')[0];
            return eventDate === new Date().toISOString().split('T')[0];
          });
          handleSetAllAttendanceSessions(sessions, sessions, dateSessions, markedDates);
        }
        setRefreshing(false);
      })();
    } catch (errorRefetchAttendanceSessions) {
      setRefreshing(false);
      handleOpenToast('Error refetch attendance sessions!');
    }
  };
  return (
    <FRAAAgenda
      agendaSessions={agendaSessions}
      refreshing={refreshing}
      refetchAttendanceSessions={refetchAttendanceSessions}
    />
  );
};

FRAAAgendaWrapper.propTypes = {
  attendanceSessions: object.isRequired,
  user: object.isRequired,
  handleSetAllAttendanceSessions: func.isRequired,
  handleOpenToast: func.isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserState(state),
  attendanceSessions: getAttendanceSessionsState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetAllAttendanceSessions: (session, homeSessions, agendaSessions, markedDates) =>
    dispatch(setAllSessions(session, homeSessions, agendaSessions, markedDates)),
  handleOpenToast: (content) => dispatch(openToast(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FRAAAgendaWrapper);
