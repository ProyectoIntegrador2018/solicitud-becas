import gql from 'graphql-tag';

export const ASSOCIATE_APPLICATIONS = gql`
  mutation associateApplications($id: String!, $input: [FileInput]!) {
    associateApplications(id: $id, input: $input)
      @rest(
        type: "AssociationAp"
        path: "convocatorias/{args.id}/solicitudes/"
        method: "POST"
        bodySerializer: "fileEncode"
      ) {
      id
    }
  }
`;

export const ASSOCIATE_EVALUATORS = gql`
  mutation associateEvaluators($id: String!, $input: [FileInput]!) {
    associateEvaluators(id: $id, input: $input)
      @rest(
        type: "AssociationEv"
        path: "convocatorias/{args.id}/evaluadores/"
        method: "POST"
        bodySerializer: "fileEncode"
      ) {
      id
    }
  }
`;

export const ASSOCIATE_AREAS = gql`
  mutation associateAreas($id: String!, $input: [FileInput]!) {
    associateAreas(id: $id, input: $input)
      @rest(
        type: "AssociationAr"
        path: "convocatorias/{args.id}/areas/"
        method: "POST"
        bodySerializer: "fileEncode"
      ) {
      id
    }
  }
`;
