import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ROUTES from '../constants';
import Home from '../../views/home';

const HomeStack = createStackNavigator();

const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={ROUTES.HOME} component={Home} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreens;
