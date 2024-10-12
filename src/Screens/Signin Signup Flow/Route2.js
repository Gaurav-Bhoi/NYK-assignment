import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Screens from '../screenIndex';
import WelcomeScreen from './WelcomeScreen';
import SignupSection from './SignupSection';
import LoginSection from './LoginSection';

const Route2 = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name={Screens.WelcomeScreen} component={WelcomeScreen} />
      <Stack.Screen name={Screens.SignupSection} component={SignupSection} />
      <Stack.Screen name={Screens.LoginSection} component={LoginSection} />
    </Stack.Navigator>
  );
};

export default Route2;
