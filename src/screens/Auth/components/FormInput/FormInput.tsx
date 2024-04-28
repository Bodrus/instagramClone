import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Control, Controller, Path, FieldValues} from 'react-hook-form';

interface ICustomInput<Props extends FieldValues> {
  control: Control<Props>;
  name: Path<Props>;
  rules?: Record<string, any>;
  placeholder?: string;
  secureTextEntry?: boolean;
}

function CustomInput<Props extends FieldValues>({
  control,
  name,
  rules = {},
  placeholder = '',
  secureTextEntry = false,
}: ICustomInput<Props>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              {borderColor: error ? 'red' : '#e8e8e8'},
            ]}>
            <TextInput
              value={value as string}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    height: 50,
  },
});

export default CustomInput;
