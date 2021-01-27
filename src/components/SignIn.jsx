import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
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

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput secureTextEntry name='password' placeholder='Password' />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text style={styles.button} fontWeight='bold'>Sign In</Text>
      </TouchableWithoutFeedback>
    </View >
  );
};

const initialValues = {
  username: '',
  password: ''
};


const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const onSubmit = (values) => {
  console.log(values);
};

const SignIn = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>

  );
};

export default SignIn;