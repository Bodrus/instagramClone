import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import colors from '../../theme/colors.ts';
import fonts from '../../theme/fonts.ts';

interface ButtonProps {
  title?: string;
  onPress?: () => void;
}

const Button = ({title = '', onPress = () => {}}: ButtonProps) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    flex: 1,
    paddingVertical: 7,
    borderRadius: 5,
    margin: 5,
  },
  text: {
    fontWeight: fonts.weight.bold,
  },
});

export default Button;
