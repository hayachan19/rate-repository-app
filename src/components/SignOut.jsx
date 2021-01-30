import React, { useContext } from 'react';
import { Redirect } from 'react-router-native';
import { useApolloClient } from '@apollo/client';
import AuthStorageContext from '../contexts/AuthStorageContext';

const SignOut = () => {
  const signOut = async () => {
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };
  signOut();
  return (
    <Redirect to='/' />
  );
};

export default SignOut;