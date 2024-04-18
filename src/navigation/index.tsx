import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen/HomeScreen.tsx';
import {SafeAreaView, StyleSheet} from 'react-native';

const Navigation = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Navigation;
