import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import TextInput1 from '../TextInput/TextInput1';
import {Images} from '../../Assets/ImageIndex';
import {Responsive} from '../../Assets/Responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {headerStyle, mediumTextStyle} from '../../CommonStyles/CommonStyles';
import Colors from '../../Assets/Colors';

const HeaderComponent = React.memo(
  ({
    isAppLogo = false,
    isBackButton = false,
    isSearchBar = false,
    isHeader = false,
    navigation,
    screenName,
  }) => {
    const [search, setSearch] = useState('');

    const onChangePassword = text => {
      setSearch(text);
    };
    if (!isHeader) {
      return;
    }

    const onPressBack = () => {
      if (!!navigation) {
        navigation.goBack();
      }
    };

    return (
      <View style={styles.mainContainer}>
        {isAppLogo && (
          <Image source={Images.nykRedLogo} style={styles.logoStyle} />
        )}
        {isBackButton && (
          <View style={styles.screenNameContainer}>
            <Text style={[mediumTextStyle, styles.backButton]}>
              {screenName}
            </Text>
          </View>
        )}
        {isSearchBar && (
          <TextInput1
            mainContainer={{width: '60%'}}
            buttonContainerStyle={[styles.buttonContainerStyle2]}
            configureTextChange={text => onChangePassword(text)}
            textValue={search}
            placeHolder="Search here . . ."
            isPassword
          />
        )}
      </View>
    );
  },
);

export default HeaderComponent;

const styles = StyleSheet.create({
  backButtonContainer: {
    padding: Responsive(2),
    borderRadius: Responsive(20),
  },
  backButton: {
    marginTop: Responsive(3),
    marginLeft: Responsive(5),
    color: Colors.primaryColor,
  },
  mainContainer: {
    width: '100%',
    backgroundColor: Colors.white,
    marginBottom: Responsive(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: Responsive(7),
    shadowColor: Colors.black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 10,
  },
  screenNameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logoStyle: {height: Responsive(30), width: Responsive(30)},
  buttonContainerStyle2: {width: '100%'},
});
