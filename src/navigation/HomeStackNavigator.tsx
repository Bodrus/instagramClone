import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import * as React from 'react';
import {Image} from 'react-native';
import {HomeStackNavigatorParamList} from './types.ts';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={HomeScreen}
        options={{headerTitle: HeaderTitle, headerTitleAlign: 'center'}}
      />
      <Stack.Screen name="UserProfile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const HeaderTitle = () => (
  <Image
    source={require('../assets/images/logo.png')}
    style={{width: 120, height: 35}}
  />
);

export default HomeStackNavigator;
