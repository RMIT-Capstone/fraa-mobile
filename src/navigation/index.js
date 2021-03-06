import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/authentication-screens/login';
import ForgotPassword from '../screens/authentication-screens/forgot-password/components/ForgotPassword';
import Tutorials from '../screens/other-screens/tutorials/Tutorials';
import MainScreen from '../screens/main-screen';
import FRAACamera from '../shared-components/camera';
import AllAgendas from '../screens/other-screens/calendar/components/AllAgendas';
import ROUTES from './routes';
import AllCourses from '../screens/other-screens/profile/components/all-courses/AllCourses';

const MainStack = createStackNavigator();

const MainStackScreens = () => (
  <MainStack.Navigator
    // screenOptions={{
    //   // eslint-disable-next-line react/jsx-props-no-spreading
    //   headerTitle: (props) => <Header {...props} />,
    // }}
    screenOptions={{
      headerShown: false,
    }}>
    <MainStack.Screen name={ROUTES.LOGIN} component={Login} />
    <MainStack.Screen name={ROUTES.TUTORIALS} component={Tutorials} />
    <MainStack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
    <MainStack.Screen name={ROUTES.MAIN} component={MainScreen} />
    <MainStack.Screen name={ROUTES.CAMERA} component={FRAACamera} />
    <MainStack.Screen name={ROUTES.VIEW_ALL_AGENDA} component={AllAgendas} />
    <MainStack.Screen name={ROUTES.VIEW_ALL_COURSES} component={AllCourses} />
  </MainStack.Navigator>
);

export default MainStackScreens;
