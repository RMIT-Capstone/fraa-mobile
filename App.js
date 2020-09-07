import React from 'react';

// redux, redux-persist
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/config/redux/store';

// react-navigation
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

// react navigation stack
// import HomeStackScreens from './src/tabs/tab-screens/home';
import DashboardStackScreens from './src/tabs/tab-screens/dashboard';
import SettingsStackScreens from './src/tabs/tab-screens/settings';
import ProfileStackScreens from './src/tabs/tab-screens/profile';

// tab-screens constant
import ROUTES from './src/tabs/constants';

// custom tab
import Index from './src/tabs/configs/tab-with-icon';
import ReduxLoading from './src/shared-components/loading/redux-load-screen';
// add this for testing components
// import Test from './src/views/test/Test';
import FraaToast from './src/shared-components/toast/FraaToast';
import FraaDialog from './src/shared-components/dialog';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<ReduxLoading />} persistor={persistor}>
        <NavigationContainer>
          <Tab.Navigator tabBar={props => <Index {...props} />}>
            {/*<Tab.Screen name={ROUTES.HOME} component={HomeStackScreens} />*/}
            <Tab.Screen
              name={ROUTES.DASHBOARD}
              component={DashboardStackScreens}
            />
            <Tab.Screen name={ROUTES.PROFILE} component={ProfileStackScreens} />
            <Tab.Screen
              name={ROUTES.SETTINGS}
              component={SettingsStackScreens}
            />
            {/*<Tab.Screen name={ROUTES.TEST} component={Test} />*/}
          </Tab.Navigator>
        </NavigationContainer>
        <FraaToast />
        <FraaDialog />
      </PersistGate>
    </Provider>
  );
};

export default App;
