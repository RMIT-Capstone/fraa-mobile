import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ROUTES from '../../constants';
import Header from '../../configs/header';
import Profile from '../../../views/profile';
import RegisterIdentity from '../../../views/components/register-identity';

const ProfileStack = createStackNavigator();

const ProfileStackScreens = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerTitle: props => <Header {...props} />,
      }}>
      <ProfileStack.Screen name={ROUTES.PROFILE} component={Profile} />
      <ProfileStack.Screen name={ROUTES.REGISTER_IDENTITY} component={RegisterIdentity} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreens;
