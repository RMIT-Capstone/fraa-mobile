import React, { useState } from 'react';
import { connect } from 'react-redux';
import { arrayOf, object, func } from 'prop-types';
import axios from 'axios';
import FRAAAgenda from './FRAAAgenda';
import { getUserState } from '../../../../redux/reducers/UserReducer';
import { setAttendanceSessions } from '../../../../redux/reducers/AttendanceSessionsReducer';
import { GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE } from '../../../../constants/ApiEndpoints';

const FRAAAgendaWrapper = ({ agendaSessions, user, handleSetAttendanceSessions }) => {
  const [refreshing, setRefreshing] = useState(false);

  const removeOldSessions = (sessions, markedDates) => {
    console.log('sessessions', sessions);
    const now = new Date();
    const filteredAttendanceSessions = sessions.filter((session) => {
      const { validOn } = session;
      return new Date(validOn) > now;
    });
    handleSetAttendanceSessions(filteredAttendanceSessions, markedDates);
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
          const { sessions, markedDates, error } = data;
          if (error) {
            console.warn('error fetchAttendanceSessions: ', error);
          } else {
            removeOldSessions(sessions, markedDates);
          }
        }
      })();
    } catch (errorRefetchAttendanceSessions) {
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
  agendaSessions: arrayOf(object).isRequired,
  user: object.isRequired,
  handleSetAttendanceSessions: func.isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetAttendanceSessions: (sessions, markedDates) => dispatch(setAttendanceSessions(sessions, markedDates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FRAAAgendaWrapper);
