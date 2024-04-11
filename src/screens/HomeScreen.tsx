import React from 'react';
import {FlatList} from 'react-native';

import posts from '../assets/data/posts.json';
import {FeedPost} from '../components';

const HomeScreen = () => {
  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <FeedPost post={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HomeScreen;
