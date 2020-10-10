import React, { useEffect, useState } from 'react';
import { object } from 'prop-types';
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import styles from './CalendarStyle';
import FRAAAgenda from './components/agenda';
import MOCK_SESSIONS from './MockSessions';

const FRAACalendar = ({ navigation }) => {
  const todayDate = new Date().toISOString().split('T')[0];
  const [agendaSessions, setAgendaSessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(todayDate);

  useEffect(() => {
    findPressedDateSession(todayDate);
  }, [todayDate]);

  let SESSIONS = [];
  let oldEventDate = '';
  MOCK_SESSIONS.forEach((session) => {
    const { courseCode, courseName, createdAt, expireOn, id, lecturer, validOn, location } = session;
    let sessionData = { courseCode, courseName, createdAt, expireOn, id, lecturer, validOn, location };
    const eventDate = validOn.split('T')[0];
    if (oldEventDate !== eventDate) {
      let event = {};
      oldEventDate = eventDate;
      event.title = eventDate;
      event.data = [];
      event.data.push(sessionData);
      SESSIONS.push(event);
    } else {
      const index = SESSIONS.findIndex((displaySession) => displaySession.title === oldEventDate);
      SESSIONS[index].data.push(sessionData);
    }
  });

  const getMarkedDates = () => {
    let marked = {};
    SESSIONS.forEach((session) => {
      marked[session.title] = { marked: true };
    });
    return marked;
  };

  const findPressedDateSession = (date) => {
    const dateSessions = MOCK_SESSIONS.filter((session) => {
      const { validOn } = session;
      const eventDate = validOn.split('T')[0];
      return eventDate === date;
    });
    setAgendaSessions(dateSessions);
  };

  const onDateChanged = (date) => {
    findPressedDateSession(date);
    setSelectedDate(date);
  };

  const now = new Date().toISOString().split('T')[0];
  return (
    <CalendarProvider
      onDateChanged={onDateChanged}
      date={now}
      showTodayButton
      disabledOpacity={0.6}
      todayBottomMargin={10}>
      <ExpandableCalendar markedDates={getMarkedDates()} style={styles.calendar} firstDay={1} />
      <FRAAAgenda agendaSessions={agendaSessions} selectedDate={selectedDate} />
    </CalendarProvider>
  );
};

FRAACalendar.propTypes = {
  navigation: object.isRequired,
};

export default FRAACalendar;
