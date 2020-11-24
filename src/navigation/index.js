import React from 'react';
import Header from './configs/header';
import Login from '../screens/other-screens/login';
import MainScreen from '../screens/main-screen';
import ROUTES from './routes';
import { createStackNavigator } from '@react-navigation/stack';
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
    </MainStack.Navigator>
  );
};

export default MainStackScreens;
