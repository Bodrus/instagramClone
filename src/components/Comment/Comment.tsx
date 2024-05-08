import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors.ts';
import React, {useState} from 'react';
import {Comment as CommentType} from '../../API.ts';

import fonts from '../../theme/fonts.ts';

interface CommentProps {
  comment: CommentType;
  fullDetails?: boolean;
}

const Comment = ({comment, fullDetails = false}: CommentProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLiked = () => setIsLiked(e => !e);
  return (
    <View style={styles.comment}>
      {fullDetails && comment.User?.image && (
        <Image source={{uri: comment.User.image}} style={styles.userImg} />
      )}
      <View style={styles.middle}>
        <Text style={styles.text}>
          <Text style={styles.boldText}>{comment.User?.username}</Text>{' '}
          {comment.comment}
        </Text>
        {fullDetails && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>2d</Text>
            <Text style={styles.footerText}>5 likes</Text>
            <Text style={styles.footerText}>Reply</Text>
          </View>
        )}
      </View>
      <Pressable onPress={toggleLiked} hitSlop={5}>
        <AntDesign
          name={isLiked ? 'heart' : 'hearto'}
          style={styles.icon}
          color={isLiked ? colors.accent : colors.black}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.black,
    lineHeight: 18,
  },
  boldText: {
    fontWeight: fonts.weight.bold,
  },
  icon: {
    marginRight: 10,
  },
  userImg: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
    marginRight: 5,
  },
  middle: {
    flex: 1,
    marginBottom: 10,
    paddingRight: 15,
  },
  footer: {
    flexDirection: 'row',
  },
  footerText: {
    marginRight: 5,
  },
});

export default Comment;
