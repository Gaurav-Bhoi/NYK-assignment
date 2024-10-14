import {Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Screens from '../screenIndex';
import HomeScreen from '../Home Screen/HomeScreen';
import MessageScreen from '../Message Screen/MessageScreen';
import NotificationScreen from '../Notification Screen/NotificationScreen';
import ProfileScreen from '../Profile Screen.js/ProfileScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../Assets/Colors';
import {Responsive} from '../../Assets/Responsive';
import {Images} from '../../Assets/ImageIndex';
import CreatePostScreen from '../Post Screen/CreatePostScreen';

const TabNavigation = ({navigation}) => {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => {
          return {
            tabBarIcon: ({focused, color, size}) => {
              return <TabIcons route={route} color={color} size={size} />;
            },
            tabBarActiveTintColor: Colors.primaryColor,
            tabBarInactiveTintColor: Colors.buttonInActiveGray,
            headerShown: false,
            tabBarStyle: {zIndex: 9999999},
          };
        }}>
        <Tab.Screen name={Screens.HomeScreen} component={HomeScreen} />
        <Tab.Screen name={Screens.MessageScreen} component={MessageScreen} />
        <Tab.Screen name={Screens.PostScreen} component={CreatePostScreen} />
        <Tab.Screen
          name={Screens.NotificationScreen}
          component={NotificationScreen}
          options={{
            tabBarBadge: 3,
            tabBarBadgeStyle: {
              backgroundColor: Colors.primaryColor,
            },
          }}
        />
        <Tab.Screen name={Screens.ProfileScreen} component={ProfileScreen} />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  createPostIconContainer: {
    height: Responsive(50),
    width: Responsive(50),
    backgroundColor: Colors.white,
    borderRadius: Responsive(50),
    marginBottom: Responsive(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  createPostIcon: {
    height: Responsive(35),
    width: Responsive(35),
  },
});

const TabIcons = ({route, color, size}) => {
  switch (route.name) {
    case Screens.HomeScreen:
      return <AntDesign name="home" size={size} color={color} />;

    case Screens.MessageScreen:
      return (
        <Ionicons name="chatbox-ellipses-outline" size={size} color={color} />
      );

    case Screens.PostScreen:
      return (
        <View style={styles.createPostIconContainer}>
          <Image
            source={Images.nykRedLogo}
            style={styles.createPostIcon}
            resizeMode="contain"
          />
        </View>
      );
    case Screens.NotificationScreen:
      return <AntDesign name="notification" size={size} color={color} />;
    case Screens.ProfileScreen:
      return <FontAwesome name="user-secret" size={size} color={color} />;
  }
};
