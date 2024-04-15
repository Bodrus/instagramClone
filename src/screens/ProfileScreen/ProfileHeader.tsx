import React from 'react';

import user from '../../assets/data/user.json';
import {Image, StyleSheet, Text, View} from 'react-native';
import fonts from '../../theme/fonts.ts';
import colors from '../../theme/colors.ts';
import {Button} from '../../components';

const ProfileHeader = () => {
  const handleEditPress = () => {};
  const handleAnotherPress = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{uri: user.image}} style={styles.avatar} />
        <View style={styles.userInfo}>
          <View style={styles.userInfoBlock}>
            <Text style={styles.infoValue}>98</Text>
            <Text style={styles.infoKey}>Posts</Text>
          </View>

          <View style={styles.userInfoBlock}>
            <Text style={styles.infoValue}>2.919</Text>
            <Text style={styles.infoKey}>Followers</Text>
          </View>

          <View style={styles.userInfoBlock}>
            <Text style={styles.infoValue}>245</Text>
            <Text style={styles.infoKey}>Following</Text>
          </View>
        </View>
      </View>

      <View style={styles.bio}>
        <Text style={styles.infoValue}>{user.name}</Text>
        <Text style={styles.infoKey}>{user.bio}</Text>
      </View>

      <View style={styles.buttons}>
        <Button onPress={handleEditPress} title="Edit Profile" />
        <Button onPress={handleAnotherPress} title="Another Button" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  avatar: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
    marginRight: 40,
  },
  userInfo: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  userInfoBlock: {
    alignItems: 'center',
  },
  infoValue: {
    fontWeight: fonts.weight.bold,
  },
  infoKey: {
    color: colors.grey,
  },
  bio: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    marginRight: 1,
    marginBottom: 1,
    maxWidth: '33%',
  },
});

export default ProfileHeader;
