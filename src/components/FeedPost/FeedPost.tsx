import {Image, Pressable, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import styles from './styles.ts';

import colors from '../../theme/colors.ts';
import DoublePressable from '../DoublePressable';
import Carousel from '../Carousel';
import VideoPlayer from '../VideoPlayer';
import Comment from '../Comment';
import {FeedNavigationProp} from '../../types/navigation.ts';
import {Post} from '../../API.ts';
import {DEFAULT_USER_IMAGE} from '../../config';

interface FeedPostProps {
  post: Post;
  isVisible: boolean;
}

const FeedPost = ({post, isVisible}: FeedPostProps) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const navigation = useNavigation<FeedNavigationProp>();

  const toggleDescriptionExpanded = () => setIsDescriptionExpanded(v => !v);
  const toggleLiked = () => setIsLiked(v => !v);

  const navigateToUser = () => {
    if (post.User) {
      navigation.navigate('UserProfile', {userId: post.User.id});
    }
  };

  const goToAllComments = () =>
    navigation.navigate('Comments', {postId: post.id});

  let content;
  if (post.image) {
    content = (
      <DoublePressable onDoublePress={toggleLiked}>
        <Image
          source={{
            uri: post.image,
          }}
          style={styles.image}
        />
      </DoublePressable>
    );
  } else if (post.images) {
    content = <Carousel images={post.images} toggleLiked={toggleLiked} />;
  } else if (post.video) {
    content = (
      <DoublePressable onDoublePress={toggleLiked}>
        <VideoPlayer uri={post.video} paused={!isVisible} />
      </DoublePressable>
    );
  }

  return (
    <View>
      <View style={styles.header}>
        <Pressable onPress={navigateToUser}>
          <Image
            source={{
              uri: post.User?.image || DEFAULT_USER_IMAGE,
            }}
            style={styles.userAvatar}
          />
        </Pressable>
        <Text style={styles.userName}>{post.User?.username}</Text>
        <Entypo
          name="dots-three-horizontal"
          style={styles.threeDots}
          size={16}
        />
      </View>
      {content}
      {/*footer*/}
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <Pressable onPress={toggleLiked}>
            <AntDesign
              name={isLiked ? 'heart' : 'hearto'}
              size={24}
              style={styles.icon}
              color={isLiked ? colors.accent : colors.black}
            />
          </Pressable>
          <Ionicons name="chatbubble-outline" size={24} style={styles.icon} />
          <Feather name="send" size={24} style={styles.icon} />
          <Feather name="bookmark" size={24} style={{marginLeft: 'auto'}} />
        </View>

        {/*Likes*/}
        <Text style={styles.text}>
          Liked by <Text style={styles.boldText}>lgrinevicius</Text> and{' '}
          <Text style={styles.boldText}>66 others</Text>
        </Text>

        {/*Post Description*/}
        <Text style={styles.text} numberOfLines={isDescriptionExpanded ? 3 : 0}>
          <Text style={styles.boldText}>{post.User?.username}</Text>{' '}
          {post.description}
        </Text>
        <Text style={styles.textGrey} onPress={toggleDescriptionExpanded}>
          {isDescriptionExpanded ? 'more' : 'less'}
        </Text>
        <Text style={styles.textGrey} onPress={goToAllComments}>
          View all 16 comments
        </Text>
        {(post.Comments?.items || []).map(
          el => el && <Comment key={el.id} comment={el} />,
        )}

        <Text style={styles.textGrey}>{post.createdAt}</Text>
      </View>
    </View>
  );
};

export default FeedPost;
