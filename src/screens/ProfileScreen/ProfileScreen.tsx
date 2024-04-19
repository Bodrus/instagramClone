import React from 'react';

import user from '../../assets/data/user.json';
import ProfileHeader from './ProfileHeader.tsx';
import FeedGridView from '../../components/FeedGridView';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  MyProfileRouteProp,
  MyProfileScreenProp,
  UserProfileNavigationProp,
  UserProfileRouteProp,
} from '../../navigation/types.ts';

const ProfileScreen = () => {
  const navigation = useNavigation<
    UserProfileNavigationProp | MyProfileScreenProp
  >();
  const route = useRoute<UserProfileRouteProp | MyProfileRouteProp>();

  const userId = route.params?.userId;

  navigation.setOptions({title: userId});

  return <FeedGridView data={user.posts} ListHeaderComponent={ProfileHeader} />;
};

export default ProfileScreen;
