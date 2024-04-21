import {IUser} from '../../types/models.ts';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import fonts from '../../theme/fonts.ts';
import {useNavigation} from '@react-navigation/native';

interface UserListItemProps {
  user: IUser;
}

const UserListItem = ({user}: UserListItemProps) => {
  const navigation = useNavigation();

  const goToUserScreen = () => {
    navigation.navigate('UserProfile', {userId: user.id});
  };

  return (
    <Pressable style={styles.container} onPress={goToUserScreen}>
      <Image source={{uri: user.image}} style={styles.image} />
      <View>
        <Text style={styles.text}>{user.name}</Text>
        <Text>{user.username}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    marginRight: 10,
  },
  text: {
    fontWeight: fonts.weight.bold,
  },
});

export default UserListItem;
