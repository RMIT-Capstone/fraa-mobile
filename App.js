import React from 'react';

// react-navigation
import 'react-native-gesture-handler';
import {View, Text} from 'react-native';

// redux, redux-persist
import {PersistGate} from 'redux-persist/es/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';

import {NavigationContainer} from '@react-navigation/native';

// bottom-navigation constant
// import ROUTES from './src/navigation/constants';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Hello world!</Text>
          </View>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
