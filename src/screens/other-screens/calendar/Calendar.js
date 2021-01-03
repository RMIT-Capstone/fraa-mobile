import React from 'react';
import { arrayOf, object, string, bool, func } from 'prop-types';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useNavigation } from '@react-navigation/native';
import styles from './CalendarStyle';
import { navigateTo } from '../../../helpers/navigation';
import ROUTES from '../../../navigation/routes';

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
  const navigation = useNavigation();

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
        room,
      } = session;
      return (
        <View key={id} style={styles.sessionsWrapper}>
          {index === 0 ? (
            <View style={[styles.sessionDateWrapper, styles.centered]}>
              <Text style={styles.sessionDate}>{new Date(validOn).getDate()}</Text>
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
                <Text style={styles.sessionTimeAndLocation}>{room}</Text>
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

      <TouchableOpacity style={styles.fixedBtn} onPress={() => navigateTo(navigation, ROUTES.VIEW_ALL_AGENDA)}>
        <Text style={styles.fixedBtnText}>View All</Text>
      </TouchableOpacity>
    </View>
  );
};

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
