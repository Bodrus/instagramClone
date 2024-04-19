import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import * as React from 'react';
import EditProfileScreen from '../screens/EditProfileScreen';
import {ProfileStackNavigatorParamList} from './types.ts';

const Stack = createNativeStackNavigator<ProfileStackNavigatorParamList>();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{title: 'MyProfile'}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        // options={{title: 'Edit Profile'}}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
