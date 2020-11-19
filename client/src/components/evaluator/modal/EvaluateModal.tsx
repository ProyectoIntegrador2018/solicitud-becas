import React, { useCallback, useMemo, useState } from 'react';
import { IApplication } from '../../admin/applications/applications.types';
import PrimaryButton from '../../buttons/PrimaryButton';
import { baseStyle, activeStyle, acceptStyle, rejectStyle } from '../../../utils/dropzone/styles';
import SpringModal from '../../modal/Modal';
import SecondaryButton from '../../buttons/SecondaryButton';
import useAuth from '../../../utils/hooks/useAuth';
import { useDropzone } from 'react-dropzone';
import FieldLabel from '../../labels/field-label/FieldLabel';
import TextInput from '../../input/TextInput';
import './evaluateModal.css';

interface IProps {
  application: IApplication;
  isOpen: boolean;
  handleClose: any;
  convening: string;
}
const EvaluateModal: React.FC<IProps> = (props: IProps) => {
  const { application, isOpen, handleClose, convening } = props;

  const [file, setFile] = useState<File>(null);
  const [error, setError] = useState<string>('');

  const { user } = useAuth();

  const { givenName, familyName } = user;

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

  return (
    <SpringModal
      isOpen={isOpen}
      handleClose={() => {
        handleClose();
        setFile(null);
        setError('');
      }}
    >
      <div className="evaluateModal">
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
            <TextInput id="grade" type="number" size="s" />
          </div>
          <div className="evaluateModal-dataitem">
            <FieldLabel htmlFor="grade" text="Comentarios" />
            <TextInput id="grade" size="fat" />
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
          <SecondaryButton text="Enviar" disabled={!file} />
        </div>
      </div>
    </SpringModal>
  );
};

export default EvaluateModal;
