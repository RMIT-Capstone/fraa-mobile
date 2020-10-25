import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { object, func } from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './MainScreenStyle';

import FRAACalendar from '../calendar/FRAACalendar';
import Profile from '../profile';
import Home from '../home';

import ROUTES from '../../navigation/routes';
import { getAttendanceSessionsState, setAttendanceSessions } from '../../redux/reducers/AttendanceSessionsReducer';
import { CHECK_IDENTITY_API, GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE, GET_USER_API } from '../../constants/ApiEndpoints';
import { getUserState, setRegisteredIdentity, setUser } from '../../redux/reducers/UserReducer';

const ActiveHomeIcon = require('../../assets/tab-icons/home/ActiveHomeIcon.png');
const InactiveHomeIcon = require('../../assets/tab-icons/home/InactiveHomeIcon.png');
const ActiveProfileIcon = require('../../assets/tab-icons/profile/ActiveProfileIcon.png');
const InactiveProfileIcon = require('../../assets/tab-icons/profile/InactiveProfileIcon.png');
const ActiveCalendarIcon = require('../../assets/tab-icons/calendar/ActiveCalendarIcon.png');
const InactiveCalendarIcon = require('../../assets/tab-icons/calendar/InactiveCalendarIcon.png');

// TODO: handle error fetch user or error fetch attendance sessions!
const MainScreen = ({
  navigation,
  attendanceSessions,
  user,
  handleSetAttendanceSessions,
  handleSetRegisteredIdentity,
  handleSetUser,
}) => {
  const [currentTab, setCurrentTab] = useState(ROUTES.HOME);

  useEffect(() => {
    const userRequest = {
      email: 'trungduong0103@gmail.com',
    };

    const fetchUser = async () => {
      const { data } = await axios.post(GET_USER_API, userRequest);
      if (data) {
        const { error } = data;
        if (error) {
          console.warn('error fetchUser: ', error);
        } else {
          handleSetUser(data);
        }
      }
    };

    const fetchUserIdentity = async () => {
      const { data } = await axios.get(CHECK_IDENTITY_API);
      if (data) {
        const { msg } = data;
        handleSetRegisteredIdentity(msg);
      }
    };

    const { email: reduxEmail } = user;
    if (!reduxEmail) {
      try {
        Promise.all([fetchUser(), fetchUserIdentity()]);
      } catch (errorLoadUser) {
        console.warn('error load user: ', errorLoadUser);
      }
    }
  }, []);

  useEffect(() => {
    // must call it here because calling it inside FRAACalendar will mess up with <ExpandableCalendar />
    // only call if attendance sessions is empty
    const { sessions } = attendanceSessions;
    const { subscribedCourses } = user;

    if (sessions.length === 0 && subscribedCourses) {
      const sessionsRequest = {
        courses: subscribedCourses,
        startMonth: 9,
        monthRange: 3,
      };
      try {
        (async function fetchAttendanceSessions() {
          const { data } = await axios.post(GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE, sessionsRequest);
          if (data) {
            const { sessions: axiosSessions, markedDates, error } = data;
            if (error) {
              console.warn('error fetchAttendanceSessions: ', error);
            } else {
              handleSetAttendanceSessions(axiosSessions, markedDates);
            }
          }
        })();
      } catch (errorFetchAttendanceSessions) {
        console.warn('error fetch sessions: ', errorFetchAttendanceSessions);
      }
    }
  }, [attendanceSessions, user]);

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

MainScreen.propTypes = {
  navigation: object.isRequired,
  attendanceSessions: object.isRequired,
  user: object.isRequired,
  handleSetAttendanceSessions: func.isRequired,
  handleSetUser: func.isRequired,
  handleSetRegisteredIdentity: func.isRequired,
};

const mapStateToProps = (state) => ({
  attendanceSessions: getAttendanceSessionsState(state),
  user: getUserState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetAttendanceSessions: (sessions, markedDates) => dispatch(setAttendanceSessions(sessions, markedDates)),
  handleSetRegisteredIdentity: (registered) => dispatch(setRegisteredIdentity(registered)),
  handleSetUser: (user) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
