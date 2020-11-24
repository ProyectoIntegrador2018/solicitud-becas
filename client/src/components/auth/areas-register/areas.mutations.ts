import gql from 'graphql-tag';

const REGISTER_AREAS = gql`
  mutation registerAreas($input: RegisterAreasInput!) {
    registerAreas(input: $input)
      @rest(type: "AreaRegister", path: "assign-evaluador/", method: "POST") {
      id
    }
  }
`;

export default REGISTER_AREAS;
