import React from 'react';
import { arrayOf, object, string } from 'prop-types';
import { View, Text } from 'react-native';
import styles from './FRAAAgendaStyle';

const FRAAAgenda = ({ agendaSessions, selectedDate }) => {
  const todayDate = new Date().toISOString().split('T')[0];
  const selectedDateObj = new Date(selectedDate);
  const dateOfSelectedDate = selectedDateObj.getDate();
  const dayOfWeek = selectedDateObj.toLocaleDateString('EN', { weekday: 'short' }).toUpperCase();

  const EmptyAgenda = () => {
    return <Text>No sessions today.</Text>;
  };

  const transformSessionTime = (time) => {
    const timeObj = new Date(time);
    return timeObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  const Agenda = () => {
    return (
      <>
        <View style={[styles.header, styles.centered]}>
          <Text style={styles.headerText}>EVENTS</Text>
        </View>
        <View style={[styles.body, styles.row]}>
          <View style={styles.agendaDateColumn}>
            {todayDate === selectedDate ? (
              <Text style={styles.agendaDayOfWeek}>TODAY</Text>
            ) : (
              <View style={styles.centered}>
                <Text style={styles.agendaDate}>{dateOfSelectedDate}</Text>
                <Text style={styles.agendaDayOfWeek}>{dayOfWeek}</Text>
              </View>
            )}
          </View>
          <View style={styles.agendaContentColumn}>
            {agendaSessions.map((session, index) => (
              <View key={index} style={styles.agendaItem}>
                <Text style={styles.sessionCourse}>{session.courseName}</Text>
                <View style={styles.agendaItemRow}>
                  <Text style={styles.sessionInfo}>{transformSessionTime(session.validOn)}</Text>
                  <Text style={styles.sessionInfo}>{session.location}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </>
    );
  };

  const renderAgenda = () => {
    if (agendaSessions.length === 0) {
      return <EmptyAgenda />;
    }
    return <Agenda />;
  };

  return <View style={[styles.container, styles.centered]}>{renderAgenda()}</View>;
};

FRAAAgenda.propTypes = {
  agendaSessions: arrayOf(object).isRequired,
  selectedDate: string.isRequired,
};

export default FRAAAgenda;
