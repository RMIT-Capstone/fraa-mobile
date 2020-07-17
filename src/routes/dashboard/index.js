import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ROUTES from '../constants';
import Dashboard from '../../views/dashboard';
import Header from '../header';

const DashboardStack = createStackNavigator();

const DashboardStackScreens = () => {
  return (
    <DashboardStack.Navigator
      screenOptions={{
        headerTitle: props => <Header {...props} />,
      }}>
      <DashboardStack.Screen name={ROUTES.DASHBOARD} component={Dashboard} />
    </DashboardStack.Navigator>
  );
};

export default DashboardStackScreens;
