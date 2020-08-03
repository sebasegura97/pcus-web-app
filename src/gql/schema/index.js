import gql  from "graphql-tag";

export const typeDefs = gql`
    extend type Query {
        snackbarStatus: Snackbar!
    }
    extend type Mutation {
        setSnackbar(message: String, severity: String, open: Boolean!): Boolean!
    }

    type Snackbar {
        open: Boolean!
        severity: String
        message: String
    }

`;
