import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import BottomModal from '../../Components/Bottom Modal/BottomModal';
import TextInput1 from '../../Components/TextInput/TextInput1';
import {Responsive} from '../../Assets/Responsive';
import Colors from '../../Assets/Colors';
import {headerStyle} from '../../CommonStyles/CommonStyles';
import Button1 from '../../Components/Button/Button1';
import Screens from '../screenIndex';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {AllActions} from '../../Store/actionIndex';
var _ = require('lodash');

const LoginSection = ({route, navigation}) => {
  const {params} = route;
  const dispatch = useDispatch();
  const usersList = useSelector(state => state.auth.usersList);

  const userCreds = {id: '', password: ''};

  const loginSchema = yup.object().shape({
    id: (() => {
      if (params.type === 'email') {
        return yup
          .string()
          .email('Please enter valid email')
          .required('email is required');
      }
      return yup.string().required('Phone number is required');
    })(),

    password: yup.string().required('Password is required'),
  });

  const signupSchema = yup.object().shape({
    id: (() => {
      if (params.type === 'email') {
        return yup
          .string()
          .email('Please enter valid email')
          .required('email is required');
      }
      return yup.string().required('Phone number is required');
    })(),
    password: yup
      .string()
      .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
      .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
      .matches(/\d/, 'Password must have a number')
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        'Password must have a special character',
      )
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match')
      .required('Confirm password is required'),
  });

  const [isLoginPressed, setIsLoginPressed] = useState(false);
  const [openPopup, setOpenPopup] = useState(true);
  const onPressLogin = () => {
    setOpenPopup(false);
    setTimeout(() => {});
    navigation.navigate(Screens.ProfileSettingScreen);
    setIsLoginPressed(true);
    // if (!!email && !!pass) {
    //   const payload = {type: params.type, auth: email, pass: pass};
    //   setUserCreds(payload);
    // }
  };

  const onSubmitAction = values => {
    if (params.mode === 'login') {
      return handleLogin(values);
    }
    handleSignup(values);
  };

  const handleLogin = values => {
    const existsUser = _.some(usersList, values);
    if (!!existsUser) {
      navigation.goBack();
      navigation.navigate(Screens.TabNavigation, {
        screen: Screens.SignupRoute,
      });
    }
  };

  const handleSignup = useCallback(
    values => {
      if (!!values.id && !!values.password) {
        dispatch({
          type: AllActions.SET_USERS_LIST,
          payload: {
            id: values.id,
            password: values.password,
          },
        });
      }
    },
    [dispatch],
  );

  return (
    <BottomModal
      showCloseButton={false}
      modalVisible={openPopup}
      autoClose={false}
      navigation={navigation}
      showBackButton
      startAnimation={params.startAnimation}>
      <Formik
        validationSchema={params.mode === 'login' ? loginSchema : signupSchema}
        initialValues={userCreds}
        onSubmit={onSubmitAction}>
        {({handleChange, handleSubmit, values, errors}) => {
          return (
            <View style={styles.mainContainer}>
              <View style={styles.s1}>
                <Text
                  style={[
                    headerStyle,
                    {color: Colors.primaryColor, alignSelf: 'center'},
                  ]}>
                  Welcome To NYK
                </Text>
                <TextInput1
                  buttonContainerStyle={[styles.buttonContainerStyle]}
                  configureTextChange={handleChange('id')}
                  textValue={values.id}
                  keyboardType={params.type === 'phone' ? 'numeric' : 'email'}
                  placeHolder={
                    params.type === 'email'
                      ? 'Enter email here'
                      : 'Enter phone number here'
                  }
                />
                {errors.email && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.email}
                  </Text>
                )}
                <TextInput1
                  buttonContainerStyle={[styles.buttonContainerStyle2]}
                  configureTextChange={handleChange('password')}
                  textValue={values.password}
                  placeHolder="Enter password here"
                  isPassword
                />
                {errors.password && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.password}
                  </Text>
                )}
                {params.mode === 'signup' && (
                  <>
                    <TextInput1
                      buttonContainerStyle={[styles.buttonContainerStyle2]}
                      configureTextChange={handleChange('confirmPassword')}
                      textValue={values.confirmPassword}
                      placeHolder="Confirm password here"
                      isPassword
                    />
                    {errors.confirmPassword && (
                      <Text style={{fontSize: 10, color: 'red'}}>
                        {errors.confirmPassword}
                      </Text>
                    )}
                  </>
                )}
              </View>
              <Button1
                title={params.mode === 'login' ? 'Login' : 'Signup'}
                buttonContainerStyle={[
                  styles.buttonContainerStyle,
                  {borderColor: Colors.primaryColor},
                ]}
                titleStyle={{color: Colors.primaryColor}}
                configureOnPress={handleSubmit}
              />
            </View>
          );
        }}
      </Formik>
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
  s1: {justifyContent: 'center', alignItems: 'flex-start'},
  buttonContainerStyle: {width: '80%', marginTop: Responsive(25)},
  buttonContainerStyle2: {width: '80%', marginTop: Responsive(17)},
});
