import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10
  },
  button: {
    textAlign: 'center',
    borderColor: 'grey',
    borderRadius: 2,
    backgroundColor: theme.colors.primary,
    color: 'white',
    paddingVertical: 5,
    marginVertical: 2
  }
});

const Form = ({ fields, submit }) => {
  const [submitFunc, submitLabel, submitProps] = submit;
  return (
    <View style={styles.container}>
      {fields.map(field =>
        <FormikTextInput key={field.name} name={field.name} placeholder={field.placeholder} {...field.props} />
      )}
      <TouchableWithoutFeedback onPress={submitFunc}>
        <Text style={styles.button} fontWeight='bold' {...submitProps}>{submitLabel}</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Form;