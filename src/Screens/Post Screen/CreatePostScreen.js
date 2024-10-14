import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import PaginationDot from 'react-native-insta-pagination-dots';
import React, {useCallback, useRef, useState} from 'react';
import CommonScreen from '../../Components/CommonScreen/CommonScreen';
import HeaderComponent from '../../Components/Header Component/HeaderComponent';
import {Formik} from 'formik';
import TextInput1 from '../../Components/TextInput/TextInput1';
import Button1 from '../../Components/Button/Button1';
import * as yup from 'yup';
import {Responsive} from '../../Assets/Responsive';
import Colors from '../../Assets/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {pick, types} from 'react-native-document-picker';
import Image from 'react-native-fast-image';
import Video, {VideoRef} from 'react-native-video';
import {
  mediumTextStyle,
  regularTextStyle,
} from '../../CommonStyles/CommonStyles';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {AllActions} from '../../Store/actionIndex';
import Screens from '../screenIndex';

const CreatePostScreen = ({navigation}) => {
  const [submitPressed, setSubmitPressed] = useState(false);
  const [mediaData, setMediaData] = useState([]);
  const userDetails = useSelector(state => state.user.userDetails);
  const [currIndex, setCurrIndex] = useState(0);
  const [videoStatus, setVideoStatus] = useState(false);
  const videoRef = useRef(null);
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 70});
  const dispatch = useDispatch();
  const postCreationValidationSchema = yup.object().shape({
    postTitle: yup.string().required('Title for the is required'),
    postDesc: yup.string().required('Description for the post is required'),
  });

  const renderIcon = () => {
    return (
      <View style={styles.iconContainer}>
        <FontAwesome5
          name="photo-video"
          size={Responsive(17)}
          color={Colors.primaryColor}
        />
      </View>
    );
  };

  const handleAddMedia = async () => {
    const pickResult = await pick({
      allowMultiSelection: true,
      type: [types.video, types.images],
    });
    setMediaData(pickResult);
  };

  const renderMedia = ({item}) => {
    if (item.type === 'image/jpeg') {
      return (
        <View>
          <Image
            source={{uri: item.uri}}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      );
    }
    return (
      <Video
        source={{uri: item.uri}}
        controls={true}
        paused={videoStatus}
        resizeMode="contain"
        onError={e => console.log(e)}
        onBuffer={e => console.log('Buffering:', e)}
        style={styles.image}
      />
    );
  };

  const onViewCallBack = useCallback(
    item => {
      const index = item?.viewableItems[0]?.index;
      if (index) {
        setCurrIndex(index);
      }
    },
    [setCurrIndex],
  );

  const onPressSubmit = values => {
    const post = {
      description: values.postDesc,
      imageArray: mediaData,
      postDates: moment().format('DD MMM YYYY, h:mm a'),
      profilePic: userDetails.profilePic,
      profileType: userDetails.profilePic,
      title: values.postTitle,
      userName: userDetails.userName,
    };

    dispatch({type: AllActions.SET_USERPOST_LIST, payload: post});
    navigation.navigate(Screens.HomeScreen);
  };

  return (
    <CommonScreen mainContainerStyle={styles.mainContainer}>
      <HeaderComponent
        isHeader={true}
        isBackButton
        screenName={'Create New Post'}
      />
      <View style={styles.formikContainer}>
        <Formik
          validateOnMount
          validationSchema={postCreationValidationSchema}
          initialValues={{postTitle: '', postDesc: ''}}
          onSubmit={onPressSubmit}>
          {({
            handleChange,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            isValid = false,
            handleBlur,
          }) => {
            return (
              <View style={styles.s1}>
                <View style={styles.s2}>
                  <TextInput1
                    infoText="Title"
                    buttonContainerStyle={[styles.buttonContainerStyle]}
                    configureTextChange={handleChange('postTitle')}
                    textValue={values.postTitle}
                    placeHolder={'Enter title for this post here'}
                  />

                  {submitPressed && errors.postTitle && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.postTitle}
                    </Text>
                  )}
                  <TextInput1
                    infoText="Description"
                    configureTextChange={handleChange('postDesc')}
                    buttonContainerStyle={styles.descStyle}
                    textValue={values.postDesc}
                    placeHolder={`Enter description for this post here . . .`}
                    mainContainer={styles.buttonContainerStyle2}
                    customTextStyle={styles.bioStyle}
                  />

                  {submitPressed && errors.postDesc && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.postDesc}
                    </Text>
                  )}
                  <Button1
                    title="Add Photos and Videos "
                    titleStyle={styles.titleStyle}
                    buttonContainerStyle={styles.addMediaButtons}
                    isIcon={true}
                    IconComponent={renderIcon}
                    configureOnPress={handleAddMedia}
                  />

                  {mediaData.length > 0 && (
                    <View style={styles.s3}>
                      <Text
                        style={[
                          regularTextStyle,
                          {color: Colors.primaryLightColor},
                        ]}>
                        Selected images and videos
                      </Text>
                      <FlatList
                        data={mediaData}
                        horizontal
                        pagingEnabled
                        viewabilityConfig={viewConfigRef.current}
                        onViewableItemsChanged={onViewCallBack}
                        renderItem={renderMedia}
                        keyExtractor={Math.random}
                        showsHorizontalScrollIndicator={false}
                        style={styles.flatlistStyle}
                        contentContainerStyle={styles.contentContStyle}
                      />
                      <PaginationDot
                        activeDotColor={Colors.primaryColor}
                        curPage={currIndex}
                        maxPage={mediaData.length}
                      />
                    </View>
                  )}
                </View>
                <Button1
                  title="Now Post This"
                  titleStyle={
                    isValid ? styles.titleStyle : styles.disabledStyle
                  }
                  buttonContainerStyle={
                    isValid ? styles.saveButton : styles.disabledStyle2
                  }
                  isDisabled={!isValid}
                  configureOnPress={handleSubmit}
                />
              </View>
            );
          }}
        </Formik>
      </View>
    </CommonScreen>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  s3: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Responsive(20),
    marginBottom: Responsive(10),
  },

  image: {height: Responsive(250), width: Dimensions.get('screen').width},
  flatlistStyle: {
    width: Dimensions.get('screen').width,
    height: Responsive(250),
    borderRadius: Responsive(5),
    shadowColor: Colors.black,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  mainContainer: {backgroundColor: ''},
  titleStyle: {color: Colors.primaryColor, marginLeft: Responsive(10)},
  disabledStyle: {color: Colors.buttonInActiveGray, marginLeft: Responsive(10)},
  s1: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '94%',
  },
  s2: {width: '100%'},
  saveButton: {borderColor: Colors.primaryColor},
  disabledStyle2: {borderColor: Colors.buttonInActiveGray},
  addMediaButtons: {
    borderColor: Colors.primaryColor,
    width: '100%',
    marginTop: Responsive(20),
  },
  contentContainerStyle: {
    height: '95%',
  },
  bioStyle: {
    textAlignVertical: 'top',
    height: '100%',
    paddingVertical: Responsive(5),
  },
  formikContainer: {
    width: '90%',
    alignSelf: 'center',
    height: Dimensions.get('screen').height - Responsive(150),
  },
  buttonContainerStyle: {marginBottom: Responsive(5)},
  descStyle: {height: Responsive(100)},
  buttonContainerStyle2: {marginTop: Responsive(10)},
});
