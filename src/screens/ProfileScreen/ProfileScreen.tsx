import React from 'react';

import user from '../../assets/data/user.json';
import ProfileHeader from './ProfileHeader.tsx';
import FeedGridView from '../../components/FeedGridView';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  MyProfileRouteProp,
  MyProfileNavigationProp,
  UserProfileNavigationProp,
  UserProfileRouteProp,
} from '../../types/navigation.ts';

const ProfileScreen = () => {
  const navigation = useNavigation<
    UserProfileNavigationProp | MyProfileNavigationProp
  >();
  const route = useRoute<UserProfileRouteProp | MyProfileRouteProp>();

  const userId = route.params?.userId;

  navigation.setOptions({title: userId});

  return <FeedGridView data={user.posts} ListHeaderComponent={ProfileHeader} />;
};

export default ProfileScreen;
