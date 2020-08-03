import { gql } from "apollo-boost";

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      name
      lastname
      email
      role
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    allUsers {
      id
      name
      lastname
      email
      role
      createdAt
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  query GetNotifications($readed: Boolean) {
    getNotifications(readed: $readed) {
      totalCount
      notifications {
        id
        message
        reason
        readed
        createdAt
      }
    }
  }
`;

