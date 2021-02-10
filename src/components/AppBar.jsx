import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { GET_CURRENT_USER } from '../graphql/queries';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight / 2,
        paddingBottom: Constants.statusBarHeight / 2,
        backgroundColor: theme.colors.app,
        padding: 10,
        flexDirection: 'row',
    },
    item: {
        color: 'white',
        marginHorizontal: 5
    }
});

const AppBar = () => {
    const { loading, data } = useQuery(GET_CURRENT_USER, { fetchPolicy: 'cache-and-network' });
    let currentUser;
    if (!loading) {
        currentUser = data.authorizedUser;
    }
    return <View style={styles.container}>
        <ScrollView horizontal>
            <AppBarTab text='Repositories' link='/' style={styles.item} />
            {
                currentUser ?
                    <>
                        <AppBarTab text='My reviews' link='/reviews' style={styles.item} />
                        <AppBarTab text='Create a review' link='/review' style={styles.item} />
                        <AppBarTab text='Sign Out' link='/signout' style={styles.item} />
                    </> :
                    <>
                        <AppBarTab text='Sign In' link='/signin' style={styles.item} />
                        <AppBarTab text='Sign Up' link='/signup' style={styles.item} />
                    </>
            }
        </ScrollView>
    </View>;
};

export default AppBar;