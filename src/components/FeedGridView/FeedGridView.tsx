import React from 'react';

import {FlatList} from 'react-native';
import {IPost} from '../../types/models.ts';
import FeedGridItem from './FeedGridItem.tsx';

interface FeedGridViewProps {
  data: IPost[];
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
