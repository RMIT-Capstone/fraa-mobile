import React from 'react';
import {View} from 'react-native';
import styles from './DashboardStyle';
import FRAACalendar from './components/calendar/FRAACalendar';

const Dashboard = () => {
  return (
    <View style={styles.centered}>
      <FRAACalendar />
    </View>
  );
};

export default Dashboard;
