import React from 'react';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import PrimaryButton from '../../buttons/PrimaryButton';
import { Formik, Form, Field } from 'formik';
import SpringModal from '../../modal/Modal';
import SecondaryButton from '../../buttons/SecondaryButton';
import Title from '../../title/Title';
import TextInput from '../../input/TextInput';
import registerAdminModalSchema from './registerAdminModal.schema';
import FieldLabel from '../../labels/field-label/FieldLabel';
import { MAKE_ADMIN, REGISTER_EMAIL } from '../admin.mutations';
import './registerAdminModal.css';

interface IProps {
  isOpen: boolean;
  handleClose: any;
}

const RegisterAdminModal: React.FC<IProps> = (props: IProps) => {
  const { isOpen, handleClose } = props;
  const history = useHistory();

  const [makeAdmin] = useMutation(MAKE_ADMIN);
  const [registerMail] = useMutation(REGISTER_EMAIL);

  const handleSubmit = async (values, formik) => {
    try {
      await registerMail({
        variables: {
          input: {
            emails: [values.email],
          },
        },
      });
      await makeAdmin({
        variables: {
          input: {
            emails: [values.email],
          },
        },
      });
      Swal.fire({
        title: `Se ha registrado el correo ${values.email} como admin`,
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then(() => {
        history.push('/');
      });
    } catch (e) {
      Swal.fire({
        title: `Hubo un error`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      formik.setSubmitting(false);
    }
    handleClose();
  };

  return (
    <SpringModal isOpen={isOpen} handleClose={handleClose}>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={registerAdminModalSchema}
        enableReinitialize
        validateOnBlur={false}
        isInitialValid={false}
        onSubmit={handleSubmit}
      >
        {({ isValid, errors, isSubmitting }) => (
          <Form className="registerAdminModal-layout">
            <Title text="Registra un administrador" />
            <div className="registerAdminModal-field">
              <FieldLabel htmlFor="email" text="Correo GMAIL" />
              <Field name="email">
                {({ field }) => (
                  <TextInput
                    field={field}
                    id="email"
                    name="email"
                    type="email"
                    size="l"
                    placeholder="ejemplo@gmail.com"
                  />
                )}
              </Field>
              {errors?.email && document.getElementById('email') !== document.activeElement && (
                <span className="formErrorText">{errors.email}</span>
              )}
            </div>
            <div className="registerAdminModal-buttons">
              <SecondaryButton text="Cancelar" handleClick={handleClose} />
              <PrimaryButton text="Registrar" type="submit" disabled={!isValid || isSubmitting} />
            </div>
          </Form>
        )}
      </Formik>
    </SpringModal>
  );
};

export default RegisterAdminModal;
