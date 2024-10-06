import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Fonts from '../../Assets/Fonts';
import Colors from '../../Assets/Colors';
import CommonScreen from '../../Components/CommonScreen/CommonScreen';
import BottomModal from '../../Components/Bottom Modal/BottomModal';

const Signup = () => {
  return (
    <CommonScreen mainContainerStyle={styles.commonScreenStyle}>
      <BottomModal showCloseButton={false}></BottomModal>
    </CommonScreen>
  );
};

export default Signup;
const styles = StyleSheet.create({
  commonScreenStyle: {
    backgroundColor: Colors.primaryColor,
  },
});
