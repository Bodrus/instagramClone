import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import HomeScreen from './src/screens/HomeScreen/HomeScreen.tsx';
import CommentsScreen from './src/screens/CommentsScreen/CommentsScreen.tsx';
import EditProfileScreen from './src/screens/EditProfileScreen/EditProfileScreen.tsx';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen.tsx';
import PostUploadScreen from './src/screens/PostUploadScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.post}>
      {/*<CommentsScreen />*/}
      {/*<HomeScreen />*/}
      {/*<ProfileScreen />*/}
      {/*<EditProfileScreen />*/}
      <PostUploadScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  post: {
    flex: 1,
  },
});

export default App;
