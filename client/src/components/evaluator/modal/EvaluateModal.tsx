import React, { useCallback, useMemo, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks/lib/useMutation';
import { IApplication } from '../../admin/applications/applications.types';
import PrimaryButton from '../../buttons/PrimaryButton';
import { baseStyle, activeStyle, acceptStyle, rejectStyle } from '../../../utils/dropzone/styles';
import SpringModal from '../../modal/Modal';
import SecondaryButton from '../../buttons/SecondaryButton';
import useAuth from '../../../utils/hooks/useAuth';
import { useDropzone } from 'react-dropzone';
import FieldLabel from '../../labels/field-label/FieldLabel';
import TextInput from '../../input/TextInput';
import { CREATE_EVALUATION } from '../evaluator.mutations';
import { GET_CONVENINGS } from '../../admin/convening/convening.queries';
import './evaluateModal.css';
import Swal from 'sweetalert2';

interface IProps {
  application: IApplication;
  isOpen: boolean;
  handleClose: any;
  convening: string;
  evaluatorId: string;
}
const EvaluateModal: React.FC<IProps> = (props: IProps) => {
  const { application, isOpen, handleClose, convening, evaluatorId } = props;

  const [file, setFile] = useState<File>(null);
  const [error, setError] = useState<string>('');

  const { user } = useAuth();
  const history = useHistory();

  const { givenName, familyName } = user;

  const [createEvaluation] = useMutation(CREATE_EVALUATION, {
    refetchQueries: [
      {
        query: GET_CONVENINGS,
      },
    ],
  });

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length === 0) {
      setError('Máximo 1 archivo');
      setFile(null);
    } else {
      setFile(acceptedFiles[0]);
      setError('');
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );

  const close = () => {
    handleClose();
    setFile(null);
    setError('');
  };

  const handleSubmit = async (values, formik) => {
    try {
      await createEvaluation({
        variables: {
          input: { ...values, solicitudeId: application.id, evaluadoreId: evaluatorId },
          id: application.id,
        },
      });
      Swal.fire({
        title: `Se ha ingresado la evaluación`,
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then(() => {
        history.go(0);
      });
    } catch (e) {
      console.log(e.statusCode);
      Swal.fire({
        title: 'Hubo un error',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
    formik.setSubmitting(false);
    close();
  };

  return (
    <SpringModal isOpen={isOpen} handleClose={close}>
      <Formik initialValues={{ grade: '', comment: '' }} enableReinitialize onSubmit={handleSubmit}>
        {({ isSubmitting, values }) => (
          <Form className="evaluateModal">
            <h3>{convening}</h3>
            <h2>
              Rúbrica virtual - EVALUACIÓN de {givenName} {familyName}
            </h2>
            <div className="evaluateModal-info">
              <span>
                <strong> Solicitante:</strong> {application.name}
              </span>
            </div>
            <div className="evaluateModal-data">
              <div className="evaluateModal-dataitem">
                <FieldLabel htmlFor="grade" text="Calificación" />
                <Field name="grade">
                  {({ field }) => <TextInput field={field} id="grade" name="grade" size="s" />}
                </Field>
              </div>
              <div className="evaluateModal-dataitem">
                <FieldLabel htmlFor="comment" text="Comentarios" />
                <Field name="comment">
                  {({ field }) => (
                    <TextInput field={field} id="comment" name="comment" size="fat" />
                  )}
                </Field>
              </div>
            </div>
            <div className="evaluateModal-file">
              <p>
                <strong>Evaluación escaneada</strong>
              </p>
            </div>
            <div className="evaluateModal-file">
              <div {...getRootProps({ style })} className="evaluateModal-dropzone">
                <input {...getInputProps()} />
                <p>Adjunta</p>
              </div>
              {file && (
                <a download href={URL.createObjectURL(file)}>
                  {file.name}
                </a>
              )}
              {error && <span>{error}</span>}
            </div>
            <div className="evaluateModal-buttons">
              <PrimaryButton
                text="Cancelar"
                handleClick={() => {
                  handleClose();
                  setFile(null);
                  setError('');
                }}
              />
              <SecondaryButton
                text="Enviar"
                disabled={!file || !values.grade || !values.comment || isSubmitting}
                type="submit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </SpringModal>
  );
};

export default EvaluateModal;
