// import gql from "graphql-tag";
import { SNACKBAR_STATUS } from "../queries/snackbar";

export const resolvers = {
  Query: {
    snackbarStatus: (_, __, { cache }) => {
      try {
        const { Snackbar } = cache.readQuery({
          query: SNACKBAR_STATUS,
        });
        return Snackbar;
      } catch (error) {
        console.log("ERROROROROR", error);
      }
    },
  },

  Mutation: {
    setSnackbar: (_, { message, severity, open }, { cache }) => {
      try {
        cache.writeQuery({
          query: SNACKBAR_STATUS,
          data: {
            snackbarStatus: {
              message: message ? message : "",
              severity: severity ? severity : "warning",
              open,
              __typename: "Snackbar",
            },
          },
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
