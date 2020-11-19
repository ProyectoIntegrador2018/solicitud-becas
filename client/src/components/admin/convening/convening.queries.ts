import gql from 'graphql-tag';

const GET_CONVENINGS = gql`
  query convenings {
    convenings @rest(type: "[Convening]", path: "convocatorias/") {
      id
      name
      evaluationStartDate
      evaluationEndDate
      updatedAt
      createdAt
    }
  }
`;

export default GET_CONVENINGS;
