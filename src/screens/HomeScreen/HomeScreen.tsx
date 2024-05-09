import React, {useCallback, useState} from 'react';
import {ActivityIndicator, FlatList, View, ViewToken} from 'react-native';
import {useQuery} from '@apollo/client';

import FeedPost from '../../components/FeedPost';
import {ListPostsQuery, ListPostsQueryVariables} from '../../API.ts';
import {listPosts} from './queries.ts';
import ApiErrorMessage from '../../components/ApiErrorMessage';

const HomeScreen = () => {
  const {data, loading, error} = useQuery<
    ListPostsQuery,
    ListPostsQueryVariables
  >(listPosts, {variables: {limit: 3}});
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 60, // Trigger on at least 51% of the item being visibleviewAreaCoveragePercentThreshold
  };

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0) {
        setActivePostId(viewableItems[0].key);
      }
    },
    [],
  );

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <ApiErrorMessage title="Error fetching posts" message={error.message} />
    );
  }

  const posts = data?.listPosts?.items || [];

  return (
    <FlatList
      data={posts}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
      renderItem={({item}) =>
        item && <FeedPost post={item} isVisible={activePostId === item.id} />
      }
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HomeScreen;
