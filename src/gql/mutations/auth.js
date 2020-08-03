import { gql } from "apollo-boost";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      user {
        id
        email
        role
      }
      errors {
        path
        message
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation Register(
    $email: String!
    $password: String!
    $name: String!
    $lastname: String!
    $role: Roles!
  ) {
    register(
      email: $email
      name: $name
      lastname: $lastname
      password: $password
      role: $role
    ) {
      ok
      message
    }
  }
`;

export const SEND_CHANGE_PASSWORD_EMAIL = gql`
  mutation sendChangePasswordEmail($email: String!) {
    sendChangePasswordEmail(email: $email)
  }
`;

export const CHANGE_USER_PASSWORD = gql`
  mutation changeUserPassword(
    $userId: ID!
    $token: String!
    $newPassword: String!
  ) {
    changeUserPassword(
      userId: $userId
      token: $token
      newPassword: $newPassword
    )
  }
`;
