// test-utils.js
import React from 'react';
import {render} from '@testing-library/react-native';

// redux, redux-persist
// import {PersistGate} from 'redux-persist/es/integration/react';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from '../../config/redux/store';

// react-navigation
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

// react navigation stack
import HomeStackScreens from '../../routes/home';
import DashboardStackScreens from '../../routes/dashboard';
import SettingsStackScreens from '../../routes/settings';
import ProfileStackScreens from '../../routes/profile';

// routes constant
import ROUTES from '../../routes/constants';

// custom tab
import TabWithIcon from '../../routes/tab-with-icon';
import ReduxLoading from '../../shared-components/loading/redux-load-screen';
import Test from '../../views/test/Test';
import FraaToast from '../../shared-components/toast/FraaToast';
import FraaDialog from '../../shared-components/dialog';

const Tab = createBottomTabNavigator();

// import {ThemeProvider} from 'my-ui-lib';
// import {TranslationProvider} from 'my-i18n-lib';
// import defaultStrings from 'i18n/en-x-default';

const AllTheProviders = ({children}) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<ReduxLoading />} persistor={persistor}>
        <NavigationContainer>
          {/* <ThemeProvider theme="light">
            <TranslationProvider messages={defaultStrings}> */}
          {children}
          {/* </TranslationProvider>
          </ThemeProvider> */}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options});

// re-export everything
export * from '@testing-library/react-native';

// override render method
export {customRender as render};
