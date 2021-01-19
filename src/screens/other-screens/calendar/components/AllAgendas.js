import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { getAttendanceSessionsState } from '../../../../redux/reducers/AttendanceSessionsReducer';
import theme from '../../../../theme';

const AllAgendas = ({ attendanceSessions: { sessions } }) => {
  const transformSessionTime = (time) => {
    const timeObj = new Date(time);
    if (Platform.OS !== 'ios') {
      const splittedTime = timeObj.toLocaleString().split(' ');
      const hour = parseInt(splittedTime[splittedTime.length - 2].split(':')[0], 10);
      const convertedHour = hour % 12;
      const minuteString = splittedTime[splittedTime.length - 2].split(':')[1];
      return `${convertedHour}:${minuteString} ${hour > 12 ? 'PM' : 'AM'}`;
    }
    return timeObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  const dayOfWeek = (time) => {
    const timeObj = new Date(time);
    return timeObj.toString().split(' ')[0].toUpperCase();
  };

  return (
    <View style={[styles.container]}>
      <ScrollView>
        <View style={styles.centered}>
          <Text style={styles.allEventsText}>ALL EVENTS</Text>
          {sessions.map((session, index) => {
            const {
              id,
              room,
              validOn,
              course: { courseName },
            } = session;
            return (
              <View key={id} style={styles.centeredRow}>
                {index !== 0 && sessions[index].validOn.split('T')[0] === sessions[index - 1].validOn.split('T')[0] ? (
                  <View style={styles.sessionTimeInfoWrapper} />
                ) : (
                  <View style={styles.sessionTimeInfoWrapper}>
                    <Text style={styles.sessionDate}>{new Date(validOn).getDate()}</Text>
                    <Text style={styles.sessionDay}>{dayOfWeek(validOn)}</Text>
                  </View>
                )}
                <View key={id} style={styles.sessionInfoWrapper}>
                  <View style={[styles.sessionInfo, styles.inactiveBtn, styles.centered]}>
                    <Text style={styles.courseName}>{courseName.toUpperCase()}</Text>
                    <Text style={styles.sessionTime}>{transformSessionTime(validOn)}</Text>
                    <Text style={styles.sessionLocation}>{room}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredRow: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
  },
  allEventsText: {
    color: '#AFAFAF',
    fontSize: 17,
    padding: 15,
  },
  sessionTimeInfoWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  sessionInfoWrapper: {
    flex: 4,
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
  sessionInfo: {
    borderRadius: 20,
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    position: 'relative',
  },
  courseName: {
    color: theme.palette.secondary.orange,
    fontSize: Platform.OS === 'ios' ? 17 : 15,
    fontWeight: '500',
    marginBottom: 55,
    textAlign: 'center',
  },
  sessionTime: {
    fontSize: Platform.OS === 'ios' ? 17 : 15,
    color: '#888888',
    position: 'absolute',
    bottom: 10,
    left: 15,
  },
  sessionLocation: {
    fontSize: Platform.OS === 'ios' ? 17 : 15,
    color: '#888888',
    position: 'absolute',
    bottom: 10,
    right: 15,
  },
});

AllAgendas.propTypes = {
  attendanceSessions: object.isRequired,
};

const mapStateToProps = (state) => ({
  attendanceSessions: getAttendanceSessionsState(state),
});

export default connect(mapStateToProps, null)(AllAgendas);
