import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

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
        marginHorizontal:5
    }
});


const AppBar = () => {
    return <View style={styles.container}>
        <ScrollView horizontal>
            <AppBarTab text='Repositories' link='/' style={styles.item} />
            <AppBarTab text='Sign In' link='/signin' style={styles.item} />
        </ScrollView>
    </View>;
};

export default AppBar;