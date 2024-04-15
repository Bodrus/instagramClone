import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import HomeScreen from './src/screens/HomeScreen/HomeScreen.tsx';
import CommentsScreen from './src/screens/CommentsScreen/CommentsScreen.tsx';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen.tsx';

const App = () => {
  return (
    <SafeAreaView style={styles.post}>
      {/*<CommentsScreen />*/}
      {/*<HomeScreen />*/}
      <ProfileScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  post: {
    flex: 1,
  },
});

export default App;
