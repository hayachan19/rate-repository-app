import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';
import { useMutation } from '@apollo/react-hooks';
import Form from './Form';

const formFields = [
  { name: 'username', placeholder: 'Username' },
  { name: 'password', placeholder: 'Password', props: { secureTextEntry: true } },
  { name: 'passwordConfirm', placeholder: 'Password confirmation', props: { secureTextEntry: true } },
];

const SignupForm = ({ onSubmit }) => {
  return <Form fields={formFields} submit={[onSubmit, 'Sign Up']} />;
};

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required').min(1).max(30),
  password: yup.string().required('Password is required').min(5).max(50),
  passwordConfirm: yup.string().required('Password confirmation is required').oneOf([yup.ref('password'), null], 'Passwords don\'t match'), //what order?
});

const SignUp = () => {
  const history = useHistory();
  const [signIn] = useSignIn();
  const [createUser] = useMutation(CREATE_USER);
  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await createUser({ variables: { user: { username, password } } });
      await signIn({ username, password });
      history.push(`/`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignupForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;