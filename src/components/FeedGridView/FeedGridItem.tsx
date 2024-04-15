import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {IPost} from '../../types/models.ts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../theme/colors.ts';

interface FeedGridItemProps {
  item: IPost;
}

const FeedGridItem = ({item}: FeedGridItemProps) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{uri: item?.image || item?.images?.[0]}}
        style={styles.image}
      />
      {item.images && (
        <MaterialIcons
          name="collections"
          size={16}
          color={colors.white}
          style={styles.collectionsIcon}
        />
      )}
    </View>
  );
};

export default FeedGridItem;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    marginRight: 1,
    marginBottom: 1,
    maxWidth: '33%',
  },
  image: {
    flex: 1,
  },
  collectionsIcon: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
});
