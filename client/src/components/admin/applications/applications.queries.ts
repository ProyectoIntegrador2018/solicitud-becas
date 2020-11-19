import gql from 'graphql-tag';

export const GET_APPLICATIONS = gql`
  query applications {
    applications @rest(type: "[Application]", path: "solicitudes/") {
      id
      name
      area
      convocatoria
      evaluaciones
      updatedAt
      createdAt
    }
  }
`;

export const GET_APPLICATION = gql`
  query application($id: String!) {
    application(id: $id) @rest(type: "Application", path: "solicitudes/{args.id}/") {
      id
      name
      area
      convocatoria
      evaluaciones
      updatedAt
      createdAt
    }
  }
`;
