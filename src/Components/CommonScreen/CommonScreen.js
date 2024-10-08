import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../../Assets/Colors';

const CommonScreen = ({
  children,
  mainContainerStyle = {},
  contentContainerStyle = {},
}) => {
  return (
    <ScrollView
      style={[styles.mainStyle, mainContainerStyle]}
      contentContainerStyle={[contentContainerStyle]}>
      {children}
    </ScrollView>
  );
};

export default CommonScreen;

const styles = StyleSheet.create({
  mainStyle: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});
