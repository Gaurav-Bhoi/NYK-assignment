import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useCallback, useRef, useState} from 'react';
import CommonScreen from '../../Components/CommonScreen/CommonScreen';
import HeaderComponent from '../../Components/Header Component/HeaderComponent';
import {useDispatch, useSelector} from 'react-redux';
import {Responsive} from '../../Assets/Responsive';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../Assets/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  infoTextStyle,
  mediumTextStyle,
  regularTextStyle,
} from '../../CommonStyles/CommonStyles';
import Button1 from '../../Components/Button/Button1';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import Screens from '../screenIndex';
import {AllActions} from '../../Store/actionIndex';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({navigation}) => {
  const profile = useSelector(state => state.user.userDetails);
  const [selectedMedia, setSelectedMedia] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const userPosts = useSelector(state => state.user.userPosts);
  const dispatch = useDispatch();
  const formattedPosts = useCallback(() => {
    let flattenPosts = userPosts.map(ele => ele.imageArray);
    flattenPosts = flattenPosts.flat();
    const rows = Math.floor(flattenPosts.length / 3);
    let lastNum = flattenPosts.length - rows * 3;
    while (lastNum < 3 && lastNum > 0) {
      flattenPosts.push({isEmpty: true});
      lastNum += 1;
    }
    const newFlat = flattenPosts.map((ele, index) => {
      return {...ele, id: index + 1};
    });
    return newFlat;
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
        <Text style={[[regularTextStyle, {fontSize: Responsive(10)}]]}>
          {value}
        </Text>
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
    dispatch({type: AllActions.SET_LOGIN_STATUS, payload: false});
    navigation.navigate(Screens.SignupRoute, {screen: Screens.WelcomeScreen});
  };

  const horizontaLine = () => {
    return <View style={styles.horizontaLine} />;
  };

  const onPressSelectMedia = item => {
    setShowModal(true);
    setSelectedMedia(item);
  };

  const renderPosts = ({item}) => {
    if (item.isEmpty) {
      return <View style={[styles.emptyContent, styles.content]} />;
    }

    return (
      <TouchableOpacity
        style={[styles.content, styles.s6]}
        onPress={() => onPressSelectMedia(item)}>
        <FastImage
          source={{uri: item.uri, priority: FastImage.priority.high}}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.contentImage}
        />
        {item.type === 'video/mp4' && (
          <View
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons
              name="play-circle-outline"
              size={Responsive(30)}
              color={Colors.white}
            />
          </View>
        )}
      </TouchableOpacity>
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

  const renderFollowersAndPosts = () => {
    return (
      <View style={styles.s7}>
        <Text
          style={[
            mediumTextStyle,
            {color: Colors.primaryLightColor, marginLeft: Responsive(10)},
          ]}>
          Followers{' '}
          <Text style={({color: Colors.textGrayColor}, mediumTextStyle)}>
            {Math.floor(Math.random() * 10000)}
          </Text>
        </Text>
        <Text
          style={[
            mediumTextStyle,
            {color: Colors.primaryLightColor, marginLeft: Responsive(10)},
          ]}>
          Posts{' '}
          <Text style={({color: Colors.textGrayColor}, mediumTextStyle)}>
            {userPosts.map(ele => ele.imageArray).flat().length}
          </Text>
        </Text>
      </View>
    );
  };

  const onPressEdit = () => {
    navigation.navigate(Screens.ProfileSettingScreen);
  };

  const renderEditIcon = () => {
    return (
      <TouchableOpacity style={styles.editIconContainer} onPress={onPressEdit}>
        <MaterialIcons
          name="edit"
          size={Responsive(15)}
          color={Colors.primaryColor}
        />
      </TouchableOpacity>
    );
  };

  const renderMedia = () => {
    if (!!selectedMedia) {
      if (selectedMedia.type === 'video/mp4') {
        return <VideoPlayer item={selectedMedia} />;
      } else {
        return (
          <FastImage
            source={{uri: selectedMedia.uri, priority: FastImage.priority.high}}
            resizeMode={FastImage.resizeMode.contain}
            style={{height: '100%', width: '100%'}}
          />
        );
      }
    }
  };

  const renderModal = () => {
    return (
      <View style={styles.centeredView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <AntDesign
              name="closecircle"
              size={Responsive(20)}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>{renderMedia()}</View>
      </View>
    );
  };
  return (
    <CommonScreen mainContainerStyle={styles.mainContainer}>
      <HeaderComponent isHeader={true} screenName={'Profile'} isBackButton />
      <View style={styles.mainContainer2}>
        <View style={styles.profileContainer}>
          {renderEditIcon()}
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
                {!!profile.userName && info('user name', profile.userName)}
                {!!profile.birthDate && info('birth date', profile.birthDate)}
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
            {!!profile.desc && (
              <View>
                <Text
                  style={[infoTextStyle, {color: Colors.primaryLightColor}]}>
                  bio
                </Text>
                <Text style={[styles.bioText, regularTextStyle]}>
                  {profile.desc}
                </Text>
              </View>
            )}
          </View>
        </View>
        {renderFollowersAndPosts()}
        {horizontaLine()}
        <View>
          <FlatList
            data={formattedPosts(userPosts)}
            keyExtractor={item => item.id.toString()}
            renderItem={renderPosts}
            numColumns={3}
            ListHeaderComponent={flHeader}
            style={styles.flatlistStyle}
            ListEmptyComponent={emptyComponent}
          />
        </View>
      </View>
      <Modal animationType="slide" visible={showModal}>
        {renderModal()}
      </Modal>
    </CommonScreen>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    width: '90%',
    alignSelf: 'center',
    marginTop: Responsive(20),
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  centeredView: {backgroundColor: '#0A0404', flex: 1},
  editIconContainer: {
    backgroundColor: Colors.white,
    height: Responsive(20),
    width: Responsive(20),
    borderRadius: Responsive(15),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: Responsive(2),
    position: 'absolute',
    right: Responsive(-5),
    top: Responsive(-5),
  },
  horizontaLine: {
    width: '100%',
    height: Responsive(2),
    backgroundColor: Colors.borderGray,
    marginTop: Responsive(15),
  },
  s7: {
    width: '100%',
    marginTop: Responsive(10),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
    height: Responsive(35),
    width: Responsive(35),
    borderRadius: Responsive(20),
  },
  s2: {marginTop: Responsive(10)},
  addMediaButtons: {
    borderColor: Colors.primaryColor,
    width: Responsive(100),
    marginRight: Responsive(10),
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
  s5: {flexDirection: 'row'},
  s6: {
    borderWidth: Responsive(2),
    borderColor: Colors.black,
    marginRight: Responsive(2),
    marginBottom: Responsive(2),
    borderRadius: Responsive(5),
    backgroundColor: '#0A0404',
  },
});

const VideoPlayer = memo(({item}) => {
  const videoRef = useRef(null);
  return (
    <View style={[styles.content]}>
      <Video
        source={{uri: item.uri}}
        controls={true}
        repeat
        ref={videoRef}
        paused={false}
        resizeMode="contain"
        style={{flex: 1}}
        removeClippedSubviews={true}
      />
    </View>
  );
});
