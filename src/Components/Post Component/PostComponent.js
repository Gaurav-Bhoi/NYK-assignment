import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Responsive} from '../../Assets/Responsive';
import {infoTextStyle, regularTextStyle} from '../../CommonStyles/CommonStyles';
import Colors from '../../Assets/Colors';
import FastImage from 'react-native-fast-image';
import PaginationDot from 'react-native-insta-pagination-dots';
import {Images} from '../../Assets/ImageIndex';

const PostComponent = React.memo(({item}) => {
  const [currIndex, setCurrIndex] = useState(0);
  const width = Dimensions.get('screen').width;
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 70});

  useEffect(() => {
    handleImagePreload();
  }, [handleImagePreload]);

  const handleImagePreload = useCallback(() => {
    const data = item?.imageArray?.map(ele => JSON.parse(ele));
    FastImage.preload(data);
  }, [item?.imageArray]);

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
            style={styles.corouselContainer}
            renderItem={({item, index}) => {
              return <CorouselImage newImage={item} width={width} />;
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
  s5: {height: '100%', borderRadius: Responsive(5)},
});

const CorouselImage = React.memo(({newImage, width}) => {
  const [isError, setIsError] = useState(false);

  const onError = useCallback(() => {
    setIsError(true);
  }, [setIsError]);

  return (
    <FastImage
      style={[{width: width}, styles.s5]}
      source={
        !isError
          ? {
              uri: JSON.parse(newImage).uri,
              priority: FastImage.priority.high,
            }
          : Images.noImage
      }
      resizeMode={FastImage.resizeMode.contain}
      onError={onError}
    />
  );
});
