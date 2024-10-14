import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import CommonScreen from '../../Components/CommonScreen/CommonScreen';
import HeaderComponent from '../../Components/Header Component/HeaderComponent';
import {useSelector} from 'react-redux';
import {Responsive} from '../../Assets/Responsive';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../Assets/Colors';
import {
  infoTextStyle,
  mediumTextStyle,
  regularTextStyle,
} from '../../CommonStyles/CommonStyles';
import Button1 from '../../Components/Button/Button1';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import Screens from '../screenIndex';

const ProfileScreen = ({navigation}) => {
  const profile = useSelector(state => state.user.userDetails);
  const userPosts = useSelector(state => state.user.userPosts);

  const formattedPosts = useCallback(() => {
    let flattenPosts = userPosts.map(ele => ele.imageArray);
    flattenPosts = flattenPosts.flat();
    const rows = Math.floor(flattenPosts.length / 3);
    let lastNum = flattenPosts.length - rows * 3;
    while (lastNum < 3 && lastNum > 0) {
      flattenPosts.push({isEmpty: true});
      lastNum += 1;
    }
    return flattenPosts;
  }, [userPosts]);

  const info = (title, value) => {
    return (
      <View style={styles.s3}>
        <Text
          style={
            (infoTextStyle,
            {color: Colors.primaryLightColor, fontSize: Responsive(11)})
          }>
          {title}
        </Text>
        <Text style={[mediumTextStyle]}>{value}</Text>
      </View>
    );
  };

  const renderLogoutIcon = () => {
    return (
      <View style={styles.iconContainer}>
        <MaterialIcons
          name="logout"
          size={Responsive(17)}
          color={Colors.primaryColor}
        />
      </View>
    );
  };
  const onLogout = () => {
    navigation.navigate(Screens.SignupRoute, {screen: Screens.WelcomeScreen});
  };

  const horizontaLine = () => {
    return <View style={styles.horizontaLine} />;
  };

  const renderPosts = ({item}) => {
    if (item.isEmpty) {
      return <View style={[styles.emptyContent, styles.content]} />;
    }

    return (
      <View
        style={[
          styles.content,
          {
            borderWidth: Responsive(2),
            borderColor: Colors.black,
            marginRight: Responsive(5),
            marginBottom: Responsive(5),
            borderRadius: Responsive(5),
          },
        ]}>
        <FastImage
          source={{uri: item.uri, priority: FastImage.priority.high}}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.contentImage}
        />
      </View>
    );
  };

  const flHeader = () => {
    return (
      <View style={styles.flheaderCOntinaer}>
        <Text style={[mediumTextStyle, {color: Colors.primaryLightColor}]}>
          All of your posts
        </Text>
      </View>
    );
  };

  const emptyComponent = () => {
    return (
      <View style={styles.s3}>
        <Text style={mediumTextStyle}>no posts !</Text>
      </View>
    );
  };

  return (
    <CommonScreen mainContainerStyle={styles.mainContainer}>
      <HeaderComponent isHeader={true} screenName={'Profile'} isBackButton />
      <View style={styles.mainContainer2}>
        <View style={styles.profileContainer}>
          <View style={styles.s1}>
            <View style={styles.s5}>
              <View style={styles.profilePicContainer}>
                {profile.profileType === 'image' ||
                profile.profileType === 'avatar' ? (
                  <Image
                    source={
                      profile.profileType === 'image'
                        ? {uri: profile.profilePic}
                        : profile.profilePic
                    }
                    style={styles.profilePic}
                    resizeMode="contain"
                  />
                ) : (
                  <FontAwesome
                    name="user"
                    size={Responsive(35)}
                    color={Colors.textGrayColor}
                  />
                )}
              </View>
              <View style={styles.s4}>
                {info('user name', profile.userName)}
                {info('birth date', profile.birthDate)}
              </View>
            </View>
            <Button1
              title="Logout"
              titleStyle={styles.titleStyle}
              buttonContainerStyle={styles.addMediaButtons}
              isIcon={true}
              IconComponent={renderLogoutIcon}
              configureOnPress={onLogout}
            />
          </View>

          <View style={styles.s2}>
            <View>
              <Text style={[infoTextStyle, {color: Colors.primaryLightColor}]}>
                bio
              </Text>
              <Text style={[styles.bioText, regularTextStyle]}>
                {profile.desc}
              </Text>
            </View>
          </View>
        </View>
        {horizontaLine()}
        <View>
          <FlatList
            data={formattedPosts(userPosts)}
            renderItem={renderPosts}
            numColumns={3}
            ListHeaderComponent={flHeader}
            style={styles.flatlistStyle}
            ListEmptyComponent={emptyComponent}
          />
        </View>
      </View>
    </CommonScreen>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  horizontaLine: {
    width: '100%',
    height: Responsive(2),
    backgroundColor: Colors.borderGray,
    marginTop: Responsive(15),
  },
  flheaderCOntinaer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Responsive(20),
  },
  emptyContent: {backgroundColor: ''},
  content: {flex: 1},
  contentImage: {height: 200, width: '100%'},
  s1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flatlistStyle: {marginTop: Responsive(7)},
  mainContainer: {backgroundColor: ''},
  mainContainer2: {width: '100%', alignSelf: 'center'},
  profilePic: {
    height: Responsive(42),
    width: Responsive(42),
    borderRadius: Responsive(20),
  },
  s2: {marginTop: Responsive(10)},
  addMediaButtons: {
    borderColor: Colors.primaryColor,
    width: Responsive(100),
  },
  profileContainer: {
    width: '95%',
    alignSelf: 'center',
    borderWidth: Responsive(2),
    borderRadius: Responsive(7),
    padding: Responsive(5),
    borderColor: Colors.borderGray,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profilePicContainer: {
    width: Responsive(42),
    height: Responsive(42),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Responsive(30),
    borderWidth: Responsive(2),
    borderColor: Colors.borderGray,
  },
  titleStyle: {color: Colors.primaryLightColor, marginLeft: Responsive(10)},
  s3: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Responsive(7),
  },
  s4: {flexDirection: 'row', marginLeft: Responsive(10)},
  s6: {flexDirection: 'row'},
});
