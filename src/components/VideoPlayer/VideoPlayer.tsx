import {Pressable, Text, View} from 'react-native';
import React, {useState} from 'react';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../FeedPost/styles.ts';
import colors from '../../theme/colors.ts';

interface VideoPlayerProps {
  uri: string;
  paused: boolean
}

const VideoPlayer = ({uri, paused = false}: VideoPlayerProps) => {
  const [mute, setMute] = useState(false);

  const toggleMute = () => setMute(!mute);
  return (
    <View>
      <Video
        source={{uri: uri}}
        muted={mute}
        repeat
        paused={paused}
        style={{width: '100%', aspectRatio: 1, borderColor: 'red'}}
      />
      <Pressable
        onPress={toggleMute}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 10,
          backgroundColor: colors.black,
          padding: 5,
          borderRadius: 50,
        }}>
        <Ionicons
          name={mute ? 'volume-mute-outline' : 'volume-medium-outline'}
          size={17}
          style={{color: colors.white}}
        />
      </Pressable>
    </View>
  );
};

export default VideoPlayer;
