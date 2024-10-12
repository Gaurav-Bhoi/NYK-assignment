import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Screens from './screenIndex';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignupRoute from './Signin Signup Flow/SignupRoute';
import ProfileSetting from './Profile Setting Screen/ProfileSetting';
import TabNavigation from './Tab Navigtaion/TabNavigation';

const Route = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Screens.TabNavigation} component={TabNavigation} />
      <Stack.Screen name={Screens.SignupRoute} component={SignupRoute} />
      <Stack.Screen
        name={Screens.ProfileSettingScreen}
        component={ProfileSetting}
      />
    </Stack.Navigator>
  );
};

export default Route;

const styles = StyleSheet.create({});
