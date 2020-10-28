import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from './configs/header';

// tabs
import MainScreen from '../screens/main-screen';
import Home from '../screens/home/Home';
import Profile from '../screens/profile';
import FRAACalendar from '../screens/calendar/FRAACalendar';

// routes names
import ROUTES from './routes';

// camera
import FRAACamera from '../shared-components/camera';

const MainStack = createStackNavigator();

const MainStackScreens = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerTitle: (props) => <Header {...props} />,
      }}>
      <MainStack.Screen name={ROUTES.MAIN} component={MainScreen} />
      <MainStack.Screen name={ROUTES.HOME} component={Home} />
      <MainStack.Screen name={ROUTES.CALENDAR} component={FRAACalendar} />
      <MainStack.Screen name={ROUTES.PROFILE} component={Profile} />
      <MainStack.Screen name={ROUTES.CAMERA} component={FRAACamera} />
    </MainStack.Navigator>
  );
};

export default MainStackScreens;
