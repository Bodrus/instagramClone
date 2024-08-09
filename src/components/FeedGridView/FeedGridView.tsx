import React from 'react';

import {FlatList} from 'react-native';
import FeedGridItem from './FeedGridItem.tsx';
import {Post} from '../../API.ts';

interface FeedGridViewProps {
  data: Post[];
  ListHeaderComponent:
    | React.ComponentType<any>
    | React.ReactElement<unknown>
    | null
    | undefined;
}

const FeedGridView = ({data, ListHeaderComponent}: FeedGridViewProps) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      numColumns={3}
      style={{marginRight: -2}}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={({item}) => <FeedGridItem item={item} />}
    />
  );
};

export default FeedGridView;
