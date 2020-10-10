import React from 'react';
import { object } from 'prop-types';
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import styles from './CalendarStyle';
import FRAAAgenda from './components/agenda';

const FRAACalendar = ({ navigation, getMarkedDates, onDateChanged, agendaSessions }) => {
  const now = new Date().toISOString().split('T')[0];
  return (
    <CalendarProvider
      onDateChanged={onDateChanged}
      date={now}
      showTodayButton
      disabledOpacity={0.6}
      todayBottomMargin={10}>
      <ExpandableCalendar markedDates={getMarkedDates()} style={styles.calendar} firstDay={1} />
      <FRAAAgenda agendaSessions={agendaSessions} />
    </CalendarProvider>
  );
};

export default FRAACalendar;
