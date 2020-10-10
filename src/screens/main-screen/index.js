import React, { useState } from 'react';
import { object } from 'prop-types';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Agenda from '../calendar';
import Profile from '../profile';
import Home from '../home';

import ROUTES from '../../navigation/routes';
import theme from '../../theme';

const ActiveHomeIcon = require('../../assets/tab-icons/home/ActiveHomeIcon.png');
const InactiveHomeIcon = require('../../assets/tab-icons/home/InactiveHomeIcon.png');
const ActiveProfileIcon = require('../../assets/tab-icons/profile/ActiveProfileIcon.png');
const InactiveProfileIcon = require('../../assets/tab-icons/profile/InactiveProfileIcon.png');
const ActiveCalendarIcon = require('../../assets/tab-icons/calendar/ActiveCalendarIcon.png');
const InactiveCalendarIcon = require('../../assets/tab-icons/calendar/InactiveCalendarIcon.png');

const MainScreen = ({ navigation }) => {
  const [currentTab, setCurrentTab] = useState(ROUTES.HOME);

  const TabContent = () => {
    switch (currentTab) {
      case ROUTES.HOME:
        return <Home navigation={navigation} />;
      case ROUTES.AGENDA:
        return <Agenda navigation={navigation} />;
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
        <TouchableOpacity onPress={() => setCurrentTab(ROUTES.AGENDA)} style={styles.tabButton}>
          <Image
            style={styles.tabImage}
            source={currentTab === ROUTES.AGENDA ? ActiveCalendarIcon : InactiveCalendarIcon}
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
};

export default MainScreen;
