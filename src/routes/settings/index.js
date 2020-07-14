import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ROUTES from '../constants';
import Header from '../header';
import Settings from '../../views/settings';

const SettingsStack = createStackNavigator();

const SettingsStackScreens = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerTitle: props => <Header {...props} />,
      }}>
      <SettingsStack.Screen name={ROUTES.SETTINGS} component={Settings} />
    </SettingsStack.Navigator>
  );
};

export default SettingsStackScreens;
