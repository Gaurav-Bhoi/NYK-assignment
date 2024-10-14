import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Route from './src/Screens/route';
import {configureGoogleSignin} from './src/Helper/GoogleHelper';
import {Provider} from 'react-redux';
import {persistor, store} from './src/Store/store';
import {posts} from './src/Assets/Const';
import moment from 'moment';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  useEffect(() => {
    configureGoogleSignin();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Route />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
