import gql from "graphql-tag";

export const SET_SNACKBAR = gql`
  mutation setSnackbar($message: String, $severity: AlertSeverity, $open: Boolean!) {
    setSnackbar(message: $message, severity: $severity, open: $open) @client {
      Snackbar {
        open,
        message,
        severity
      }
    }
  }
`;
