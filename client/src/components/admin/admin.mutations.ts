import gql from 'graphql-tag';

export const MAKE_ADMIN = gql`
  mutation makeAdmin($input: AdminInput!) {
    makeAdmin(input: $input) @rest(type: "Admin", path: "make-admin/", method: "POST") {
      id
    }
  }
`;

export const DELETE_ADMIN = gql`
  mutation deleteAdmin($input: AdminInput!) {
    deleteAdmin(input: $input) @rest(type: "Admin", path: "make-admin/", method: "DELETE") {
      id
    }
  }
`;

export const REGISTER_EMAIL = gql`
  mutation deleteAdmin($input: EmailInput!) {
    deleteAdmin(input: $input) @rest(type: "Email", path: "auth-emails/", method: "POST") {
      id
    }
  }
`;
