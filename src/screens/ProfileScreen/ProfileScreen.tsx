import React from 'react';
import {useQuery} from '@apollo/client';

import ProfileHeader from './ProfileHeader.tsx';
import FeedGridView from '../../components/FeedGridView';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  MyProfileRouteProp,
  MyProfileNavigationProp,
  UserProfileNavigationProp,
  UserProfileRouteProp,
} from '../../types/navigation.ts';
import {GetUserQuery, GetUserQueryVariables} from '../../API.ts';

import {getUser} from './queries.ts';
import {useAuthContext} from '../../context/AuthContext.tsx';
import {ActivityIndicator} from 'react-native';
import ApiErrorMessage from '../../components/ApiErrorMessage';

const ProfileScreen = () => {
  // const navigation = useNavigation<
  //   UserProfileNavigationProp | MyProfileNavigationProp
  // >();
  const route = useRoute<UserProfileRouteProp | MyProfileRouteProp>();
  const {user: authUser} = useAuthContext();

  const userId = route.params?.userId || authUser?.userId;

  const {data, loading, error} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {id: userId},
    },
  );

  const user = data?.getUser;

  // navigation.setOptions({title: userId});

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error || !user) {
    return (
      <ApiErrorMessage
        title="Error fetching user"
        message={error?.message || 'User not found'}
      />
    );
  }

  console.log('!! DATA_USER ', data?.getUser);

  return (
    <FeedGridView
      data={user.Posts?.items || []}
      ListHeaderComponent={() => <ProfileHeader user={user} />}
    />
  );
};

export default ProfileScreen;
