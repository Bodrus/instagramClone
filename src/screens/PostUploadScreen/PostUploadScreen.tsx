import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import colors from '../../theme/colors.ts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FlashMode} from 'expo-camera/src/Camera.types.ts';

const PostUploadScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [typeCamera, setTypeCamera] = useState(CameraType.back);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [flashValue, setFlashValue] = useState<FlashMode>(FlashMode.off);
  const [isRecording, setIsRecording] = useState(false);

  const cameraRef = useRef<Camera>(null);

  const flashValues = Object.values(FlashMode); // Получаем массив значений FlashMode

  useEffect(() => {
    const getPermissions = async () => {
      const {status: statusCamera} =
        await Camera.requestCameraPermissionsAsync();
      const {status: statusMicrophone} =
        await Camera.requestMicrophonePermissionsAsync();

      setHasPermission(
        statusCamera === 'granted' && statusMicrophone === 'granted',
      );
    };
    getPermissions();
  }, []);

  const takePicture = async () => {
    if (!cameraRef.current || !isCameraReady) {
      return;
    }
    const result = await cameraRef.current.takePictureAsync({quality: 0.5});
    console.log('!! takePicture result', result);
  };

  const startRecording = async () => {
    if (!cameraRef.current || !isCameraReady || isRecording) {
      return;
    }

    const recordingOptions = {
      quality: Camera.Constants.VideoQuality['480'],
      maxDurations: 60,
      maxFileSize: 10 * 1024 * 1024,
      mute: false,
    };

    setIsRecording(true);
    try {
      console.warn('START RECORDING');
      const result = await cameraRef.current.recordAsync(recordingOptions);
      console.log('!! result RECORDING', result);
    } catch (e) {
      console.log('ERROR RECORDING', e);
    }
    setIsRecording(false);
  };

  const stopRecording = () => {
    if (isRecording) {
      cameraRef.current?.stopRecording();
      setIsRecording(false);
      console.warn('STOP RECORDING');
    }
  };

  const handleFlipCamera = () => {
    console.log('FLIP Camera flipped');
    setTypeCamera(type =>
      type === 'back' ? CameraType.front : CameraType.back,
    );
  };

  const handleFlash = () => {
    const currentFlashIndex = flashValues.findIndex(el => el === flashValue);
    const nextFlashIndex =
      currentFlashIndex === flashValues.length - 1 ? 0 : currentFlashIndex + 1;
    const result = flashValues[nextFlashIndex];
    setFlashValue(result);
  };

  const flashModeToIcon = {
    [FlashMode.off]: 'flash-off',
    [FlashMode.auto]: 'flash-auto',
    [FlashMode.on]: 'flash-on',
    [FlashMode.torch]: 'highlight',
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>No Permission</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={typeCamera}
        onCameraReady={() => setIsCameraReady(true)}
        flashMode={flashValue}
        ref={cameraRef}
        ratio="4:3"
      />
      <View style={[styles.buttonsContainer, styles.topAlign]}>
        <MaterialIcons name="close" size={30} color="white" />
        <View
          style={{
            width: 40,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Pressable onPress={handleFlash}>
            <MaterialIcons
              name={flashModeToIcon[flashValue]}
              size={30}
              color="white"
            />
          </Pressable>
        </View>
        <MaterialIcons name="settings" size={30} color="white" />
      </View>
      <View style={[styles.buttonsContainer, styles.bottomAlign]}>
        <MaterialIcons name="photo-library" size={30} color="white" />
        {isCameraReady && (
          <Pressable
            onPress={takePicture}
            onLongPress={startRecording}
            onPressOut={stopRecording}>
            <View
              style={[
                styles.circle,
                isRecording && {backgroundColor: colors.accent},
              ]}
            />
          </Pressable>
        )}
        <Pressable onPress={handleFlipCamera}>
          <MaterialIcons name="flip-camera-ios" size={30} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  camera: {
    width: '100%',
    aspectRatio: 3 / 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  circle: {
    width: 75,
    aspectRatio: 1,
    borderRadius: 75,
    backgroundColor: colors.white,
  },
  topAlign: {
    top: 25,
  },
  bottomAlign: {
    bottom: 25,
  },
});

export default PostUploadScreen;
