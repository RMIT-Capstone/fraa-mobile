import React from 'react';
import { arrayOf, object, bool } from 'prop-types';
import { View, Text, Image } from 'react-native';
import styles from './HomeStyle';

const CheckInIcon = require('../../../assets/CheckInIcon.png');

const Home = ({ navigation, homeScreenSessions, isLoadingSessions, displaySession, isHappening, timeDifference }) => {
  const transformSessionTime = (time) => {
    const timeObj = new Date(time);
    return timeObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  if (isLoadingSessions) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>Loading sessions...</Text>
      </View>
    );
  }

  if (homeScreenSessions.length === 0 || !displaySession) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>No events today. Take a break, get some rest.</Text>
      </View>
    );
  }

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
};

Home.propTypes = {
  navigation: object.isRequired,
  homeScreenSessions: arrayOf(object).isRequired,
  isLoadingSessions: bool.isRequired,
  displaySession: object,
  isHappening: bool.isRequired,
  timeDifference: object.isRequired,
};

Home.defaultProps = {
  displaySession: {},
};

export default Home;
