import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import HomeStackScreens from './src/routes/home';
import DashboardStackScreens from './src/routes/dashboard';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ROUTES from './src/routes/constants';
import TabWithIcon from './src/routes/tab-with-icon';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <TabWithIcon {...props} />}>
        <Tab.Screen name={ROUTES.HOME} component={HomeStackScreens} />
        <Tab.Screen name={ROUTES.DASHBOARD} component={DashboardStackScreens} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
