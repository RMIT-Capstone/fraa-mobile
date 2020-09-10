import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ROUTES from '../../constants';
import Home from '../../../views/home';
import Header from '../../configs/header';
import CheckIn from '../../../views/profile/components/check-in/CheckIn';

const HomeStack = createStackNavigator();

const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitle: props => <Header {...props} />,
      }}>
      <HomeStack.Screen name={ROUTES.HOME} component={Home} />
      <HomeStack.Screen name={ROUTES.CHECK_IN} component={CheckIn} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreens;
