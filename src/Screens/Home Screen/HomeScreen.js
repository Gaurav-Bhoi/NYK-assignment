import {FlatList, InteractionManager, StyleSheet, View} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {posts} from '../../Assets/Const';
import PostComponent from '../../Components/Post Component/PostComponent';
import HeaderComponent from '../../Components/Header Component/HeaderComponent';

const HomeScreen = () => {
  return (
    <View style={styles.flatlistContainer}>
      <HeaderComponent isHeader isAppLogo isSearchBar />
      <FlatList
        data={posts}
        renderItem={({item}) => <RenderItem item={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.mainContainerStyle}
        showsVerticalScrollIndicator={false}
        disableVirtualization={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        removeClippedSubviews={true}
        windowSize={5}
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
