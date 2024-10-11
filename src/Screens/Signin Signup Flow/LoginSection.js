import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import BottomModal from '../../Components/Bottom Modal/BottomModal';
import TextInput1 from '../../Components/TextInput/TextInput1';
import {Responsive} from '../../Assets/Responsive';
import Colors from '../../Assets/Colors';
import {headerStyle} from '../../CommonStyles/CommonStyles';
import Button1 from '../../Components/Button/Button1';
import {Const} from '../../Assets/Const';
import Screens from '../screenIndex';
import {setUserCreds} from '../../Store/Reducers/user';

const LoginSection = ({route, navigation}) => {
  const {params} = route;
  const [email, setEmail] = useState(Const.demoMail);
  const [pass, setPass] = useState(Const.demoPassword);
  const onChangeText = text => setEmail(text);
  const onChangePassword = text => setPass(text);
  const [isLoginPressed, setIsLoginPressed] = useState(false);
  const [openPopup, setOpenPopup] = useState(true);
  const onPressLogin = () => {
    setOpenPopup(false);
    setTimeout(() => {});
    navigation.navigate(Screens.ProfileSettingScreen);
    setIsLoginPressed(true);
    if (!!email && !!pass) {
      const payload = {type: params.type, auth: email, pass: pass};
      setUserCreds(payload);
    }
  };

  return (
    <BottomModal
      showCloseButton={false}
      modalVisible={openPopup}
      autoClose={false}
      navigation={navigation}
      showBackButton
      startAnimation={params.startAnimation}>
      <View style={styles.mainContainer}>
        <View style={styles.s1}>
          <Text style={[headerStyle, {color: Colors.primaryColor}]}>
            Welcome To NYK
          </Text>
          <TextInput1
            buttonContainerStyle={[
              styles.buttonContainerStyle,
              {
                borderColor:
                  isLoginPressed && !email
                    ? Colors.warningRed
                    : Colors.borderGray,
              },
            ]}
            configureTextChange={text => onChangeText(text)}
            textValue={email}
            keyboardType={params.type === 'phone' ? 'numeric' : 'email'}
            placeHolder={
              params.type === 'email'
                ? 'Enter email here'
                : 'Enter phone number here'
            }
          />
          <TextInput1
            buttonContainerStyle={[
              styles.buttonContainerStyle2,
              {
                borderColor:
                  isLoginPressed && !pass
                    ? Colors.warningRed
                    : Colors.borderGray,
              },
            ]}
            configureTextChange={text => onChangePassword(text)}
            textValue={pass}
            placeHolder="Enter password here"
            isPassword
          />
        </View>
        <Button1
          title="Login"
          buttonContainerStyle={styles.buttonContainerStyle}
          titleStyle={{color: Colors.primaryColor}}
          configureOnPress={onPressLogin}
        />
      </View>
    </BottomModal>
  );
};

export default LoginSection;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '90%',
    width: '100%',
    alignSelf: 'center',
  },
  s1: {justifyContent: 'center', alignItems: 'center'},
  buttonContainerStyle: {width: '80%', marginTop: Responsive(25)},
  buttonContainerStyle2: {width: '80%', marginTop: Responsive(17)},
});
