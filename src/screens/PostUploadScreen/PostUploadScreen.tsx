import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Camera } from "expo-camera";

const PostUploadScreen = () => {
  const [permission, setPermition] = useState<boolean | null>(null);

  const [status, requestPermission] = Camera.useCameraPermissions();
  const [status, requestPermission] = Camera.useMicrophonePermissions();

  if (permission === null) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>No Permition</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Upload</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default PostUploadScreen;
