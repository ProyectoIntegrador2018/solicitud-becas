import gql from 'graphql-tag';

export const GET_CONVENINGS = gql`
  query convenings {
    convenings @rest(type: "[Convening]", path: "convocatorias/") {
      id
      name
      evaluationStartDate
      evaluationEndDate
      areas
      solicitudes
      evaluadores
      updatedAt
      createdAt
      authorizedEmails
    }
  }
`;

export const GET_CONVENING = gql`
  query convening($id: String!) {
    convening(id: $id) @rest(type: "Convening", path: "convocatorias/{args.id}/") {
      id
      name
      evaluationStartDate
      evaluationEndDate
      areas
      solicitudes
      evaluadores
      updatedAt
      createdAt
      authorizedEmails
    }
  }
`;
