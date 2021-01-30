import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
query getRepositories{
    repositories {
      edges {
        node {
          fullName
          description
          language
          ownerAvatarUrl
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }  
`;

export const GET_CURRENT_USER = gql`
query getCurrentUser {
  authorizedUser {
    id
    username
  }
}
`;