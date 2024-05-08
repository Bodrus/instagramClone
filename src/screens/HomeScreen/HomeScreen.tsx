import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, ViewToken} from 'react-native';
import {generateClient} from 'aws-amplify/api';

import FeedPost from '../../components/FeedPost';
import * as APITypes from '../../API.ts';
import {GeneratedQuery} from '../../graphql/queries.ts';
import {Post} from '../../API.ts';

export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        image
        images
        video
        nofComments
        nofLikes
        userID
        createdAt
        updatedAt
        __typename
        User {
          id
          name
          username
          image
        }
        Comments {
          items {
            id
            comment
            User {
              id
              username
              name
            }
          }
        }
      }
      nextToken
      __typename
    }
  }
` as GeneratedQuery<APITypes.ListPostsQueryVariables, APITypes.ListPostsQuery>;

const HomeScreen = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 60, // Trigger on at least 51% of the item being visibleviewAreaCoveragePercentThreshold
  };

  useEffect(() => {
    const client = generateClient();
    const fetchPosts = async () => {
      try {
        const result = await client.graphql({query: listPosts});
        setPosts(result.data.listPosts.items);
      } catch (e) {
        console.log('ERROR RECORDING', e);
      }
    };
    fetchPosts();
  }, []);

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
