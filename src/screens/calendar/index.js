import React, { useState } from 'react';
import { object } from 'prop-types';
import { View, Text, Alert } from 'react-native';
import MOCK_SESSIONS from './MockSessions';
import { navigateTo } from '../../helpers/navigation';
import ROUTES from '../../navigation/routes';
import FRAACalendar from './FRAACalendar';

const FRAACalendarWrapper = ({ navigation }) => {
  const [agendaSessions, setAgendaSessions] = useState(null);

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
  };

  return (
    <FRAACalendar
      navigation={navigation}
      getMarkedDates={getMarkedDates}
      onDateChanged={onDateChanged}
      agendaSessions={agendaSessions}
    />
  );
};

FRAACalendarWrapper.propTypes = {
  navigation: object.isRequired,
};

export default FRAACalendarWrapper;
