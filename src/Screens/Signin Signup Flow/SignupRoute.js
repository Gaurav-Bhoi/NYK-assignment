import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Fonts from '../../Assets/Fonts';
import Colors from '../../Assets/Colors';
import CommonScreen from '../../Components/CommonScreen/CommonScreen';
import BottomModal from '../../Components/Bottom Modal/BottomModal';
import {Responsive} from '../../Assets/Responsive';
import {NavigationContainer} from '@react-navigation/native';
import Route2 from './Route2';
import {Images} from '../../Assets/ImageIndex';

const SignupRoute = () => {
  return (
    <CommonScreen
      mainContainerStyle={styles.commonScreenStyle}
      contentContainerStyle={styles.contentContainerStyle}>
      <Image source={Images.nykWhiteLogo} style={styles.logo} />
      <Route2 />
    </CommonScreen>
  );
};

export default SignupRoute;
const styles = StyleSheet.create({
  commonScreenStyle: {
    backgroundColor: Colors.primaryColor,
  },
  mainContainer: {
    height: '100%',
    width: '100%',
    marginTop: Responsive(10),
  },
  logo: {
    height: Responsive(80),
    width: Responsive(80),
    marginTop: Responsive(100),
  },
  contentContainerStyle: {justifyContent: 'center', alignItems: 'center'},
});
