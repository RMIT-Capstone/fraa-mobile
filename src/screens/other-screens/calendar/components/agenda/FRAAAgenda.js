import React from 'react';
import { arrayOf, object, func, bool } from 'prop-types';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import styles from './FRAAAgendaStyle';

const FRAAAgenda = ({ agendaSessions, refreshing, refetchAttendanceSessions }) => {
  const EmptyAgenda = () => {
    return (
      <View>
        <Text style={styles.emptyAgendaText}>No sessions today.</Text>
      </View>
    );
  };

  const transformSessionTime = (time) => {
    const timeObj = new Date(time);
    return timeObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  const Agenda = () => {
    const { validOn } = agendaSessions[0];
    const todayDate = new Date().toISOString().split('T')[0];
    const selectedDateObj = new Date(validOn);
    const dateOfSelectedDate = selectedDateObj.getDate();
    const dayOfWeek = selectedDateObj.toLocaleDateString('EN', { weekday: 'short' }).toUpperCase();

    return (
      <>
        <View style={[styles.header, styles.centered]}>
          <Text style={styles.headerText}>EVENTS</Text>
        </View>
        <View style={[styles.body, styles.row]}>
          <View style={styles.agendaDateColumn}>
            {todayDate === validOn.split('T')[0] ? (
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

  return (
    <View style={[styles.container, styles.centered]}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refetchAttendanceSessions} />}>
        {renderAgenda()}
      </ScrollView>
    </View>
  );
};

FRAAAgenda.propTypes = {
  agendaSessions: arrayOf(object).isRequired,
  refreshing: bool.isRequired,
  refetchAttendanceSessions: func.isRequired,
};

export default FRAAAgenda;
