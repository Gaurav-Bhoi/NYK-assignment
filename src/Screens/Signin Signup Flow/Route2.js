import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Screens from '../screenIndex';
import WelcomeScreen from './WelcomeScreen';
import {useNavigationContainerRef} from '@react-navigation/native';
import SignupSection from './SignupSection';

const Route2 = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.WelcomeScreen}
        component={WelcomeScreen}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen name={Screens.SignupSection} component={SignupSection} />
    </Stack.Navigator>
  );
};

export default Route2;

const styles = StyleSheet.create({});
