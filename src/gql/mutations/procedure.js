import { gql } from "apollo-boost";

export const CREATE_OR_UPDATE = gql`
  mutation createOrUpdateProcedure($input: ProcedureInput!) {
    createOrUpdateProcedure(input: $input){
      ok
      message
    }
  }
`;

export const REVIEW = gql`
  mutation reviewProcedure($input: ProcedureReviewInput!) {
    reviewProcedure(input: $input){
      ok
      message
    }
  }
`;

