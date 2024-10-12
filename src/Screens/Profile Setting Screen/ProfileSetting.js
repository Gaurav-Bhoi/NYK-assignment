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

const ProfileSetting = () => {
  const [userName, setUserName] = useState(
    `user ${Math.floor(Math.random() * 1000)}`,
  );
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [desc, setDesc] = useState('');
  const [profileType, setProfileType] = useState('icon');
  const [profilePic, setProfilePic] = useState(undefined);
  const [bitrthDate, setBirthDate] = useState('DD/MM/YYYY');
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const onChangeUserEmail = text => setEmail(text);
  const onChangeUserPhone = text => setPhone(text);
  const onChangeUserDesc = text => setDesc(text);
  const onChangeUserName = text => setUserName(text);

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

  const renderAvatars = () => {
    return (
      <FlatList
        data={Images.avatars}
        renderItem={renderAvatar}
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

  const onSelectProfilePic = (item, type) => {
    setProfilePic(item);
    setProfileType(type);
  };

  const renderAvatar = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={() => onSelectProfilePic(item, 'avatar')}>
        <Image source={item} style={styles.avatar} resizeMode="contain" />
      </TouchableOpacity>
    );
  };

  const onPressUploadPic = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log(image);
      onSelectProfilePic(image.path, 'image');
    });
  };

  const renderBottomModal = () => {
    return (
      <BottomModal
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
            configureOnPress={onPressUploadPic}
          />
          {renderOrComponent()}
          <Text style={[mediumTextStyle, {color: Colors.primaryColor}]}>
            Use an avatar
          </Text>
          {renderAvatars()}
        </ScrollView>
      </BottomModal>
    );
  };

  const onPressProfilePic = () => {
    setOpenPopup(true);
  };

  return (
    <CommonScreen>
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <View style={styles.imageContainer2}>
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={onPressProfilePic}>
              {profileType === 'image' || profileType === 'avatar' ? (
                <Image
                  source={
                    profileType === 'image' ? {uri: profilePic} : profilePic
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
          <View>
            <TextInput1
              infoText="user name"
              buttonContainerStyle={[styles.buttonContainerStyle]}
              configureTextChange={text => onChangeUserName(text)}
              textValue={userName}
              placeHolder={`user${Math.floor(Math.random() * 10001)}`}
            />
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={{width: '100%'}}>
            <TextInput1
              infoText="email"
              configureTextChange={text => onChangeUserEmail(text)}
              textValue={userName}
              placeHolder={`abc@gmail.com`}
            />
            <TextInput1
              infoText="phone"
              configureTextChange={text => onChangeUserPhone(text)}
              textValue={userName}
              placeHolder={`7028189930`}
              mainContainer={styles.buttonContainerStyle2}
            />
            <TextInput1
              infoText="birth date"
              textValue={userName}
              placeHolder={bitrthDate}
              mainContainer={styles.buttonContainerStyle2}
              isEditable={false}
              configureOnPress={onPressSelectDate}
            />

            <TextInput1
              infoText="bio"
              configureTextChange={text => onChangeUserDesc(text)}
              buttonContainerStyle={styles.descStyle}
              textValue={userName}
              placeHolder={`tell us something about yourself...`}
              mainContainer={styles.buttonContainerStyle2}
              customTextStyle={styles.bioStyle}
            />
          </View>
          <Button1
            title="Save and Continue"
            buttonContainerStyle={styles.saveButton}
            // isIcon={true}
            // IconComponent={renderMailIcon}
            // configureOnPress={() => onPressEmailLogin('email')}
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
          setBirthDate(formattedDate);
          setOpenDatePicker(false);
        }}
        onCancel={() => {
          setOpenDatePicker(false);
        }}
      />
      {renderBottomModal()}
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
  buttonContainerStyle: {width: Responsive(180), marginBottom: Responsive(30)},
  buttonContainerStyle2: {marginTop: Responsive(10)},
  infoContainer: {
    marginTop: Responsive(20),
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
});
