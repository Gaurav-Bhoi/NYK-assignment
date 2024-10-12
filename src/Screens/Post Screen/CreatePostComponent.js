import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigationState, useRoute} from '@react-navigation/native';

const CreatePostComponent = ({navigation}) => {
  //   const route = useRoute1
  return <View style={styles.postScreenContent}></View>;
};

export default CreatePostComponent;

const styles = StyleSheet.create({
  postScreenContent: {
    height: 200,
    width: '100%',
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
});
