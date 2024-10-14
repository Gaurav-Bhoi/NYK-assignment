import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CommonScreen from '../../Components/CommonScreen/CommonScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Responsive} from '../../Assets/Responsive';
import Colors from '../../Assets/Colors';
import {
  mediumTextStyle,
  regularTextStyle,
} from '../../CommonStyles/CommonStyles';
import TextInput1 from '../../Components/TextInput/TextInput1';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Button1 from '../../Components/Button/Button1';
import BottomModal from '../../Components/Bottom Modal/BottomModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Images} from '../../Assets/ImageIndex';
import ImagePicker from 'react-native-image-crop-picker';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {AllActions} from '../../Store/actionIndex';
import Screens from '../screenIndex';

const ProfileSetting = ({navigation}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.user.userDetails);
  const [openPopup, setOpenPopup] = useState(false);

  const useralidationSchema = yup.object().shape({
    userName: yup
      .string()
      .matches(/(\w.+\s).+/, 'Enter full name')
      .required('user name is required'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('email address is required'),
    phone: yup.string().required('phone number is required'),
    desc: yup.string(),
    birthDate: yup.string().required('select your birth date'),
  });

  const onPressSelectDate = () => {
    setOpenDatePicker(true);
  };

  const IconComponent = () => {
    return (
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="image-plus"
          size={Responsive(17)}
          color={Colors.primaryColor}
        />
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

  const renderAvatars = setFieldValue => {
    return (
      <FlatList
        data={Images.avatars}
        renderItem={({item}) => renderAvatar({item}, setFieldValue)}
        contentContainerStyle={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        style={{width: '91%', marginTop: Responsive(20)}}
        numColumns={5}
      />
    );
  };

  const onSelectProfilePic = (item, type, setFieldValue) => {
    setFieldValue('profilePic', item);
    setFieldValue('profileType', type);
  };

  const renderAvatar = ({item}, setFieldValue) => {
    return (
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={() => onSelectProfilePic(item, 'avatar', setFieldValue)}>
        <Image source={item} style={styles.avatar} resizeMode="contain" />
      </TouchableOpacity>
    );
  };

  const onPressUploadPic = setFieldValue => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      onSelectProfilePic(image.path, 'image', setFieldValue);
    });
  };

  const onClose = () => {
    setOpenPopup(false);
  };

  const renderBottomModal = setFieldValue => {
    return (
      <BottomModal
        onClose={onClose}
        showCloseButton={true}
        modalVisible={openPopup}
        autoClose={true}>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
          }}>
          <Button1
            buttonContainerStyle={styles.s1}
            title="Select picture from galary"
            isIcon
            IconComponent={IconComponent}
            configureOnPress={() => onPressUploadPic(setFieldValue)}
          />
          {renderOrComponent()}
          <Text style={[mediumTextStyle, {color: Colors.primaryColor}]}>
            Use an avatar
          </Text>
          {renderAvatars(setFieldValue)}
        </ScrollView>
      </BottomModal>
    );
  };

  const onPressProfilePic = () => {
    setOpenPopup(true);
  };

  const onPressSubmit = values => {
    dispatch({type: AllActions.SET_USER_DETAILS, payload: values});
    navigation.navigate(Screens.TabNavigation);
  };

  return (
    <CommonScreen>
      <Formik
        validationSchema={useralidationSchema}
        initialValues={userDetails}
        onSubmit={onPressSubmit}>
        {({handleChange, handleSubmit, setFieldValue, values, errors}) => {
          return (
            <>
              <View style={styles.mainContainer}>
                <View style={styles.topContainer}>
                  <View style={styles.imageContainer2}>
                    <TouchableOpacity
                      style={styles.imageContainer}
                      onPress={onPressProfilePic}>
                      {values.profileType === 'image' ||
                      values.profileType === 'avatar' ? (
                        <Image
                          source={
                            values.profileType === 'image'
                              ? {uri: values.profilePic}
                              : values.profilePic
                          }
                          style={styles.profilePic}
                          resizeMode="contain"
                        />
                      ) : (
                        <FontAwesome
                          name="user"
                          size={Responsive(40)}
                          color={Colors.textGrayColor}
                        />
                      )}
                    </TouchableOpacity>
                    <Text style={[regularTextStyle, styles.text1]}>
                      Add Profile Picture
                    </Text>
                  </View>
                  <View style={styles.s2}>
                    <TextInput1
                      infoText="user name *"
                      buttonContainerStyle={[styles.buttonContainerStyle]}
                      configureTextChange={handleChange('userName')}
                      textValue={values.userName}
                      placeHolder={`user${Math.floor(Math.random() * 10001)}`}
                    />
                    {errors.userName && (
                      <Text style={{fontSize: 10, color: 'red'}}>
                        {errors.userName}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={styles.infoContainer}>
                  <View style={{width: '100%'}}>
                    <TextInput1
                      infoText="email *"
                      configureTextChange={handleChange('email')}
                      textValue={values.email}
                      placeHolder={`abc@gmail.com`}
                    />
                    {errors.email && (
                      <Text style={{fontSize: 10, color: 'red'}}>
                        {errors.email}
                      </Text>
                    )}
                    <TextInput1
                      infoText="phone *"
                      configureTextChange={handleChange('phone')}
                      textValue={values.phone}
                      placeHolder={`7028189930`}
                      mainContainer={styles.buttonContainerStyle2}
                    />
                    {errors.phone && (
                      <Text style={{fontSize: 10, color: 'red'}}>
                        {errors.phone}
                      </Text>
                    )}
                    <TextInput1
                      infoText="birth date *"
                      textValue={values.birthDate}
                      placeHolder={'DD/MM/YYYY'}
                      mainContainer={styles.buttonContainerStyle2}
                      isEditable={false}
                      configureOnPress={onPressSelectDate}
                    />
                    {errors.birthDate && (
                      <Text style={{fontSize: 10, color: 'red'}}>
                        {errors.birthDate}
                      </Text>
                    )}
                    <TextInput1
                      infoText="bio"
                      isMultiline
                      configureTextChange={handleChange('desc')}
                      buttonContainerStyle={styles.descStyle}
                      textValue={values.desc}
                      placeHolder={`tell us something about yourself...`}
                      mainContainer={styles.buttonContainerStyle2}
                      customTextStyle={styles.bioStyle}
                    />
                    {errors.desc && (
                      <Text style={{fontSize: 10, color: 'red'}}>
                        {errors.desc}
                      </Text>
                    )}
                  </View>

                  <Button1
                    title="Save and Continue"
                    titleStyle={styles.titleStyle}
                    buttonContainerStyle={styles.saveButton}
                    configureOnPress={handleSubmit}
                  />
                </View>
              </View>

              <DatePicker
                modal
                date={new Date()}
                open={openDatePicker}
                mode="date"
                onConfirm={date => {
                  const formattedDate = moment(date).format('DD/MM/YYYY');
                  setFieldValue('birthDate', formattedDate);
                  setOpenDatePicker(false);
                }}
                onCancel={() => {
                  setOpenDatePicker(false);
                }}
              />
              {renderBottomModal(setFieldValue)}
            </>
          );
        }}
      </Formik>
    </CommonScreen>
  );
};

export default ProfileSetting;

const styles = StyleSheet.create({
  profilePic: {
    height: Responsive(42),
    width: Responsive(42),
    borderRadius: Responsive(20),
  },
  avatarContainer: {
    backgroundColor: Colors.avatarBG,
    width: Responsive(45),
    height: Responsive(45),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Responsive(25),
    marginRight: Responsive(10),
    marginBottom: Responsive(10),
  },
  avatar: {width: Responsive(30), height: Responsive(30)},
  s2: {marginBottom: Responsive(30)},
  s1: {marginTop: Responsive(20)},
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    alignSelf: 'center',
    marginTop: Responsive(20),
  },
  bioStyle: {
    textAlignVertical: 'top',
    height: '100%',
    paddingVertical: Responsive(5),
  },
  descStyle: {height: Responsive(100)},
  buttonContainerStyle: {width: Responsive(180)},
  buttonContainerStyle2: {marginTop: Responsive(10)},
  infoContainer: {
    marginTop: Responsive(15),
    height: Responsive(550),
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text1: {marginTop: Responsive(5)},
  imageContainer: {
    height: Responsive(50),
    width: Responsive(50),
    borderRadius: Responsive(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.borderGray,
    borderWidth: Responsive(3),
  },
  imageContainer2: {
    height: Responsive(70),
    width: Responsive(90),
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusContainer: {
    position: 'absolute',
    right: Responsive(0),
    bottom: Responsive(0),
  },
  topContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  disabledStyle: {color: Colors.buttonInActiveGray, marginLeft: Responsive(10)},
  disabledStyle2: {borderColor: Colors.buttonInActiveGray},
  iconContainer: {marginRight: Responsive(7)},
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
  saveButton: {borderColor: Colors.primaryColor},
  titleStyle: {color: Colors.primaryColor, marginLeft: Responsive(10)},
});
