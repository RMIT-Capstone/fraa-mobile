import React from 'react';

// react-navigation
import 'react-native-gesture-handler';

// redux, redux-persist
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { persistor, store } from './src/redux/store';

import MainStackScreens from './src/navigation';
import Toast from './src/shared-components/toast/Toast';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <MainStackScreens />
        <Toast />
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

export default App;
