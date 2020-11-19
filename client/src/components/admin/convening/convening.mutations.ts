/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const DELETE_CONVENING = gql`
  mutation deleteConvening($id: String!, $input: UserInput!) {
    deleteConvening(input: $input)
      @rest(type: "Convening", path: "convocatorias/", method: "DELETE") {
      id
    }
  }
`;

export const CREATE_CONVENING = gql`
  mutation createConvening($input: UserInput!) {
    createConvening(input: $input)
      @rest(type: "Convening", path: "convocatorias/", method: "POST") {
      id
    }
  }
`;
