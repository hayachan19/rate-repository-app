import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignOut from './SignOut';
import theme from '../theme';
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.background
    },
});

const Main = () => {
    return (
        <>
            <StatusBar backgroundColor={theme.colors.app} />
            <View style={styles.container}>
                <AppBar />
                <Switch>
                    <Route path="/" exact>
                        <RepositoryList />
                    </Route>
                    <Route path="/signin" exact>
                        <SignIn />
                    </Route>
                    <Route path="/signout" exact>
                        <SignOut />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            </View>
        </>
    );
};

export default Main;