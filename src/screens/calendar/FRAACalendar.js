import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import FRAAAgenda from './components/agenda';
import { getAttendanceSessionsState } from '../../redux/reducers/AttendanceSessionsReducer';

const FRAACalendar = ({ navigation, attendanceSessions }) => {
  const { sessions, markedDates } = attendanceSessions;
  const todayDate = new Date().toISOString().split('T')[0];
  const now = new Date().toISOString().split('T')[0];
  const [agendaSessions, setAgendaSessions] = useState([]);

  useEffect(() => {
    findPressedDateSession(todayDate);
  }, []);

  const findPressedDateSession = (date) => {
    const dateSessions = sessions.filter((session) => {
      const { validOn } = session;
      const eventDate = validOn.split('T')[0];
      return eventDate === date;
    });
    setAgendaSessions(dateSessions);
  };

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
        markedDates={markedDates}
        markingType="single"
        style={styles.calendar}
        firstDay={1}
      />
      <FRAAAgenda agendaSessions={agendaSessions} />
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

FRAACalendar.propTypes = {
  navigation: object.isRequired,
  attendanceSessions: object.isRequired,
};

const mapStateToProps = (state) => ({
  attendanceSessions: getAttendanceSessionsState(state),
});

export default connect(mapStateToProps, null)(FRAACalendar);
