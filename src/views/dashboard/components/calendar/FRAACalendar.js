import React from 'react';
import {object} from 'prop-types';
import _ from 'lodash';
import {Text, TouchableOpacity, View, Alert} from 'react-native';
import {AgendaList, CalendarProvider, ExpandableCalendar} from 'react-native-calendars';
import styles from './FRAACalendarStyle';
import MOCK_SESSIONS from './MockSessions';
// use this after stage 1
import SomeComponent from './SomeComponents';

const FRAACalendar = () => {
  // const [userSessions, setUserSessions] = useState([]);
  // const url = 'https://asia-northeast1-fraa-capstone.cloudfunctions.net/api/get_monthly_attendance_sessions';
  // useEffect(() => {
  //   async function fetchUserSessions() {
  //     const {
  //       data: {sessions},
  //     } = await axios.post(url, {
  //       courses: ['COSC2081', 'COSC2082', 'COSC2083'],
  //       month: 8,
  //       email: 'trungduong0103@gmail.com',
  //     });
  //     console.log(sessions);
  //     setUserSessions(sessions);
  //   }
  //   fetchUserSessions();
  // }, []);

  // useEffect(() => {
  //   if (sectionListRef !== null) {
  //     sectionListRef.scrollToSection(2);
  //   }
  // }, [sectionListRef]);

  // console.log(userSessions);
  const rightNow = new Date();

  let SESSIONS = [];
  let oldEventDate = '';
  MOCK_SESSIONS.forEach(session => {
    const {courseCode, courseName, createdAt, expireOn, id, lecturer, validOn, location} = session;
    let sessionData = {courseCode, courseName, createdAt, expireOn, id, lecturer, validOn, location};
    const eventDate = validOn.split('T')[0];
    if (oldEventDate !== eventDate) {
      let event = {};
      oldEventDate = eventDate;
      event.title = eventDate;
      event.data = [];
      event.data.push(sessionData);
      SESSIONS.push(event);
    } else {
      const index = SESSIONS.findIndex(displaySession => displaySession.title === oldEventDate);
      SESSIONS[index].data.push(sessionData);
    }
  });

  const getMarkedDates = () => {
    let marked = {};
    SESSIONS.forEach(session => {
      marked[session.title] = {marked: true};
    });
    return marked;
  };

  const renderEmptyItem = () => {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  };

  const isDisabled = date => {
    return date < rightNow;
  };

  const onEventTouch = (eventDate, id) => {
    const overdue = isDisabled(eventDate);
    if (overdue) {
      Alert.alert('Event is overdue!');
    } else {
      Alert.alert(`Pressed ${id}`);
    }
  };

  const Item = ({item}) => {
    const {validOn} = item;
    const itemIsDisabled = isDisabled(new Date(validOn));
    if (_.isEmpty(item)) {
      return renderEmptyItem();
    }
    const eventDateObject = new Date(validOn);
    let startTime = eventDateObject.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});

    return (
      <View style={styles.item}>
        <View style={styles.leftItem} />
        <TouchableOpacity onPress={() => onEventTouch(new Date(validOn), item.id)} style={styles.rightItem}>
          <Text style={styles.courseName}>{item.courseName}</Text>
          <View style={styles.rightItemRow}>
            <Text style={styles.bottomText}>{item.location}</Text>
            <Text style={styles.bottomText}>{startTime}</Text>
          </View>
          {itemIsDisabled && <Text style={styles.overdue}>Overdue!</Text>}
        </TouchableOpacity>
      </View>
    );
  };

  Item.propTypes = {
    item: object.isRequired,
  };

  return (
    <CalendarProvider date={rightNow} showTodayButton disabledOpacity={0.6} todayBottomMargin={10}>
      <ExpandableCalendar markedDates={getMarkedDates()} style={styles.calendar} firstDay={1} />
      <Text style={styles.eventsText}>EVENTS</Text>
      <AgendaList sections={SESSIONS} renderItem={Item} sectionStyle={[styles.section, styles.centered]} />
      {/*<SomeComponent />*/}
    </CalendarProvider>
  );
};

export default FRAACalendar;
