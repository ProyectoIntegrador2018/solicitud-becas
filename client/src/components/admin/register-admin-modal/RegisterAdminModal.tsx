import React from 'react';
import PrimaryButton from '../../buttons/PrimaryButton';
import { Formik, Form, Field } from 'formik';
import SpringModal from '../../modal/Modal';
import SecondaryButton from '../../buttons/SecondaryButton';
import Title from '../../title/Title';
import TextInput from '../../input/TextInput';
import registerAdminModalSchema from './registerAdminModal.schema';
import './registerAdminModal.css';
import FieldLabel from '../../labels/field-label/FieldLabel';

interface IProps {
  isOpen: boolean;
  handleClose: any;
}

const RegisterAdminModal: React.FC<IProps> = (props: IProps) => {
  const { isOpen, handleClose } = props;

  return (
    <SpringModal isOpen={isOpen} handleClose={handleClose}>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={registerAdminModalSchema}
        enableReinitialize
        validateOnBlur={false}
        isInitialValid={false}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ values, isValid, errors }) => (
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
                    error={errors?.email}
                  />
                )}
              </Field>
              {errors?.email && document.getElementById('email') !== document.activeElement && (
                <span className="formErrorText">{errors.email}</span>
              )}
            </div>
            <div className="registerAdminModal-buttons">
              <SecondaryButton text="Cancelar" handleClick={handleClose} />
              <PrimaryButton text="Registrar" type="submit" disabled={!isValid} />
            </div>
          </Form>
        )}
      </Formik>
    </SpringModal>
  );
};

export default RegisterAdminModal;
