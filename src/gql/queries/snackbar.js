import gql from "graphql-tag";

export const SNACKBAR_STATUS = gql`
  query snackbarStatus {
    snackbarStatus @client {
      open
      message
      severity
    }
  }
`;