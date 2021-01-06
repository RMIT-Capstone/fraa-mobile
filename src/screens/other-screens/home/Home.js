import React from 'react';
import { arrayOf, object, bool, string } from 'prop-types';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import styles from './HomeStyle';
import { navigateTo } from '../../../helpers/navigation';
import ROUTES from '../../../navigation/routes';

const CheckInIcon = require('../../../assets/CheckInIcon.png');

const Home = ({
  email,
  homeScreenSessions,
  isLoadingSessions,
  displaySession,
  isHappening,
  timeDifference,
  navigation,
  registeredLocally,
  locationPermission,
  tooFar,
}) => {
  const noEvents = () => {
    if (Array.isArray(homeScreenSessions) && homeScreenSessions.length === 0) {
      return true;
    }
    return typeof displaySession === 'object' && displaySession === {};
  };

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

  if (noEvents()) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>No events today. Take a break, get some rest.</Text>
      </View>
    );
  }

  const {
    id,
    validOn,
    room,
    course: { courseName },
    attendees,
  } = displaySession;

  const checkedIn = () => attendees.includes(email);

  const renderCheckInButton = () => {
    if (checkedIn()) {
      return (
        <TouchableOpacity disabled style={[styles.checkedInBtn, styles.disabledBtn, styles.raised, styles.centered]}>
          <Text style={styles.disabledText}>Checked In!</Text>
        </TouchableOpacity>
      );
    }
    if (isHappening) {
      return (
        <TouchableOpacity
          onPress={() => navigateTo(navigation, ROUTES.CAMERA, { fromHome: false, id })}
          style={[styles.checkInBtnContainer, styles.activeBtn, styles.raised, styles.centeredRow]}>
          <Image source={CheckInIcon} style={styles.checkInIcon} />
          <Text style={styles.checkInText}>Check In</Text>
        </TouchableOpacity>
      );
    }

    if (!isHappening) {
      return (
        <View style={[styles.checkInBtnContainer, styles.disabledBtn, styles.raised, styles.centered]}>
          <Text style={styles.disabledText}>
            {timeDifference.hours} hours and {timeDifference.minutes} minutes
          </Text>
          <Text style={styles.disabledText}>before session</Text>
        </View>
      );
    }

    if (!locationPermission) {
      return <Text style={styles.disabledText}>Please allow location services and restart FRAA</Text>;
    }
    if (tooFar) {
      return (
        <TouchableWithoutFeedback
          style={[styles.checkInBtnContainer, styles.disabledBtn, styles.raised, styles.centered]}>
          <Text style={styles.disabledText}>Please come to the classroom to check-in</Text>
        </TouchableWithoutFeedback>
      );
    }
    if (!registeredLocally) {
      return <Text style={styles.disabledText}>You need to register your identity in Profile</Text>;
    }

    return null;
  };

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
            <Text style={styles.location}>{room}</Text>
          </View>
          <View style={[styles.secondEventRow]}>
            <Text style={styles.day}>{dateOfValidOn === today.getDate() ? 'Today' : dayOfValidOn}</Text>
            <Text style={styles.date}>{dateOfValidOn}</Text>
            <Text style={styles.month}>{monthOfValidOn}</Text>
          </View>
        </View>
        {renderCheckInButton()}
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
  email: string.isRequired,
  homeScreenSessions: arrayOf(object).isRequired,
  isLoadingSessions: bool.isRequired,
  displaySession: object,
  isHappening: bool.isRequired,
  timeDifference: object.isRequired,
  navigation: object.isRequired,
  registeredLocally: bool.isRequired,
  tooFar: bool.isRequired,
  locationPermission: bool.isRequired,
};

Home.defaultProps = {
  displaySession: {},
};

export default Home;
