import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Responsive} from '../../Assets/Responsive';
import {infoTextStyle, regularTextStyle} from '../../CommonStyles/CommonStyles';
import Colors from '../../Assets/Colors';
import FastImage from 'react-native-fast-image';
import PaginationDot from 'react-native-insta-pagination-dots';
import {Images} from '../../Assets/ImageIndex';
import Share from 'react-native-share';
import {createImageProgress} from 'react-native-image-progress';
const NewFastImage = createImageProgress(FastImage);

const PostComponent = React.memo(({item}) => {
  const [currIndex, setCurrIndex] = useState(0);
  const width = Dimensions.get('screen').width;
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 100});

  useEffect(() => {
    handleImagePreload();
  }, [handleImagePreload]);

  const handleImagePreload = useCallback(() => {
    FastImage.preload(item.imageArray);
  }, [item?.imageArray]);

  const onViewCallBack = useCallback(
    item => {
      try {
        const index = item?.viewableItems[0]?.index;
        setCurrIndex(index);
      } catch {}
    },
    [setCurrIndex],
  );
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerComponent}>
        <Image
          source={{uri: item?.profilePic}}
          style={styles.profilePic}
          resizeMode="contain"
        />
        <View style={styles.s1}>
          <Text style={[regularTextStyle, styles.userName]}>
            {item.userName}
          </Text>
          <Text style={[regularTextStyle]}>{item.postDates}</Text>
        </View>
      </View>
      <View style={styles.postImageContainer}>
        {!!item.title && (
          <Text style={[regularTextStyle, styles.s3]}>{item.title}</Text>
        )}
        {!!item.description && (
          <Text style={[infoTextStyle, styles.s2]}>{item.description}</Text>
        )}

        {width > 0 && (
          <FlatList
            horizontal
            removeClippedSubviews={true}
            windowSize={3}
            disableVirtualization={false}
            data={item.imageArray}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            viewabilityConfig={viewConfigRef.current}
            onViewableItemsChanged={onViewCallBack}
            initialNumToRender={1}
            maxToRenderPerBatch={10}
            style={styles.corouselContainer}
            renderItem={({item, index}) => {
              return (
                <CorouselImage
                  newImage={item}
                  width={width}
                  index={index}
                  currIndex={currIndex}
                />
              );
            }}
          />
        )}
      </View>
      <PaginationDot
        activeDotColor={Colors.primaryColor}
        curPage={currIndex}
        maxPage={item.imageArray.length}
      />
    </View>
  );
});

export default PostComponent;

const styles = StyleSheet.create({
  profilePic: {
    height: Responsive(40),
    width: Responsive(40),
    borderRadius: Responsive(20),
  },
  corouselContainer: {
    width: Dimensions.get('screen').width,
    height: Responsive(300),
  },
  s4: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  s3: {
    color: Colors.primaryColor,
    fontSize: Responsive(11),
    width: '95%',
    alignSelf: 'center',
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Responsive(20),
    width: '100%',
  },
  headerComponent: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '95%',
    flexDirection: 'row',
  },
  s1: {marginLeft: Responsive(10)},
  userName: {color: Colors.primaryColor, fontSize: Responsive(12)},
  postImageContainer: {
    marginTop: Responsive(10),
    marginBottom: Responsive(5),
    width: '100%',
  },
  s2: {marginBottom: Responsive(10), marginHorizontal: Responsive(10)},
  s5: {height: '100%'},
  s6: {
    flexDirection: 'row',
    marginRight: Responsive(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  s7: {
    backgroundColor: Colors.white,
    paddingHorizontal: Responsive(10),
    paddingVertical: Responsive(2.5),
    borderRadius: Responsive(15),
  },
  s8: {
    flexDirection: 'row',
    position: 'absolute',
    right: Responsive(10),
    bottom: Responsive(15),
  },
});

const CorouselImage = React.memo(({newImage, width, index, currIndex}) => {
  const [isError, setIsError] = useState(false);
  const [imageData, setImageData] = useState(newImage);
  const [openEngagement, setOpenEngagement] = useState(true);
  const [lastTap, setLastTap] = useState(null);
  const timeoutRef = useRef(null);

  const onError = useCallback(() => {
    setIsError(true);
  }, []);

  const onPressLike = useCallback(() => {
    if (imageData?.status !== 'liked') {
      setImageData({
        ...imageData,
        status: 'liked',
        likes: imageData.likes + 1,
      });
    } else if (imageData?.status === 'liked') {
      setImageData({
        ...imageData,
        status: undefined,
        likes: imageData.likes - 1,
      });
    }
  }, [imageData]);

  const onPressUnlike = () => {
    if (imageData?.status !== 'disliked') {
      setImageData({
        ...imageData,
        status: 'disliked',
        dislikes: imageData.dislikes + 1,
      });
    } else if (imageData?.status === 'disliked') {
      setImageData({
        ...imageData,
        status: undefined,
        dislikes: imageData.dislikes - 1,
      });
    }
  };

  const onPressShare = async () => {
    const shareOptions = {
      title: 'Share via',
      message: 'Check this out!',
      url: imageData.uri,
      social: Share.Social.WHATSAPP,
    };
    try {
      const shareResponse = await Share.open(shareOptions);
      console.log('Share successful:', shareResponse);
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const onPressDoubleTap = useCallback(() => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (lastTap && now - lastTap < DOUBLE_TAP_DELAY) {
      setOpenEngagement(true);
      onPressLike();
      setLastTap(null);
    } else {
      setLastTap(now);
      setTimeout(() => {
        setLastTap(null);
        setOpenEngagement(!openEngagement);
      }, DOUBLE_TAP_DELAY);
    }
  }, [lastTap, onPressLike, openEngagement]);

  return (
    <View style={[{width: width}, styles.s5]}>
      <TouchableWithoutFeedback onPress={onPressDoubleTap}>
        <View
          style={[
            {position: 'absolute', width: width, backgroundColor: 'red'},
            styles.s5,
          ]}>
          <NewFastImage
            indicatorProps={{
              size: 80,
              borderWidth: 0,
              color: Colors.primaryColor,
            }}
            style={[
              {
                width: width,
                backgroundColor: !isError ? '#0A0404' : Colors.white,
              },
              styles.s5,
            ]}
            source={
              !isError
                ? {
                    uri: imageData.uri,
                    priority: FastImage.priority.high,
                    cache: FastImage.cacheControl.immutable,
                  }
                : Images.noImage
            }
            resizeMode={FastImage.resizeMode.contain}
            onError={onError}
          />
          {!isError && currIndex === index && openEngagement && (
            <View style={styles.s8}>
              <TouchableOpacity
                style={[styles.s6, styles.s7]}
                onPress={onPressLike}>
                {imageData.status === 'liked' ? (
                  <AntDesign
                    name="like1"
                    size={Responsive(20)}
                    color={Colors.like}
                  />
                ) : (
                  <AntDesign
                    name="like2"
                    size={Responsive(20)}
                    color={Colors.like}
                  />
                )}
                <Text style={{marginLeft: Responsive(5)}}>
                  {imageData.likes}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.s6, styles.s7]}
                onPress={onPressUnlike}>
                {imageData.status === 'disliked' ? (
                  <AntDesign
                    name="dislike1"
                    size={Responsive(20)}
                    color={Colors.unlike}
                  />
                ) : (
                  <AntDesign
                    name="dislike2"
                    size={Responsive(20)}
                    color={Colors.unlike}
                  />
                )}
                <Text style={{marginLeft: Responsive(5)}}>
                  {imageData.dislikes}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.s6} onPress={onPressShare}>
                <AntDesign
                  name="sharealt"
                  size={Responsive(20)}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
});
