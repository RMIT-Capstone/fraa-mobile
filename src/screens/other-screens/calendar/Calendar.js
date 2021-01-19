import React from 'react';
import { arrayOf, object, string, bool, func } from 'prop-types';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './CalendarStyle';
import { navigateTo } from '../../../helpers/navigation';
import ROUTES from '../../../navigation/routes';

const Calendar = ({ agendaSessions, refetching, refetchAttendanceSessions, activeDay, handleDatePress, OPTIONS }) => {
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
    const dayOfWeek = displayDay.toLocaleString().split(' ')[0].toUpperCase();

    const transformSessionTime = (time) => {
      const timeObj = new Date(time);
      if (Platform !== 'ios') {
        const x = timeObj.toLocaleString().split(' ');
        const hour = parseInt(x[x.length - 2].split(':')[0], 10);
        const time1 = hour % 12;
        const minuteString = x[x.length - 2].split(':')[1];
        return `${time1}:${minuteString} ${hour > 12 ? 'PM' : 'AM'}`;
      }
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
            <View style={[styles.sessionInfo, styles.inactiveBtn]}>
              <Text style={styles.courseName}>{courseName}</Text>

              <Text style={styles.sessionTime}>{transformSessionTime(validOn)}</Text>
              <Text style={styles.sessionLocation}>{room}</Text>
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
        <View style={styles.agendaContainer}>
          <Text style={styles.eventsText}>EVENTS</Text>
          {agendaSessions.length === 0 ? <EmptyAgenda /> : <Events />}
        </View>
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
  OPTIONS: arrayOf(string).isRequired,
};

export default Calendar;
