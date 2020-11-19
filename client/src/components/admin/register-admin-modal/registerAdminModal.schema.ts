import { object, string } from 'yup';

const registerAdminModalSchema = object().shape({
  email: string()
    .required('El correo GMAIL es requerido')
    // eslint-disable-next-line
    .matches(/^[\w.\-]{0,25}@(gmail)\.([a-zA-Z0-9]+)$/, 'El correo no es GMAIL'),
});

export default registerAdminModalSchema;
