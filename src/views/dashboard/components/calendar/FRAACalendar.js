import React from 'react';
import {object} from 'prop-types';
// import axios from 'axios';
import _ from 'lodash';
import {Text, TouchableOpacity, View, Alert} from 'react-native';
import {AgendaList, CalendarProvider, ExpandableCalendar} from 'react-native-calendars';
import styles from './FRAACalendarStyle';
import MOCK_SESSIONS from './MockSessions';
import {navigateTo} from '../../../../helpers/navigation';
import ROUTES from '../../../../tabs/constants';
// use this after stage 1
// import SomeComponent from './SomeComponents';

const FRAACalendar = ({navigation}) => {
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
  //
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

  const isOverdue = date => {
    return date < rightNow;
  };

  //TODO: disable if session is not available yet

  // const isNotThereYet = date => {
  //   const dateObject = new Date(date);
  //   if (dateObject.getDate() > rightNow.getDate()) {
  //     return true;
  //   } else if (dateObject.getDate() === rightNow.getDate()) {
  //     if (date > rightNow) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  const onEventTouch = eventDate => {
    const overdue = isOverdue(eventDate);
    // const notThereYet = isNotThereYet(new Date(eventDate));

    if (overdue) {
      Alert.alert('Event is overdue!');
    } else {
      navigateTo(navigation, ROUTES.IDENTITY_CAMERA, {fromDashboard: true});
    }
  };

  const Item = ({item}) => {
    const {validOn} = item;
    const overdue = isOverdue(new Date(validOn));

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
          {overdue && <Text style={styles.overdue}>Overdue!</Text>}
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

FRAACalendar.propTypes = {
  navigation: object.isRequired,
};

export default FRAACalendar;
