import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ROUTES from '../constants';
import Dashboard from '../../views/dashboard';

const DashboardStack = createStackNavigator();

const DashboardStackScreens = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name={ROUTES.DASHBOARD} component={Dashboard} />
    </DashboardStack.Navigator>
  );
};

export default DashboardStackScreens;
