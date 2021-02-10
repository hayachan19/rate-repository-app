import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignOut from './SignOut';
import SignUp from './SignUp';
import Review from './Review';
import SingleRepository from './SingleRepository';
import UserReviews from './UserReviews';
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
                     <Route path="/signup" exact>
                        <SignUp />
                    </Route>
                    <Route path="/review" exact>
                        <Review />
                    </Route>
                    <Route path="/reviews" exact>
                        <UserReviews />
                    </Route>
                    <Route path="/:repository">
                        <SingleRepository />
                    </Route>
                    <Redirect to='/' />
                </Switch>
            </View>
        </>
    );
};

export default Main;