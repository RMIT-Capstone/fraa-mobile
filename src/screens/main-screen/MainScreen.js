import React from 'react';
import { object, func, string, bool } from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './MainScreenStyle';

import FRAACalendar from '../other-screens/calendar/FRAACalendar';
import Profile from '../other-screens/profile';
import Home from '../other-screens/home';

import ROUTES from '../../navigation/routes';
import Loading from './components/loading/Loading';
import Error from './components/error/Error';

const ActiveHomeIcon = require('../../assets/tab-icons/home/ActiveHomeIcon.png');
const InactiveHomeIcon = require('../../assets/tab-icons/home/InactiveHomeIcon.png');
const ActiveProfileIcon = require('../../assets/tab-icons/profile/ActiveProfileIcon.png');
const InactiveProfileIcon = require('../../assets/tab-icons/profile/InactiveProfileIcon.png');
const ActiveCalendarIcon = require('../../assets/tab-icons/calendar/ActiveCalendarIcon.png');
const InactiveCalendarIcon = require('../../assets/tab-icons/calendar/InactiveCalendarIcon.png');

const MainScreen = ({ navigation, currentTab, setCurrentTab, loading, error }) => {
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

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
  currentTab: string.isRequired,
  setCurrentTab: func.isRequired,
  loading: bool.isRequired,
  error: string,
};

MainScreen.defaultProps = {
  error: '',
};

export default MainScreen;
