import React, { useState } from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';
import axios from 'axios';
import FRAAAgenda from './FRAAAgenda';
import { getUserState } from '../../../../../redux/reducers/UserReducer';
import {
  getAttendanceSessionsState,
  setAgendaSessions,
  setAttendanceSessions,
  setMarkedDates,
} from '../../../../../redux/reducers/AttendanceSessionsReducer';
import { GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE } from '../../../../../constants/ApiEndpoints';

const FRAAAgendaWrapper = ({
  attendanceSessions: { agendaSessions },
  user,
  handleSetAttendanceSessions,
  // handleSetMarkedDates,
  // handleSetAgendaSessions,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  console.log(agendaSessions, 'in agenda');
  const removeOldSessions = (sessions) => {
    // const now = new Date();

    // const filteredAttendanceSessions = sessions.filter((session) => {
    //   const { validOn } = session;
    //   return new Date(validOn) > now;
    // });

    handleSetAttendanceSessions(sessions);
    // handleSetAgendaSessions();
  };

  const refetchAttendanceSessions = async () => {
    const { subscribedCourses } = user;
    setRefreshing(true);
    try {
      const request = {
        courses: subscribedCourses,
        startMonth: 10,
        monthRange: 3,
      };
      (async () => {
        const { data } = await axios.post(GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE, request);
        if (data) {
          const { sessions, error } = data;
          if (error) {
            console.warn('error fetchAttendanceSessions: ', error);
          } else {
            removeOldSessions(sessions);
          }
        }
        setRefreshing(false);
      })();
    } catch (errorRefetchAttendanceSessions) {
      setRefreshing(false);
      console.warn('error refetchAttendanceSessions: ', errorRefetchAttendanceSessions);
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
  handleSetAttendanceSessions: func.isRequired,
  handleSetMarkedDates: func.isRequired,
  handleSetAgendaSessions: func.isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserState(state),
  attendanceSessions: getAttendanceSessionsState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetAttendanceSessions: (sessions) => dispatch(setAttendanceSessions(sessions)),
  handleSetAgendaSessions: (agendaSessions) => dispatch(setAgendaSessions(agendaSessions)),
  handleSetMarkedDates: (markedDates) => dispatch(setMarkedDates(markedDates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FRAAAgendaWrapper);
