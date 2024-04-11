import React from 'react';
import {Pressable} from 'react-native';

interface DoublePressableProps {
  onDoublePress: () => void;
  children: React.ReactNode;
}

const DoublePressable = ({onDoublePress, children}: DoublePressableProps) => {
  let lastTab = 0;

  const handleDoublePressable = () => {
    const now = Date.now();
    if (now - lastTab < 300) {
      onDoublePress();
    }
    lastTab = now;
  };

  return <Pressable onPress={handleDoublePressable}>{children}</Pressable>;
};

export default DoublePressable;
