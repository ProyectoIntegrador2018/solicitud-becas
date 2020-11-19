import gql from 'graphql-tag';

export const DELETE_CONVENING = gql`
  mutation deleteConvening($id: String!) {
    deleteConvening(id: $id)
      @rest(type: "Convening", path: "convocatorias/{args.id}/", method: "DELETE") {
      id
    }
  }
`;

export const CREATE_CONVENING = gql`
  mutation createConvening($input: CreateConveningInput!) {
    createConvening(input: $input)
      @rest(type: "Convening", path: "convocatorias/", method: "POST") {
      id
    }
  }
`;

export const UPDATE_CONVENING = gql`
  mutation updateConvening($input: PatchConveningInput!) {
    updateConvening(input: $input)
      @rest(type: "Convening", path: "convocatorias/", method: "PATCH") {
      id
    }
  }
`;
