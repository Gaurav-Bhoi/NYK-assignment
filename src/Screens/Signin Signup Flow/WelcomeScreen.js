import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BottomModal from '../../Components/Bottom Modal/BottomModal';
import Screens from '../screenIndex';
import {
  headerStyle,
  infoTextStyle,
  mediumTextStyle,
} from '../../CommonStyles/CommonStyles';
import Colors from '../../Assets/Colors';
import Button1 from '../../Components/Button/Button1';
import Feather from 'react-native-vector-icons/Feather';
import {Responsive} from '../../Assets/Responsive';
import {Images} from '../../Assets/ImageIndex';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {loginFb} from '../../Helper/FacebookHelper';

const WelcomeScreen = ({navigation}) => {
  const [openPopup, setOpenPopup] = useState(true);
  const [mode, setMode] = useState('login');

  const renderMailIcon = () => {
    return (
      <View style={styles.iconContainer}>
        <Feather
          name="mail"
          size={Responsive(17)}
          color={Colors.primaryColor}
        />
      </View>
    );
  };
  const renderPhoneIcon = () => {
    return (
      <View style={styles.iconContainer}>
        <Feather
          name="phone"
          size={Responsive(17)}
          color={Colors.primaryColor}
        />
      </View>
    );
  };

  const onPressSignup = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  const renderSigninComponent = () => {
    return (
      <View style={styles.signinContainer}>
        <Text style={[infoTextStyle, {marginRight: Responsive(6)}]}>
          {mode !== 'signup' ? `I don't have an account` : `I have an account`}
        </Text>
        <Text
          style={[
            infoTextStyle,
            {color: Colors.primaryColor, fontSize: Responsive(11)},
          ]}
          onPress={onPressSignup}>
          {mode !== 'login' ? 'Login' : 'Signup'}
        </Text>
      </View>
    );
  };

  const renderOrComponent = () => {
    return (
      <View style={styles.orComponentContainer}>
        <View style={styles.horizontalLine} />
        <Text
          style={[
            styles.orText,
            mediumTextStyle,
            {color: Colors.primaryColor},
          ]}>
          OR
        </Text>
        <View style={styles.horizontalLine} />
      </View>
    );
  };

  const renderGoogleIcon = () => {
    return (
      <View style={styles.iconContainer}>
        <Image source={Images.googleLogo} style={styles.logoContainer} />
      </View>
    );
  };

  const renderAppleIcon = () => {
    return (
      <View style={styles.iconContainer}>
        <Image source={Images.appleLogo} style={styles.logoContainer} />
      </View>
    );
  };
  const renderFacebookIcon = () => {
    return (
      <View style={styles.iconContainer}>
        <Image source={Images.facebookLogo} style={styles.logoContainer} />
      </View>
    );
  };

  const onPressGoogleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (response) {
      } else {
      }
    } catch (error) {
      if (error) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            break;
          default:
        }
      } else {
      }
    }
  };

  const onPressEmailLogin = type => {
    setOpenPopup(false);
    navigation.navigate(Screens.LoginSection, {
      type,
      mode,
      // startAnimation: 'slide-to-left',
    });
  };

  const onPressLoginWithFB = () => {
    try {
      loginFb();
    } catch {
    } finally {
    }
  };

  return (
    <BottomModal
      showCloseButton={false}
      modalVisible={openPopup}
      autoClose={false}
      navigation={navigation}
      startAnimation={'slide-to-right'}>
      <View style={styles.mainViewStyle}>
        <Text style={[headerStyle, {color: Colors.primaryColor}]}>
          Welcome To NYK
        </Text>
        <Button1
          title={mode === 'login' ? 'Login with Email' : 'Signup with Email'}
          buttonContainerStyle={styles.buttonContainerStyle}
          isIcon={true}
          IconComponent={renderMailIcon}
          configureOnPress={() => onPressEmailLogin('email')}
        />
        <Button1
          title={mode === 'login' ? 'Login with Phone' : 'Signup with Phone'}
          buttonContainerStyle={styles.buttonContainerStyle2}
          isIcon={true}
          IconComponent={renderPhoneIcon}
          configureOnPress={() => onPressEmailLogin('phone')}
        />
        {renderSigninComponent()}
        {renderOrComponent()}

        <Button1
          title="Login with Google"
          buttonContainerStyle={styles.buttonContainerStyle2}
          isImage={true}
          ImageComponent={renderGoogleIcon}
          configureOnPress={onPressGoogleSignin}
        />
        <Button1
          title="Login with Facebook"
          buttonContainerStyle={styles.buttonContainerStyle2}
          isImage={true}
          ImageComponent={renderFacebookIcon}
          configureOnPress={onPressLoginWithFB}
        />
        <Button1
          title="Login with Apple"
          buttonContainerStyle={styles.buttonContainerStyle2}
          isImage={true}
          ImageComponent={renderAppleIcon}
        />
      </View>
    </BottomModal>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  mainViewStyle: {alignItems: 'center'},
  iconContainer: {marginRight: Responsive(8)},
  buttonContainerStyle: {width: '80%', marginTop: Responsive(25)},
  buttonContainerStyle2: {width: '80%', marginTop: Responsive(17)},
  signinContainer: {
    marginTop: Responsive(7),
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orComponentContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Responsive(15),
    flexDirection: 'row',
  },
  horizontalLine: {
    height: Responsive(2),
    width: '50%',
    backgroundColor: Colors.borderGray,
  },
  orText: {marginHorizontal: Responsive(10), color: Colors.primaryColor},
  logoContainer: {height: Responsive(16), width: Responsive(16)},
});
