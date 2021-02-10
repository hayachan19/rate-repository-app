import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
query getRepositories(
  $orderBy: AllRepositoriesOrderBy
  $orderDirection: OrderDirection
  $searchKeyword: String
  $first: Int
  $after: String
) {
  repositories(
    orderBy: $orderBy
    orderDirection: $orderDirection
    searchKeyword: $searchKeyword
    first: $first
    after: $after
  ) {
    edges {
      node {
        id
        fullName
        description
        language
        ownerAvatarUrl
        stargazersCount
        forksCount
        reviewCount
        ratingAverage
      }
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      totalCount
      hasNextPage
    }
  }
}
`;

export const GET_REPOSITORY = gql`
query getRepository($id: ID!, $reviewFirst: Int, $reviewAfter: String) {
  repository(id: $id) {
    id
    fullName
    description
    language
    ownerAvatarUrl
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    url
    reviews(first: $reviewFirst, after: $reviewAfter) {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
}
`;

export const GET_CURRENT_USER = gql`
query getCurrentUser($reviews: Boolean = false) {
  authorizedUser {
    id
    username
    reviews @include(if: $reviews) {
      edges {
        node {
          id
          text
          rating
          createdAt
          repository {
            id
            fullName
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
}
`;