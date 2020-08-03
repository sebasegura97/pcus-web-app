import { gql } from "apollo-boost";

export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId)
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: ID!, $update: UserInput!) {
    updateUser(userId: $userId, update: $update) {
      user {
        id
        name
        lastname
        username
        email
        role
      }
      ok
      message
    }
  }
`;

export const READ_NOTIFICATION = gql`
  mutation ReadNotification($id: ID!) {
    readNotification(id: $id)
  }
`;

export const UPDATE_ROLE = gql`
  mutation changeUserRole($userId: ID!, $newRole: Roles!) {
    changeRole(userId: $userId, newRole: $newRole) {
      ok
      user {
        id
        role
      }
      message
    }
  }
`;
