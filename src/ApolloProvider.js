import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { setContext } from "apollo-link-context";
import { createUploadLink } from "apollo-upload-client";
import React from "react";
import App from "./App";
import { SNACKBAR_STATUS } from "./gql/queries/snackbar";
import { resolvers } from "./gql/resolvers";
import { typeDefs } from "./gql/schema";

let cache = new InMemoryCache();

// const uri =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:8000/graphql"
//     : "https://try-it.tech";
const uri =
  process.env.NODE_ENV === "production"
    ? `${process.env.REACT_APP_API_URL}`
    : "http://localhost:4000";
console.log("uri", uri);

const link = createUploadLink({ uri });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  // return the headers to the context so link can read them
  return {
    headers: {
      ...headers,
      "x-token": token ? `${token}` : "",
      "x-refresh-token": refreshToken ? `${refreshToken}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache,
  resolvers,
  typeDefs,
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
  },
});

cache.writeQuery({
  query: SNACKBAR_STATUS,
  data: {
    snackbarStatus: {
      open: false,
      message: "",
      severity: "warning",
      __typename: "Snackbar",
    },
  },
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
