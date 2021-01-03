import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { getAttendanceSessionsState } from '../../../../redux/reducers/AttendanceSessionsReducer';
import theme from '../../../../theme';

const AllAgendas = ({ attendanceSessions: { sessions } }) => {
  const transformSessionTime = (time) => {
    const timeObj = new Date(time);
    return timeObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  return (
    <View style={[styles.container]}>
      <ScrollView>
        <View style={styles.centered}>
          <Text style={styles.allEventsText}>ALL EVENTS</Text>
          {sessions.map((session) => {
            const {
              id,
              room,
              validOn,
              course: { courseName },
            } = session;
            return (
              <View key={id} style={styles.centeredRow}>
                <View style={styles.sessionTimeInfoWrapper}>
                  <Text style={styles.sessionDate}>{new Date(validOn).getDate()}</Text>
                  <Text style={styles.sessionDay}>
                    {new Date(validOn).toLocaleDateString('EN', { weekday: 'short' }).toUpperCase()}
                  </Text>
                </View>
                <View key={id} style={styles.sessionInfoWrapper}>
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
  sessionInfo: {
    borderRadius: 20,
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
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

AllAgendas.propTypes = {
  attendanceSessions: object.isRequired,
};

const mapStateToProps = (state) => ({
  attendanceSessions: getAttendanceSessionsState(state),
});

export default connect(mapStateToProps, null)(AllAgendas);
