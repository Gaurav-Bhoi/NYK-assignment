import {FlatList, InteractionManager, StyleSheet, View} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {posts} from '../../Assets/Const';
import PostComponent from '../../Components/Post Component/PostComponent';
import HeaderComponent from '../../Components/Header Component/HeaderComponent';

const HomeScreen = () => {
  const [page, setPage] = useState(1);
  const [updatedPosts, setUpdatedPosts] = useState([]);

  useEffect(() => {
    getPostsLocally();
  }, [getPostsLocally, page]);

  const getPostsLocally = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      let newPosts = posts.slice((page - 1) * 5, 5 * page);
      setUpdatedPosts([...updatedPosts, ...newPosts]);
    });
  }, [page, updatedPosts]);

  const onEndReached = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  return (
    <View style={styles.flatlistContainer}>
      <HeaderComponent isHeader isAppLogo isSearchBar />
      <FlatList
        data={updatedPosts}
        renderItem={({item}) => <RenderItem item={item} />}
        keyExtractor={Math.random}
        contentContainerStyle={styles.mainContainerStyle}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        disableVirtualization={false}
        initialNumToRender={1}
        maxToRenderPerBatch={3}
        removeClippedSubviews={true}
        windowSize={3}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  flatlistContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

const RenderItem = memo(({item}) => <PostComponent item={item} />);
