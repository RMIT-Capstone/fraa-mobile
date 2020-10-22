import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { object, arrayOf, func } from 'prop-types';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import FRAACalendar from '../calendar/FRAACalendar';
import Profile from '../profile';
import Home from '../home';

import ROUTES from '../../navigation/routes';
import theme from '../../theme';
import { getAttendanceSessionsState, setAttendanceSessions } from '../../redux/reducers/AttendanceSessionsReducer';
import { GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE } from '../../constants/ApiEndpoints';

const ActiveHomeIcon = require('../../assets/tab-icons/home/ActiveHomeIcon.png');
const InactiveHomeIcon = require('../../assets/tab-icons/home/InactiveHomeIcon.png');
const ActiveProfileIcon = require('../../assets/tab-icons/profile/ActiveProfileIcon.png');
const InactiveProfileIcon = require('../../assets/tab-icons/profile/InactiveProfileIcon.png');
const ActiveCalendarIcon = require('../../assets/tab-icons/calendar/ActiveCalendarIcon.png');
const InactiveCalendarIcon = require('../../assets/tab-icons/calendar/InactiveCalendarIcon.png');

const MainScreen = ({ navigation, attendanceSessions, handleSetAttendanceSessions }) => {
  const [currentTab, setCurrentTab] = useState(ROUTES.HOME);

  useEffect(() => {
    if (attendanceSessions.length === 0) {
      // must call it here because calling it inside FRAACalendar will mess up with <ExpandableCalendar />
      // only call if attendance sessions is empty
      const request = {
        courses: ['OENG1183'],
        startMonth: 9,
        monthRange: 3,
      };
      try {
        (async function fetchAttendanceSessions() {
          const {
            data: { sessions },
          } = await axios.post(GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE, request);
          if (sessions) {
            handleSetAttendanceSessions(sessions);
          }
        })();
      } catch (errorFetchAttendanceSessions) {
        console.warn(errorFetchAttendanceSessions);
      }
    }
  }, [attendanceSessions]);

  const TabContent = () => {
    switch (currentTab) {
      case ROUTES.HOME:
        return <Home navigation={navigation} />;
      case ROUTES.CALENDAR:
        return <FRAACalendar navigation={navigation} />;
      case ROUTES.PROFILE:
        return <Profile navigation={navigation} />;
      default:
        return (
          <View>
            <Text>Something went wrong...</Text>
          </View>
        );
    }
  };

  return (
    <View style={[styles.container, styles.centeredColumn]}>
      <View style={styles.content}>
        <TabContent />
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setCurrentTab(ROUTES.HOME)} style={styles.tabButton}>
          <Image style={styles.tabImage} source={currentTab === ROUTES.HOME ? ActiveHomeIcon : InactiveHomeIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentTab(ROUTES.CALENDAR)} style={styles.tabButton}>
          <Image
            style={styles.tabImage}
            source={currentTab === ROUTES.CALENDAR ? ActiveCalendarIcon : InactiveCalendarIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentTab(ROUTES.PROFILE)} style={styles.tabButton}>
          <Image
            style={styles.tabImage}
            source={currentTab === ROUTES.PROFILE ? ActiveProfileIcon : InactiveProfileIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 11,
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    backgroundColor: theme.palette.secondary.white,
  },
  tabButton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

MainScreen.propTypes = {
  navigation: object.isRequired,
  attendanceSessions: arrayOf(object).isRequired,
  handleSetAttendanceSessions: func.isRequired,
};

const mapStateToProps = (state) => ({
  attendanceSessions: getAttendanceSessionsState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetAttendanceSessions: (attendanceSessions) => dispatch(setAttendanceSessions(attendanceSessions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
