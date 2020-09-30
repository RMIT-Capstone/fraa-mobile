import React from 'react';

// react-navigation
import 'react-native-gesture-handler';

// redux, redux-persist
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';

import {NavigationContainer} from '@react-navigation/native';
import MainStackScreens from './src/navigation';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainStackScreens />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
