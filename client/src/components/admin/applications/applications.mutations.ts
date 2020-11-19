import gql from 'graphql-tag';

const DELETE_APPLICATION = gql`
  mutation deleteApplication($id: String!) {
    deleteApplication(id: $id)
      @rest(type: "Application", path: "solicitudes/{args.id}/", method: "DELETE") {
      id
    }
  }
`;

export default DELETE_APPLICATION;
