import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {useForm, Controller, Control} from 'react-hook-form';

import user from '../../assets/data/user.json';
import fonts from '../../theme/fonts.ts';
import colors from '../../theme/colors.ts';
import {IUser} from '../../types/models.ts';

type FieldName = 'name' | 'username' | 'bio' | 'website';
type IEditableUser = Pick<IUser, FieldName>;

interface CustomInputProps {
  label: string;
  control: Control<IEditableUser, object>;
  name: FieldName;
  rules?: object;
  multiline?: boolean;
}

const URL_REGEX =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i;

const CustomInput = ({
  label,
  multiline = false,
  control,
  name,
  rules = {},
}: CustomInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        rules={rules}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
          return (
            <View style={{flex: 1}}>
              <TextInput
                style={[
                  styles.input,
                  error && {borderBottomColor: colors.error},
                ]}
                placeholder={label}
                multiline={multiline}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
              />
              {error && (
                <Text style={{color: colors.error}}>{error.message}</Text>
              )}
            </View>
          );
        }}
        name={name}
      />
    </View>
  );
};

const EditProfileScreen = () => {
  const {control, handleSubmit} = useForm<IEditableUser>({
    defaultValues: {
      name: user.name,
      username: user.username,
      bio: user.bio,
    },
  });

  const onSubmit = (data: IEditableUser) => {
    console.log('handleSubmit ', data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{uri: user.image}} style={styles.avatar} />
        <Text style={styles.textButton}>Change profile photo</Text>
      </View>
      <CustomInput
        name="name"
        label={'Name'}
        control={control}
        rules={{required: 'Name is required'}}
      />
      <CustomInput
        name="username"
        label={'UserName'}
        control={control}
        rules={{
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'UserName should be more the 3 character',
          },
        }}
      />
      <CustomInput
        name="website"
        label={'Website'}
        control={control}
        rules={{
          pattern: {
            value: URL_REGEX,
            message: 'Please enter a valid email address',
          },
        }}
      />
      <CustomInput
        name="bio"
        label={'Bio'}
        control={control}
        multiline
        rules={{required: 'Bio is required'}}
      />
      <Text
        onPress={handleSubmit(onSubmit)}
        style={[styles.textButton, styles.textSubmit]}>
        Submit
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: '30%',
    aspectRatio: 1,
    margin: 5,
    borderRadius: 60,
  },
  textButton: {
    fontWeight: fonts.weight.bold,
    color: colors.primary,
    fontSize: fonts.size.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: 75,
  },
  input: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  textSubmit: {
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default EditProfileScreen;
