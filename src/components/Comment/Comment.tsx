import {StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../theme/colors.ts';
import React from 'react';
import {IComment} from '../../types/models.ts';
import fonts from '../../theme/fonts.ts';

interface CommentProps {
  comment: IComment;
}

const Comment = ({comment}: CommentProps) => {
  return (
    <View style={styles.comment}>
      <Text style={styles.text}>
        <Text style={styles.boldText}>{comment.user.username}</Text>{' '}
        {comment.comment}
      </Text>
      <AntDesign name="hearto" style={styles.icon} color={colors.black} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    lineHeight: 18,
  },
  boldText: {
    fontWeight: fonts.weight.bold,
  },
  comment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
});

export default Comment;
