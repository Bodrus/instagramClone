import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import HomeScreen from './src/screens/HomeScreen/HomeScreen.tsx';
import CommentScreen from "./src/screens/CommentScreen/CommentScreen.tsx";

const App = () => {
  return (
    <SafeAreaView style={styles.post}>
      <CommentScreen />
      {/*<HomeScreen />*/}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  post: {
    flex: 1,
  },
});

export default App;
