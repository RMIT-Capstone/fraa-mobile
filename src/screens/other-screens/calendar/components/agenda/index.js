import React from 'react';
import { connect } from 'react-redux';
import asCalendarConsumer from 'react-native-calendars/src/expandableCalendar/asCalendarConsumer';
import { object, func, string } from 'prop-types';
import axios from 'axios';
import FRAAAgenda from './FRAAAgenda';
import { getUserState } from '../../../../../redux/reducers/UserReducer';
import {
  getAttendanceSessionsState,
  setAgendaSessions,
  setAllSessions,
} from '../../../../../redux/reducers/AttendanceSessionsReducer';
import { openToast, TOAST_POSITIONS, TOAST_TYPES } from '../../../../../redux/reducers/ToastReducer';
import { GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE } from '../../../../../constants/ApiEndpoints';

class FRAAAgendaWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      selectedDate: currentDate,
      attendanceSessions: { sessions, agendaSessions },
      handleSetAgendaSessions,
    } = this.props;
    if (sessions.length !== 0) {
      const dateSessions = sessions.filter((session) => {
        const { validOn } = session;
        const eventDate = validOn.split('T')[0];
        return eventDate === currentDate;
      });
      if (dateSessions !== agendaSessions) {
        handleSetAgendaSessions(dateSessions);
      }
    }
  }

  render() {
    const {
      attendanceSessions: { agendaSessions },
      user,
      handleSetAllAttendanceSessions,
      handleOpenToast,
      selectedDate,
    } = this.props;

    const refetchAttendanceSessions = async () => {
      const { subscribedCourses } = user;
      this.setState({ refreshing: true });
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
              success: { sessions, markedDates },
            } = data;

            const dateSessions = sessions.filter((session) => {
              const { validOn } = session;
              const eventDate = validOn.split('T')[0];
              return eventDate === selectedDate;
            });

            const homeScreenSessions = sessions.filter((session) => {
              const { expireOn } = session;
              const rightNow = new Date();
              return new Date(expireOn) > rightNow;
            });

            handleSetAllAttendanceSessions(sessions, homeScreenSessions, dateSessions, markedDates);
          }
          this.setState({ refreshing: false });
        })();
      } catch (errorRefetchAttendanceSessions) {
        this.setState({ refreshing: false });
        handleOpenToast(TOAST_TYPES.ERROR, 'Error refetch attendance sessions!', TOAST_POSITIONS.BOTTOM, 2000);
      }
    };

    const { refreshing } = this.state;

    return (
      <FRAAAgenda
        agendaSessions={agendaSessions}
        refreshing={refreshing}
        refetchAttendanceSessions={refetchAttendanceSessions}
      />
    );
  }
}

FRAAAgendaWrapper.propTypes = {
  attendanceSessions: object.isRequired,
  user: object.isRequired,
  handleSetAllAttendanceSessions: func.isRequired,
  handleSetAgendaSessions: func.isRequired,
  handleOpenToast: func.isRequired,
  selectedDate: string.isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserState(state),
  attendanceSessions: getAttendanceSessionsState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetAllAttendanceSessions: (session, homeSessions, agendaSessions, markedDates) =>
    dispatch(setAllSessions(session, homeSessions, agendaSessions, markedDates)),
  handleSetAgendaSessions: (agendaSessions) => dispatch(setAgendaSessions(agendaSessions)),
  handleOpenToast: (type, content, position, duration) => dispatch(openToast(type, content, position, duration)),
});

export default connect(mapStateToProps, mapDispatchToProps)(asCalendarConsumer(FRAAAgendaWrapper));
