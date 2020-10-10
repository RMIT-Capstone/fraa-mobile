import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Header from './configs/header';
import MainScreen from '../screens/main-screen';
import Home from '../screens/home';
import Profile from '../screens/profile';
import Agenda from '../screens/agenda';
import ROUTES from './routes';
import IdentityCamera from '../shared-components/identity-camera/IdentityCamera';

const MainStack = createStackNavigator();

const MainStackScreens = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerTitle: (props) => <Header {...props} />,
      }}>
      <MainStack.Screen name="MAIN" component={MainScreen} />
      <MainStack.Screen name={ROUTES.HOME} component={Home} />
      <MainStack.Screen name={ROUTES.AGENDA} component={Agenda} />
      <MainStack.Screen name={ROUTES.PROFILE} component={Profile} />
      <MainStack.Screen name={ROUTES.IDENTITY_CAMERA} component={IdentityCamera} />
    </MainStack.Navigator>
  );
};

export default MainStackScreens;
