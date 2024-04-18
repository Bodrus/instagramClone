import React, {useCallback, useState} from 'react';
import {FlatList, ViewToken} from 'react-native';

import posts from '../../assets/data/posts.json';
import FeedPost from '../../components/FeedPost';

const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 60, // Trigger on at least 51% of the item being visible
  };

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0) {
        setActivePostId(viewableItems[0].key);
      }
    },
    [],
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id.toString()}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
      renderItem={({item}) => (
        <FeedPost post={item} isVisible={activePostId === item.id} />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HomeScreen;
