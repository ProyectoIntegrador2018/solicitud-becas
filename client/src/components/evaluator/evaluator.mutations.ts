import gql from 'graphql-tag';

export const CREATE_EVALUATION = gql`
  mutation createEvaluation($id: String!, $input: CreateEvaluationInput!) {
    createEvaluation(id: $id, input: $input)
      @rest(type: "Evaluation", path: "solicitudes/{args.id}/evaluacion/", method: "POST") {
      id
    }
  }
`;
