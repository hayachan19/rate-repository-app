import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: 'white',
        padding: 10
    },
    header: {
        flexDirection: 'row'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 3
    },
    info: {
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    badge: {
        backgroundColor: theme.colors.primary,
        color: 'white',
        alignSelf: 'flex-start',
        borderRadius: 3,
        padding: 3
    },
    stats: {
        flexDirection: 'row'
    },
    stat: {
        flex: 1,
        alignItems: 'center'
    }
});

const Stat = ({ name, value }) => {
    const autoValue = value >= 1000 ? (value / 1000).toFixed(1).toString() + 'k' : value;
    return (
        <View style={styles.stat}>
            <Text testID={'repository' + name} fontWeight='bold'>{autoValue}</Text>
            <Text>{name}</Text>
        </View>
    );
};

const RepositoryItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }}></Image>
                <View style={styles.info}>
                    <Text testID='repositoryName' fontSize='subheading' fontWeight='bold'>{item.fullName}</Text>
                    <Text testID='repositoryDescription' color='textSecondary'>{item.description}</Text>
                    <Text testID='repositoryLanguage' style={styles.badge} >{item.language}</Text>
                </View>
            </View>
            <View style={styles.stats}>
                <Stat name='Stars' value={item.stargazersCount} />
                <Stat name='Forks' value={item.forksCount} />
                <Stat name='Reviews' value={item.reviewCount} />
                <Stat name='Rating' value={item.ratingAverage} />
            </View>
        </View >
    );
};

export default RepositoryItem;