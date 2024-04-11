import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import HomeScreen from './src/screens/HomeScreen.tsx';

const App = () => {
  return (
    <SafeAreaView style={styles.post}>
      <HomeScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  post: {
    flex: 1,
  },
});

export default App;
