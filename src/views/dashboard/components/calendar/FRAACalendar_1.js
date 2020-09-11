import React from 'react';
import _ from 'lodash';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {AgendaList, CalendarProvider, ExpandableCalendar} from 'react-native-calendars';
import styles from './FRAACalendarStyle';
import MOCK_SESSIONS from './MockSessions';

const FRAACalendar_1 = () => {
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

  // console.log(userSessions);

  let SESSIONS = [];
  let oldSessionDate = '';
  MOCK_SESSIONS.forEach(session => {
    const {courseCode, courseName, createdAt, expireOn, id, lecturer, validOn} = session;

    const stringDate = validOn.split('T')[0];
    // oldSessionDate = stringDate;

    if (oldSessionDate === stringDate) {
      let index = SESSIONS.findIndex(session_1 => session_1.title === oldSessionDate);
      SESSIONS[index].data.push({courseCode, courseName, createdAt, expireOn, id, lecturer, validOn});
      // SESSIONS.push(sessionData);
    } else {
      let sessionData = {};
      oldSessionDate = stringDate;
      sessionData.title = stringDate;
      sessionData.data = [];
      sessionData.data.push({courseCode, courseName, createdAt, expireOn, id, lecturer, validOn});
      SESSIONS.push(sessionData);
    }



  });
  console.log(SESSIONS);

  const renderEmptyItem = () => {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    if (_.isEmpty(item)) {
      return renderEmptyItem();
    }
    return (
      <TouchableOpacity style={styles.item}>
        <View>
          <Text style={styles.itemHourText}>{item.courseName}</Text>
          <Text style={styles.itemHourText}>{item.courseCode}</Text>
        </View>

        <View style={styles.itemButtonContainer}>
          <Button color={'grey'} title={'Info'} onPress={this.buttonPressed} />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <CalendarProvider
      date={new Date()}
      showTodayButton
      disabledOpacity={0.6}
      // theme={{
      //   todayButtonTextColor: themeColor
      // }}
      todayBottomMargin={10}>
      <ExpandableCalendar
        // horizontal={false}
        // hideArrows
        // disablePan
        // hideKnob
        // initialPosition={ExpandableCalendar.positions.OPEN}
        style={styles.calendar}
        // calendarStyle={styles.calendar}
        // headerStyle={styles.calendar} // for horizontal only
        // disableWeekScroll
        // theme={getTheme()}
        firstDay={1}
      />
      <AgendaList sections={SESSIONS} renderItem={renderItem} sectionStyle={styles.section} />
    </CalendarProvider>
  );
};

export default FRAACalendar_1;
