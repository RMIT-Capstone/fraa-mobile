import React, { useState } from 'react';
import { arrayOf, object, func } from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import styles from './FRAAAgendaStyle';
import { GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE } from '../../../../constants/ApiEndpoints';
import { setAttendanceSessions } from '../../../../redux/reducers/AttendanceSessionsReducer';
import { getUserState } from '../../../../redux/reducers/UserReducer';

const FRAAAgenda = ({ agendaSessions, handleSetAttendanceSessions }) => {
  const [refreshing, setRefreshing] = useState(false);

  const refetchAttendanceSessions = async () => {
    try {
      setRefreshing(true);
      const request = {
        courses: ['OENG1183'],
        startMonth: 9,
        monthRange: 3,
      };

      const { data } = await axios.post(GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE, request);
      if (data) {
        const { sessions, markedDates } = data;
        handleSetAttendanceSessions(sessions, markedDates);
      }
      setRefreshing(false);
    } catch (errorGetAttendanceSessions) {
      console.warn(errorGetAttendanceSessions);
    }
  };

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
  handleSetAttendanceSessions: func.isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetAttendanceSessions: (sessions, markedDates) => dispatch(setAttendanceSessions(sessions, markedDates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FRAAAgenda);
