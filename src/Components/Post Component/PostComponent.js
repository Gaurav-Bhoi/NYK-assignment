import {
  Alert,
  Dimensions,
  Image,
  InteractionManager,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Responsive} from '../../Assets/Responsive';
import {infoTextStyle, regularTextStyle} from '../../CommonStyles/CommonStyles';
import Colors from '../../Assets/Colors';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import PaginationDot from 'react-native-insta-pagination-dots';

const PostComponent = React.memo(({item}) => {
  const [newDimensions, setNewDimensions] = useState({
    height: 300,
    width: Dimensions.get('screen').width,
  });

  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    getNewDimensions(0);
  }, [getNewDimensions]);

  const getNewDimensions = useCallback(
    index => {
      InteractionManager.runAfterInteractions(() => {
        setCurrIndex(index);
        const imageUri = item.imageArray[index];
        Image.getSize(imageUri, (width, height) => {
          const aspectRatio = height / width;
          const newHeight = newDimensions.width * aspectRatio;
          setNewDimensions({...newDimensions, height: newHeight});
        });
      });
    },
    [item.imageArray, newDimensions],
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

        {newDimensions.width > 0 && (
          <>
            <Carousel
              loop={false}
              width={newDimensions.width}
              height={newDimensions.height}
              pagingEnabled
              style={styles.s4}
              onSnapToItem={index => getNewDimensions(index)}
              removeClippedSubviews={true}
              data={item.imageArray}
              windowSize={1}
              renderItem={({item, index}) => {
                return (
                  <CorouselImage newImage={item} width={newDimensions.width} />
                );
              }}
            />
          </>
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
    marginBottom: Responsive(10),
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
  }, []);

  const onLoad = useCallback(() => {
    setIsError(false);
  }, []);

  return (
    <FastImage
      style={[{width: width}, styles.s5]}
      source={{
        uri: !isError ? newImage : `https://picsum.photos/400/300`,
        priority: FastImage.priority.high,
      }}
      resizeMode={FastImage.resizeMode.contain}
      onError={onError}
      onLoad={onLoad}
    />
  );
});
