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

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const EmptyAgenda = () => (
    <View style={styles.agendaContainer}>
      <Text>No class today! Yay</Text>
    </View>
  );

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refetching} onRefresh={refetchAttendanceSessions} />}>
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
        <View styles={styles.agendaContainer}>
          <GestureRecognizer
            onSwipeLeft={() => handleSwipeLeft()}
            onSwipeRight={() => handleSwipeRight()}
            style={styles.agendaContainer}
            config={config}>
            <View>{agendaSessions.length === 0 ? <EmptyAgenda /> : <Text>Yo yo agenda</Text>}</View>
          </GestureRecognizer>
        </View>
      </View>
    </ScrollView>
  );
};

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

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
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
  },
  datesContainer: {
    height: 0.1 * windowHeight,
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
    height: 0.9 * windowHeight,
    width: windowWidth,
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
