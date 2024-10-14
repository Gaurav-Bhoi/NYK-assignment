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
import {
  mediumTextStyle,
  regularTextStyle,
} from '../../CommonStyles/CommonStyles';

const CreatePostScreen = () => {
  const [submitPressed, setSubmitPressed] = useState(false);
  const [mediaData, setMediaData] = useState(undefined);
  const [currIndex, setCurrIndex] = useState(0);

  const postCreationValidationSchema = yup.object().shape({
    postTitle: yup.string().required('Title for the is required'),
    postDesc: yup.string().required('Description for the post is required'),
  });

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 70});

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
    console.log(pickResult);
    setMediaData(pickResult);
  };

  const renderMedia = ({item}) => {
    return (
      <Image
        source={{uri: item.uri}}
        style={styles.image}
        resizeMode="contain"
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
          onSubmit={values => {}}>
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

                  {!!mediaData && (
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
  },
  image: {height: Responsive(200), width: Dimensions.get('screen').width},
  flatlistStyle: {
    width: Dimensions.get('screen').width,
    height: 200,
    backgroundColor: Colors.white,
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
