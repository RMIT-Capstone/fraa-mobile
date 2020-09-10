import React from 'react';
import {View} from 'react-native';
import styles from './DashboardStyle';
// import FRAACalendar from './components/calendar/FRAACalendar';
import FRAACalendar_1 from './components/calendar/FRAACalendar_1';

const Dashboard = () => {
  return (
    <View style={styles.centered}>
      <FRAACalendar_1 />
    </View>
  );
};

export default Dashboard;
