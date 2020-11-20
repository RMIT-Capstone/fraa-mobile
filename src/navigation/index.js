import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Header from './configs/header';

// tabs
import MainScreen from '../screens/main-screen';
import Home from '../screens/other-screens/home/Home';
import Profile from '../screens/other-screens/profile';
import FRAACalendar from '../screens/other-screens/calendar/FRAACalendar';

// routes names
import ROUTES from './routes';

// camera
import FRAACamera from '../shared-components/camera';
import Login from '../screens/other-screens/login/Login';

const MainStack = createStackNavigator();

const MainStackScreens = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerTitle: (props) => {
          // eslint-disable-next-line react/prop-types
          if (!props.children === ROUTES.LOGIN) {
            return <Header {...props} />;
          }
          return null;
        },
      }}>
      <MainStack.Screen name={ROUTES.LOGIN} component={Login} />
      <MainStack.Screen name={ROUTES.MAIN} component={MainScreen} />
      <MainStack.Screen name={ROUTES.HOME} component={Home} />
      <MainStack.Screen name={ROUTES.CALENDAR} component={FRAACalendar} />
      <MainStack.Screen name={ROUTES.PROFILE} component={Profile} />
      <MainStack.Screen name={ROUTES.CAMERA} component={FRAACamera} />
    </MainStack.Navigator>
  );
};

export default MainStackScreens;
