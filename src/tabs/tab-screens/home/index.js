import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ROUTES from '../../constants';
import Home from '../../../views/home';
import Header from '../../configs/header';

const HomeStack = createStackNavigator();

const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitle: props => <Header {...props} />,
      }}>
      <HomeStack.Screen name={ROUTES.HOME} component={Home} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreens;
