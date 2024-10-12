import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useNavigationState} from '@react-navigation/native';
import HomeScreen from '../Home Screen/HomeScreen';
import MessageScreen from '../Message Screen/MessageScreen';
import NotificationScreen from '../Notification Screen/NotificationScreen';
import ProfileScreen from '../Profile Screen.js/ProfileScreen';

const CreatePostScreen = ({route}) => {
  const routes = useNavigationState(state => state.routes);
  const currentRouteIndex = useNavigationState(state => state.index);
  const previousTabRef = useRef('Home');
  const {setShowPopup} = route.params;
  useEffect(() => {
    previousTabRef.current = routes[currentRouteIndex].name;
  }, [currentRouteIndex, routes]);

  // useEffect(() => {
  //   setShowPopup(true);
  // }, [setShowPopup]);

  const lastTab = previousTabRef.current;

  switch (lastTab) {
    case 'Home':
      return <HomeScreen />;
    case 'Messages':
      return <MessageScreen />;
    case 'Notifications':
      return <NotificationScreen />;
    case 'Profile':
      return <ProfileScreen />;
  }
};

export default CreatePostScreen;

const styles = StyleSheet.create({});
