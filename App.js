import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Route from './src/Screens/route';
import {configureGoogleSignin} from './src/Helper/GoogleHelper';
import {Provider} from 'react-redux';
import {store} from './src/Store/store';
import {posts} from './src/Assets/Const';
import moment from 'moment';

const App = () => {
  useEffect(() => {
    configureGoogleSignin();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Route />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
