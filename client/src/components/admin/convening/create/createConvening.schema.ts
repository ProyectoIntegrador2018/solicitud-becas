import { object, string } from 'yup';

const createConveningSchema = object().shape({
  name: string().required('El nombre es requerido'),
});

export default createConveningSchema;
