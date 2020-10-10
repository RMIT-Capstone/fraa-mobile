import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from './configs/header';

// tabs
import MainScreen from '../screens/main-screen';
import Home from '../screens/home';
import Profile from '../screens/profile';
import Agenda from '../screens/agenda';

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
      <MainStack.Screen name={ROUTES.AGENDA} component={Agenda} />
      <MainStack.Screen name={ROUTES.PROFILE} component={Profile} />
      <MainStack.Screen name={ROUTES.CAMERA} component={FRAACamera} />
    </MainStack.Navigator>
  );
};

export default MainStackScreens;
