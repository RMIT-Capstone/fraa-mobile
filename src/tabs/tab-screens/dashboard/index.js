import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ROUTES from '../../constants';
import Dashboard from '../../../views/dashboard';
import Header from '../../configs/header';
import IdentityCamera from '../../../views/shared-components/identity-camera';

const DashboardStack = createStackNavigator();

const DashboardStackScreens = () => {
  return (
    <DashboardStack.Navigator
      screenOptions={{
        headerTitle: props => <Header {...props} />,
      }}>
      <DashboardStack.Screen name={ROUTES.DASHBOARD} component={Dashboard} />
      <DashboardStack.Screen name={ROUTES.IDENTITY_CAMERA} component={IdentityCamera} />
    </DashboardStack.Navigator>
  );
};

export default DashboardStackScreens;
