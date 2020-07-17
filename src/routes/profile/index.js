import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ROUTES from '../constants';
import Header from '../header';
import Profile from '../../views/profile';

const ProfileStack = createStackNavigator();

const ProfileStackScreens = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerTitle: props => <Header {...props} />,
      }}>
      <ProfileStack.Screen name={ROUTES.PROFILE} component={Profile} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreens;
