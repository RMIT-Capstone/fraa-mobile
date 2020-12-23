import React from 'react';
import { arrayOf, object, string, func } from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import theme from '../../../theme';

// TODO: RENDER AGENDA BY DATE + PULL TO REFRESH YO
const Calendar = ({ agendaSessions, activeDay, handleSwipeLeft, handleSwipeRight, OPTIONS }) => {
  const { day } = activeDay;

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const EmptyAgenda = () => (
    <View style={styles.agendaContainer}>
      <Text>No class today! Yay</Text>
    </View>
  );

  return (
    <GestureRecognizer
      onSwipeLeft={() => handleSwipeLeft()}
      onSwipeRight={() => handleSwipeRight()}
      style={styles.container}
      config={config}>
      <View style={[styles.datesContainer, styles.centeredRow]}>
        {OPTIONS.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.dateBtn, day === option ? styles.activeDateBtn : styles.inactiveBtn, styles.centered]}>
            <Text style={[styles.text, day === option ? styles.activeText : styles.inactiveText]}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.agendaContainer}>
        {agendaSessions.length === 0 ? <EmptyAgenda /> : <Text>Yo yo agenda</Text>}
      </View>
    </GestureRecognizer>
  );
};

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: windowWidth,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
    backgroundColor: '#E5E5E5',
  },
  datesContainer: {
    height: 0.1 * windowHeight,
  },
  dateBtn: {
    borderRadius: 41,
    padding: 10,
    width: 100,
  },
  activeDateBtn: {
    backgroundColor: theme.palette.primary.blue,
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
  text: {
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
  },
  inactiveText: {
    color: theme.palette.secondary.arctic,
  },
  agendaContainer: {
    height: 0.9 * windowHeight,
  },
});

Calendar.propTypes = {
  agendaSessions: arrayOf(object).isRequired,
  activeDay: object.isRequired,
  handleSwipeLeft: func.isRequired,
  handleSwipeRight: func.isRequired,
  OPTIONS: arrayOf(string).isRequired,
};

export default Calendar;
