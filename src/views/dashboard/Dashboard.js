import React from 'react';
import {object} from 'prop-types';
import {View} from 'react-native';
import styles from './DashboardStyle';
import FRAACalendar from './components/calendar/FRAACalendar';

const Dashboard = ({navigation}) => {
  return (
    <View style={styles.centered}>
      <FRAACalendar navigation={navigation} />
    </View>
  );
};

Dashboard.propTypes = {
  navigation: object.isRequired,
};

export default Dashboard;
