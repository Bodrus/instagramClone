import {gql} from '@apollo/client';

export const getUser = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      bio
      image
      nofPosts
      nofFollowers
      name
      nofFollowing
      Posts {
        items {
          id
          image
          images
          video
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
