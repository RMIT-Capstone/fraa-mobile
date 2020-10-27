import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { object } from 'prop-types';
import { View, Text, Image } from 'react-native';
import styles from './HomeStyle';
import { getAttendanceSessionsState } from '../../redux/reducers/AttendanceSessionsReducer';
const CheckInIcon = require('../../assets/CheckInIcon.png');
import MOCK_SESSIONS from './MockSessions';

const Home = ({ navigation, attendanceSessions }) => {
  const { sessions } = attendanceSessions;
  const today = new Date().toISOString().split('T')[0];
  const [todaySessions, setTodaySessions] = useState(MOCK_SESSIONS);
  const [displaySession, setDisplaySession] = useState({});
  const [now, setNow] = useState(undefined);
  const [isHappening, setIsHappening] = useState(false);

  let interval = null;

  useEffect(() => {
    setDisplaySession(todaySessions[0]);
  }, []);

  useEffect(() => {
    interval = setInterval(() => {
      todaySessions.forEach((session) => {
        const { expireOn, validOn } = displaySession;
        let rightNow = new Date();
        setNow(rightNow);

        if (session) {
          setIsHappening(rightNow > new Date(validOn) && rightNow < new Date(expireOn));
        }

        if (rightNow > new Date(expireOn)) {
          let array = todaySessions.slice(1);
          console.log(array);
          setTodaySessions(array);
          setDisplaySession(array[0]);
        }
      });
    }, 1000);

    console.log(todaySessions);

    return () => {
      clearInterval(interval);
    };
  });

  if (todaySessions.length === 0) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>No events today!</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.centered]}>
      <View style={[styles.topChildContainer, styles.centered]}>
        <View
          style={[styles.timeIndicatorContainer, isHappening ? styles.happening : styles.upcoming, styles.centered]}>
          <Text style={styles.timeIndicatorText}>{isHappening ? 'Happening' : 'Upcoming'}</Text>
        </View>
        <View style={[styles.eventContainer, styles.raised, styles.centered]}>
          <Text>{displaySession.courseName}</Text>
        </View>
        <View style={[styles.checkInBtnContainer, styles.activeBtn, styles.raised, styles.centeredRow]}>
          <Image source={CheckInIcon} style={styles.checkInIcon} />
          <Text style={styles.checkInText}>Check In</Text>
        </View>
      </View>
      <View style={[styles.bottomChildContainer, styles.centered]} />
    </View>
  );
};

Home.propTypes = {
  navigation: object.isRequired,
  attendanceSessions: object.isRequired,
};

const mapStateToProps = (state) => ({
  attendanceSessions: getAttendanceSessionsState(state),
});

export default connect(mapStateToProps, null)(Home);
