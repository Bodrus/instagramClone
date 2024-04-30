import * as React from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator.tsx';
import CommentsScreen from '../screens/CommentsScreen';
import {RootNavigatorParamList} from '../types/navigation.ts';
import AuthStackNavigator from './AuthStackNavigator.tsx';
import {useAuthContext} from '../context/AuthContext.tsx';
import { ActivityIndicator, View } from "react-native";

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

// npx uri-scheme open bodrusphotos://user/Max --android

const linking: LinkingOptions<RootNavigatorParamList> = {
  prefixes: ['bodrusphotos://', 'https://bodrusphotos.com'],
  config: {
    initialRouteName: 'Home',
    screens: {
      Comments: 'comments',
      Home: {
        screens: {
          HomeStack: {
            initialRouteName: 'Feed',
            screens: {
              UserProfile: 'user/:userId',
            },
          },
        },
      },
    },
  },
};

const Navigation = () => {
  const {user} = useAuthContext();
  if (user === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        {!user && (
          <Stack.Screen
            name="Auth"
            component={AuthStackNavigator}
            options={{headerShown: false}}
          />
        )}
        {user && (
          <Stack.Screen
            name="Home"
            component={BottomTabNavigator}
            options={{headerShown: false}}
          />
        )}
        <Stack.Screen name="Comments" component={CommentsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
