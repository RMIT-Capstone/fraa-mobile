import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import FRAAAgenda from './components/agenda';
import { getAttendanceSessionsState, setAgendaSessions } from '../../../redux/reducers/AttendanceSessionsReducer';

const FRAACalendar = ({ attendanceSessions: { sessions, markedDates }, handleSetAgendaSessions }) => {
  const now = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
  }, []);

  const findSessionsByDate = (date) => {
    setSelectedDate(date);

    const dateSessions = sessions.filter((session) => {
      if (session) {
        const { validOn } = session;
        const eventDate = validOn.split('T')[0];
        return eventDate === date;
      }
      return false;
    });

    handleSetAgendaSessions(dateSessions);
  };

  const theme = { selectedDayBackgroundColor: '#000054' };

  return (
    <CalendarProvider
      onDateChanged={(date) => findSessionsByDate(date)}
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
      <FRAAAgenda selectedDate={selectedDate} />
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10,
  },
});

FRAACalendar.propTypes = {
  attendanceSessions: object.isRequired,
  handleSetAgendaSessions: func.isRequired,
};

const mapStateToProps = (state) => ({ attendanceSessions: getAttendanceSessionsState(state) });

const mapDispatchToProps = (dispatch) => ({
  handleSetAgendaSessions: (agendaSessions) => dispatch(setAgendaSessions(agendaSessions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FRAACalendar);
