import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import colors from '../../theme/colors.ts';
import fonts from '../../theme/fonts.ts';

interface ButtonProps {
  title?: string;
  onPress?: () => void;
  inline?: boolean;
}

const Button = ({
  title = '',
  onPress = () => {},
  inline = false,
}: ButtonProps) => {
  return (
    <Pressable
      style={[styles.container, inline ? {flex: 1} : {}]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
    margin: 5,
  },
  text: {
    fontWeight: fonts.weight.bold,
  },
});

export default Button;
