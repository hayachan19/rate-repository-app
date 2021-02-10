import React from 'react';
import { View, TouchableWithoutFeedback, Alert } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { format } from 'date-fns';
import { useHistory } from 'react-router-native';

const styles = {
    review: {
        backgroundColor: 'white',
        flexDirection: 'row',
        margin: 2,
    },
    rating: {
        borderColor: theme.colors.primary,
        borderWidth: 1,
        minWidth: 32,
        maxWidth: 32,
        minHeight: 32,
        maxHeight: 32,
        borderRadius: 16,
        color: theme.colors.primary,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    button: {
        textAlign: 'center',
        borderColor: 'grey',
        borderRadius: 2,
        backgroundColor: theme.colors.primary,
        color: 'white',
        padding: 5,
        marginHorizontal: 2
    }
};

const ReviewItem = ({ review, userView, deleteHandler }) => {
    const history = useHistory();
    const deleteAlert = (id) => Alert.alert(
        'Delete Review',
        'Are you sure you want to delete this review?',
        [
            { text: 'Cancel', },
            { text: 'Delete', onPress: () => deleteHandler(id) },
        ]);

    return (
        <View style={styles.review}>
            <Text style={styles.rating} fontWeight='bold'>{review.rating}</Text>
            <View>
                <View>
                    {userView ? <Text fontWeight='bold'>{review.repository.fullName}</Text> : <Text fontWeight='bold'>{review.user.username}</Text>}
                    <Text color='textSecondary'>{format(new Date(review.createdAt), 'yyyy-MM-dd')}</Text>
                    <Text>{review.text}</Text>
                </View>
                {userView &&
                    <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
                        <TouchableWithoutFeedback onPress={() => { history.push(`/${review.repository.id}`); }}>
                            <Text style={{ ...styles.button }}>View repository</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => { deleteAlert(review.id); }}>
                            <Text style={{ ...styles.button, backgroundColor: theme.colors.error }}>Delete review</Text>
                        </TouchableWithoutFeedback>
                    </View>
                }
            </View>
        </View>
    );
};

export default ReviewItem;