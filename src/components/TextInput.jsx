import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  field: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'grey',
    marginVertical: 2
  },
  errorField: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: theme.colors.error,
    marginVertical: 2
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];
   return <NativeTextInput style={error ? styles.errorField : style ? textInputStyle : styles.field} {...props} />;
};

export default TextInput;