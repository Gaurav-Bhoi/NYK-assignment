import {FlatList, InteractionManager, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {posts} from '../../Assets/Const';
import PostComponent from '../../Components/Post Component/PostComponent';
import {useDispatch, useSelector} from 'react-redux';
import {callApi} from '../../Helper/AxiosHelper';
import Colors from '../../Assets/Colors';

const HomeScreen = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const data = useSelector(state => state.post.otherUserPosts);
  const [updatedPosts, setUpdatedPosts] = useState([]);

  useEffect(() => {
    getPostsLocally();
  }, [getPostsLocally, page]);

  const getPostsLocally = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      let newPosts = posts.slice((page - 1) * 10, 10 * page);
      setUpdatedPosts([...updatedPosts, ...newPosts]);
    });
  }, [page, updatedPosts]);

  const onEndReached = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const renderItem = useCallback(({item}) => {
    return <PostComponent item={item} />;
  }, []);

  return (
    <View style={styles.flatlistContainer}>
      <FlatList
        data={updatedPosts}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        removeClippedSubviews={true}
        windowSize={5}
        renderItem={renderItem}
        keyExtractor={item => item.userName}
        contentContainerStyle={styles.mainContainerStyle}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        disableVirtualization={false}
        onEndReachedThreshold={0.5}
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
