import React, { useEffect, useState } from 'react';
import { arrayOf, object } from 'prop-types';
import { connect } from 'react-redux';
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import styles from './CalendarStyle';
import FRAAAgenda from './components/agenda';
import { getAttendanceSessionsState } from '../../redux/reducers/AttendanceSessionsReducer';

const FRAACalendar = ({ navigation, attendanceSessions }) => {
  const todayDate = new Date().toISOString().split('T')[0];
  const [agendaSessions, setAgendaSessions] = useState([]);

  useEffect(() => {
    findPressedDateSession(todayDate);
  }, []);

  const findPressedDateSession = (date) => {
    const dateSessions = attendanceSessions.filter((session) => {
      const { validOn } = session;
      const eventDate = validOn.split('T')[0];
      return eventDate === date;
    });
    setAgendaSessions(dateSessions);
  };

  const getMarkedDates = () => {
    let markedDates = {};
    attendanceSessions.forEach((session) => {
      const { validOn } = session;
      const eventDate = validOn.split('T')[0];
      markedDates[eventDate] = {};
      markedDates[eventDate].marked = true;
      markedDates[eventDate].dotColor = '#E60028';
    });
    return markedDates;
  };

  const now = new Date().toISOString().split('T')[0];
  const theme = {
    selectedDayBackgroundColor: '#000054',
  };

  return (
    <CalendarProvider
      onDateChanged={(date) => findPressedDateSession(date)}
      date={now}
      showTodayButton
      disabledOpacity={0.6}
      todayBottomMargin={10}>
      <ExpandableCalendar
        theme={theme}
        markedDates={getMarkedDates()}
        markingType="single"
        style={styles.calendar}
        firstDay={1}
      />
      <FRAAAgenda agendaSessions={agendaSessions} />
    </CalendarProvider>
  );
};

FRAACalendar.propTypes = {
  navigation: object.isRequired,
  attendanceSessions: arrayOf(object).isRequired,
};

const mapStateToProps = (state) => ({
  attendanceSessions: getAttendanceSessionsState(state),
});

export default connect(mapStateToProps, null)(FRAACalendar);
