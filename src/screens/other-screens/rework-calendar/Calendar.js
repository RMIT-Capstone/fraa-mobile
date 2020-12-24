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
  const { day } = activeDay;
  console.log(activeDay, agendaSessions);

  const EmptyAgenda = () => (
    <View style={styles.agendaContainer}>
      <Text>No class today! Yay</Text>
    </View>
  );

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
            {agendaSessions.length === 0 ? <EmptyAgenda /> : <Text>EVENTS</Text>}
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
  eventWrapper: {},
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
