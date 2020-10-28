import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { object } from 'prop-types';
import { View, Text, Image } from 'react-native';
import styles from './HomeStyle';
import { getAttendanceSessionsState } from '../../redux/reducers/AttendanceSessionsReducer';
const CheckInIcon = require('../../assets/CheckInIcon.png');

const Home = () => {
  // hard code here to avoid restarting app every time code changes to see the effect
  const [sessions, setSessions] = useState([
    {
      lecturer: 'Yossi Nygate',
      location: 'SGS/2.4.041 (Lab-Mac)',
      courseName: 'Capstone Project - Part A',
      createdAt: '2020-10-27T12:55:00.209Z',
      validOn: '2020-10-28T08:42:00.577Z',
      expireOn: '2020-10-28T08:43:00.577Z',
      courseCode: 'OENG1183',
      id: 'A3eYst4EtyXpSA6RQF98',
    },
    {
      lecturer: 'Yossi Nygate',
      location: 'SGS/2.4.041 (Lab-Mac)',
      courseName: 'Capstone Project - Part B',
      createdAt: '2020-10-27T12:55:00.209Z',
      validOn: '2020-10-28T08:44:00.577Z',
      expireOn: '2020-10-28T08:45:00.577Z',
      courseCode: 'OENG1183',
      id: 'A3eYst4EtyXpSA6RQF98',
    },
  ]);
  const [displaySession, setDisplaySession] = useState({});
  const [isHappening, setIsHappening] = useState(false);
  const [timeDifference, setTimeDifference] = useState({ hours: '', minutes: '' });

  const loadDisplaySession = () => {
    sessions.forEach((session) => {
      const { expireOn, validOn } = displaySession;
      let rightNow = new Date();

      if (session) {
        setIsHappening(rightNow > new Date(validOn) && rightNow < new Date(expireOn));
      }

      if (rightNow > new Date(expireOn)) {
        let array = sessions.slice(1);
        setSessions(array);
        setDisplaySession(array[0]);
      }
    });
  };

  useEffect(() => {
    setDisplaySession(sessions[0]);
    loadDisplaySession();

    let interval = null;

    interval = setInterval(() => {
      loadDisplaySession();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    let interval = null;

    if (sessions.length !== 0 && !isHappening) {
      interval = setInterval(() => {
        let now = new Date();
        let timeDifference1 = new Date(displaySession.validOn) - now;
        let truncated = Math.trunc(timeDifference1 / 1000);
        setTimeDifference({ hours: Math.floor(truncated / 3600), minutes: Math.floor((truncated % 3600) / 60) + 1 });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  });

  const transformSessionTime = (time) => {
    const timeObj = new Date(time);
    return timeObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  if (sessions.length === 0) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>No events today. Take a break, get some rest.</Text>
      </View>
    );
  } else {
    const { validOn, courseName, location } = displaySession;
    const today = new Date();
    const validOnDateObject = new Date(validOn);
    const dateOfValidOn = validOnDateObject.getDate();
    const monthOfValidOn = validOnDateObject.toLocaleDateString(undefined, { month: 'long' });
    const dayOfValidOn = validOnDateObject.toLocaleDateString(undefined, { weekday: 'long' });

    return (
      <View style={[styles.container, styles.centered]}>
        <View style={[styles.topChildContainer, styles.centered]}>
          <View
            style={[styles.timeIndicatorContainer, isHappening ? styles.happening : styles.upcoming, styles.centered]}>
            <Text style={styles.timeIndicatorText}>{isHappening ? 'Happening' : 'Upcoming'}</Text>
          </View>
          <View style={[styles.eventContainer, styles.raised]}>
            <View style={[styles.firstEventRow]}>
              <Text style={styles.time}>{transformSessionTime(validOn)}</Text>
              <Text style={styles.courseName}>{courseName}</Text>
              <Text style={styles.location}>{location}</Text>
            </View>
            <View style={[styles.secondEventRow]}>
              <Text style={styles.day}>{dateOfValidOn === today.getDate() ? 'Today' : dayOfValidOn}</Text>
              <Text style={styles.date}>{dateOfValidOn}</Text>
              <Text style={styles.month}>{monthOfValidOn}</Text>
            </View>
          </View>
          {isHappening ? (
            <View style={[styles.checkInBtnContainer, styles.activeBtn, styles.raised, styles.centeredRow]}>
              <Image source={CheckInIcon} style={styles.checkInIcon} />
              <Text style={styles.checkInText}>Check In</Text>
            </View>
          ) : (
            <View style={[styles.checkInBtnContainer, styles.disabledBtn, styles.raised, styles.centered]}>
              <Text style={styles.disabledText}>
                {timeDifference.hours} hours and {timeDifference.minutes} minutes
              </Text>
              <Text style={styles.disabledText}>before session</Text>
            </View>
          )}
        </View>
        <View style={[styles.bottomChildContainer, styles.centered]}>
          <View style={[styles.infoContainer, styles.raised, styles.centered]}>
            <Text style={styles.infoText}>You have missed 3 sessions for this course</Text>
          </View>
        </View>
      </View>
    );
  }
};

Home.propTypes = {
  navigation: object.isRequired,
  attendanceSessions: object.isRequired,
};

const mapStateToProps = (state) => ({
  attendanceSessions: getAttendanceSessionsState(state),
});

export default connect(mapStateToProps, null)(Home);
