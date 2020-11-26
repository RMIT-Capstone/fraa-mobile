import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './configs/header';
import Login from '../screens/other-screens/login';
import MainScreen from '../screens/main-screen';
import ROUTES from './routes';

const MainStack = createStackNavigator();

const MainStackScreens = () => (
  <MainStack.Navigator
    screenOptions={{
      // eslint-disable-next-line react/jsx-props-no-spreading
      headerTitle: (props) => <Header {...props} />,
    }}>
    <MainStack.Screen options={{ headerShown: false }} name={ROUTES.LOGIN} component={Login} />
    <MainStack.Screen name={ROUTES.MAIN} component={MainScreen} />
  </MainStack.Navigator>
);

export default MainStackScreens;
