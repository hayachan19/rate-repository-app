import React from 'react';
import { FlatList } from 'react-native';
import ReviewItem from './ReviewItem';
import { GET_CURRENT_USER } from '../graphql/queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { DELETE_REVIEW } from '../graphql/mutations';

const UserReviews = () => {
    const { data, refetch } = useQuery(GET_CURRENT_USER, { variables: { reviews: true }, fetchPolicy: 'cache-and-network' });
    const [deleteMutation] = useMutation(DELETE_REVIEW);
    const deleteReview = (id) => {
        deleteMutation({ variables: { id } });
        refetch();
    };
    const reviews = data ? data.authorizedUser.reviews : null;
    const reviewNodes = reviews
        ? reviews.edges.map(edge => edge.node)
        : [];
    return (
        <FlatList
            data={reviewNodes}
            renderItem={({ item }) => <ReviewItem review={item} userView deleteHandler={deleteReview} />}
            keyExtractor={({ id }) => id}
        />
    );
};

export default UserReviews;