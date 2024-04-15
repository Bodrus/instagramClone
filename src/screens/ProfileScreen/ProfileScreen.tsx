import React from 'react';

import user from '../../assets/data/user.json';
import ProfileHeader from './ProfileHeader.tsx';
import FeedGridView from '../../components/FeedGridView/FeedGridView.tsx';

const ProfileScreen = () => {
  return <FeedGridView data={user.posts} ListHeaderComponent={ProfileHeader} />;
};

export default ProfileScreen;
