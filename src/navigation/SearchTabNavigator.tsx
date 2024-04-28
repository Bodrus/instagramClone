import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CommentsScreen from '../screens/CommentsScreen';
import UsersScreen from '../screens/UsersScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../theme/colors.ts';
import {SearchTabNavigatorParamList} from '../types/navigation.ts';

const Tab = createMaterialTopTabNavigator<SearchTabNavigatorParamList>();

const SearchTabNavigator = () => {
  const insets = useSafeAreaInsets();
  return (
    // <SafeAreaView style={{flex: 1}}>
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {paddingTop: insets.top},
        tabBarIndicatorStyle: {backgroundColor: colors.primary},
      }}>
      <Tab.Screen name="Users" component={UsersScreen} />
      <Tab.Screen name="Posts" component={CommentsScreen} />
    </Tab.Navigator>
    // </SafeAreaView>
  );
};

export default SearchTabNavigator;
