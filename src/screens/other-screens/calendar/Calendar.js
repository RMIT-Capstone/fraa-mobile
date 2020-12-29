import React from 'react';
import { arrayOf, object, string, bool, func } from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  RefreshControl,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import theme from '../../../theme';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const Calendar = ({
  agendaSessions,
  refetching,
  refetchAttendanceSessions,
  activeDay,
  handleDatePress,
  handleSwipeLeft,
  handleSwipeRight,
  OPTIONS,
}) => {
  const { day, date } = activeDay;

  const EmptyAgenda = () => (
    <View style={styles.agendaContainer}>
      <Text>No class today! Yay</Text>
    </View>
  );

  const Events = () => {
    const displayDay = new Date();
    displayDay.setDate(date);
    const dayOfWeek = displayDay.toLocaleDateString('EN', { weekday: 'short' }).toUpperCase();

    const transformSessionTime = (time) => {
      const timeObj = new Date(time);
      return timeObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    };

    return agendaSessions.map((session, index) => {
      const {
        course: { courseName },
        id,
        validOn,
        location,
      } = session;
      return (
        <View key={id} style={styles.sessionsWrapper}>
          {index === 0 ? (
            <View style={[styles.sessionDateWrapper, styles.centered]}>
              <Text style={styles.sessionDate}>{date}</Text>
              <Text style={styles.sessionDay}>{dayOfWeek}</Text>
            </View>
          ) : (
            <View style={[styles.sessionDateWrapper, styles.centered]} />
          )}
          <View style={styles.sessionInfoWrapper}>
            <View style={[styles.sessionInfo, styles.inactiveBtn, styles.centered]}>
              <Text style={styles.courseName}>{courseName}</Text>
              <View style={styles.sessionTimeWrapper}>
                <Text style={styles.sessionTimeAndLocation}>{transformSessionTime(validOn)}</Text>
                <Text style={styles.sessionTimeAndLocation}>{location}</Text>
              </View>
            </View>
          </View>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.datesContainer, styles.centeredRow]}>
        {OPTIONS.map((option, index) => (
          <TouchableOpacity
            key={option}
            style={[styles.dateBtn, day === option ? styles.activeDateBtn : styles.inactiveBtn, styles.centered]}
            onPress={() => handleDatePress(index)}>
            <Text style={[styles.text, day === option ? styles.activeText : styles.inactiveText]}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refetching} onRefresh={refetchAttendanceSessions} />}>
        <GestureRecognizer onSwipeLeft={() => handleSwipeLeft()} onSwipeRight={() => handleSwipeRight()}>
          <View style={styles.agendaContainer}>
            <Text style={styles.eventsText}>EVENTS</Text>
            {agendaSessions.length === 0 ? <EmptyAgenda /> : <Events />}
          </View>
        </GestureRecognizer>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  datesContainer: {
    height: windowHeight * 0.1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
  },
  dateBtn: {
    borderRadius: 41,
    padding: 10,
    width: 100,
  },
  activeDateBtn: {
    backgroundColor: theme.palette.primary.blue,
  },
  inactiveBtn: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  text: {
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
  },
  inactiveText: {
    color: theme.palette.secondary.arctic,
  },
  agendaContainer: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    marginTop: 20,
  },
  eventsText: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 26.2,
    color: '#AFAFAF',
  },
  sessionsWrapper: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  sessionDateWrapper: {
    flex: 1,
  },
  sessionDate: {
    color: theme.palette.primary.red,
    fontWeight: '400',
    fontSize: 31,
  },
  sessionDay: {
    color: theme.palette.primary.blue,
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  sessionInfoWrapper: {
    flex: 4,
  },
  sessionInfo: {
    borderRadius: 20,
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  courseName: {
    color: theme.palette.secondary.orange,
    fontSize: 17,
    fontWeight: '500',
  },
  sessionTimeWrapper: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  sessionTimeAndLocation: {
    color: '#888888',
  },
});

Calendar.propTypes = {
  agendaSessions: arrayOf(object).isRequired,
  refetching: bool.isRequired,
  refetchAttendanceSessions: func.isRequired,
  activeDay: object.isRequired,
  handleDatePress: func.isRequired,
  handleSwipeLeft: func.isRequired,
  handleSwipeRight: func.isRequired,
  OPTIONS: arrayOf(string).isRequired,
};

export default Calendar;
