import React from 'react';
import {FlatList, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import data from '../../assets/data/comments.json';
import {Comment} from '../../components';
import {useState} from 'react';
import colors from '../../theme/colors.ts';
import fonts from '../../theme/fonts.ts';

const CommentsScreen = () => {
  const [value, onChangeText] = useState('');
  return (
    <View style={styles.container}>
      <View style={{paddingLeft: 10}}>
        <FlatList
          data={data}
          style={{marginBottom: 70}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return <Comment comment={item} fullDetails={true} />;
          }}
        />
      </View>
      <View style={styles.footer}>
        <Image
          source={{
            uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
          }}
          style={styles.image}
        />
        <TextInput
          placeholder="Write your comment ..."
          editable
          multiline
          onChangeText={onChangeText}
          value={value}
          style={styles.input}
        />
        <Text style={styles.button}>Post</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  footer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.white,
    width: '100%',
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  image: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    flex: 1,
    borderColor: colors.border,
    borderRadius: 25,
    marginLeft: 5,
    paddingRight: 50,
  },
  button: {
    position: 'absolute',
    right: 15,
    bottom: 17,
    fontSize: fonts.size.s,
    fontWeight: fonts.weight.full,
    color: colors.primary,
  },
});

export default CommentsScreen;
