import React from 'react';
import {object} from 'prop-types';
import {View} from 'react-native';
import styles from './AgendaStyle';
import FRAACalendar from './components/calendar/FRAACalendar';

const Agenda = ({navigation}) => {
  return (
    <View style={styles.centered}>
      <FRAACalendar navigation={navigation} />
    </View>
  );
};

Agenda.propTypes = {
  navigation: object,
};

export default Agenda;
