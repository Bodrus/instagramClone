import React from 'react';
import {Image, Text, View} from 'react-native';
import {signOut} from 'aws-amplify/auth';
import {useNavigation} from '@react-navigation/native';

import styles from './styles.ts';
import Button from '../../components/Button';
import {ProfileNavigationProp} from '../../types/navigation.ts';
import {User} from '../../API.ts';
import {DEFAULT_USER_IMAGE} from '../../config';

interface ProfileHeaderProps {
  user: User;
}
const ProfileHeader = ({user}: ProfileHeaderProps) => {
  const navigation = useNavigation<ProfileNavigationProp>();

  const handleEditPress = () => navigation.navigate('Edit Profile');

  const handleSignOut = async () => {
    try {
      await signOut();
      // navigation.navigate('Auth');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{uri: user?.image || DEFAULT_USER_IMAGE}}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <View style={styles.userInfoBlock}>
            <Text style={styles.infoValue}>{user.nofPosts}</Text>
            <Text style={styles.infoKey}>Posts</Text>
          </View>

          <View style={styles.userInfoBlock}>
            <Text style={styles.infoValue}>{user.nofFollowers}</Text>
            <Text style={styles.infoKey}>Followers</Text>
          </View>

          <View style={styles.userInfoBlock}>
            <Text style={styles.infoValue}>{user.nofFollowing}</Text>
            <Text style={styles.infoKey}>Following</Text>
          </View>
        </View>
      </View>

      <View style={styles.bio}>
        <Text style={styles.infoValue}>{user.name}</Text>
        <Text style={styles.infoKey}>{user.bio}</Text>
      </View>

      <View style={styles.buttons}>
        <Button onPress={handleEditPress} title="Edit Profile" inline />
        <Button onPress={handleSignOut} title="Sign-out" inline />
      </View>
    </View>
  );
};

export default ProfileHeader;
