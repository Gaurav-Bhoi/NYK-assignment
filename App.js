import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Route from './src/Screens/route';
import {configureGoogleSignin} from './src/Helper/GoogleHelper';

const App = () => {
  useEffect(configureGoogleSignin, []);
  return (
    <NavigationContainer>
      <Route />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
