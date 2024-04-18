import React, {useCallback, useState} from 'react';

import {Dimensions, FlatList, Image, View, ViewToken} from 'react-native';
import colors from '../../theme/colors.ts';
import DoublePressable from "../DoublePressable";

interface CarouselProps {
  images?: string[];
  toggleLiked: () => void;
}
const Carousel = ({images, toggleLiked}: CarouselProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const screenDimensions = Dimensions.get('screen');

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 51, // Trigger on at least 51% of the item being visible
  };

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0) {
        setSelectedImageIndex(viewableItems[0].index || 0);
      }
    },
    [],
  );

  if (!images) {
    return null;
  }

  return (
    <View>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        viewabilityConfig={viewabilityConfig}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <DoublePressable onDoublePress={toggleLiked}>
              <Image
                source={{uri: item}}
                style={{
                  width: screenDimensions.width,
                  aspectRatio: 1,
                }}
              />
            </DoublePressable>
          );
        }}
      />
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 5,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        {images &&
          images.length > 0 &&
          images.map((el, index) => (
            <View
              key={index}
              style={{
                width: 10,
                height: 10,
                backgroundColor:
                  index === selectedImageIndex
                    ? colors.lightgrey
                    : colors.white,
                marginRight: 7,
                borderRadius: 10,
              }}
            />
          ))}
      </View>
    </View>
  );
};

export default Carousel;
