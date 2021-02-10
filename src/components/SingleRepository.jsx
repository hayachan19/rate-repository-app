import React from 'react';
import { View, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import Text from './Text';
import theme from '../theme';
import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY } from '../graphql/queries';
import * as Linking from 'expo-linking';
import ReviewItem from './ReviewItem';

const styles = {
  container: {
    backgroundColor: 'white',
  },
  github: {
    textAlign: 'center',
    borderColor: 'grey',
    borderRadius: 2,
    backgroundColor: theme.colors.primary,
    color: 'white',
    paddingVertical: 5,
    marginVertical: 2
  }
};

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={styles.container}>
      <RepositoryItem item={repository} />
      <Text style={styles.github} fontWeight='bold' onPress={() => Linking.openURL(repository.url)}>Open in GitHub</Text>
    </View>
  );
};

const SingleRepository = () => {
  let { repository: repositoryId } = useParams();
  const variables = { id: repositoryId, reviewFirst: 4 };
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, { fetchPolicy: 'cache-and-network', variables });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) { return; }
    fetchMore({
      query: GET_REPOSITORY,
      variables: {
        reviewAfter: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...previousResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
            },
          },
        };
        return nextResult;
      },
    });
  };

  const onEndReach = () => {
    handleFetchMore();
  };

  if (data) {
    const repository = data.repository;
    const reviewNodes = repository.reviews
      ? repository.reviews.edges.map(edge => edge.node)
      : [];
    return (
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
  return null;
};

export default SingleRepository;