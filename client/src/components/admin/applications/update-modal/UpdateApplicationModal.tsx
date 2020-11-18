import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Title from '../../../title/Title';
import { IApplication } from '../applications.types';
import {
  baseStyle,
  activeStyle,
  acceptStyle,
  rejectStyle,
} from '../../../../utils/dropzone/styles';
import SpringModal from '../../../modal/Modal';
import SecondaryButton from '../../../buttons/SecondaryButton';
import PrimaryButton from '../../../buttons/PrimaryButton';
import './updateApplicationModal.css';

interface IProps {
  isOpen: boolean;
  handleClose: any;
  application: IApplication;
}

const UpdateApplicationModal: React.FC<IProps> = (props: IProps) => {
  const { isOpen, handleClose, application } = props;

  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept } = useDropzone({
    onDrop,
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
        setFiles([]);
      }}
    >
      <div className="updateApplication-layout">
        <Title text={`Aplicación de ${application.name} ${application.lastName}`} size={2} />
        <div {...getRootProps({ style })} className="updateApplication-dropzone">
          <input {...getInputProps()} />
          <p>Arrastra los archivos o haz click para seleccionarlos</p>
        </div>

        {files.length > 0 && (
          <div className="updateApplication-files">
            {files.map(f => {
              return (
                <a key={f.name + String(f.lastModified)} download href={URL.createObjectURL(f)}>
                  {f.name}
                </a>
              );
            })}
          </div>
        )}
        <div className="updateApplication-buttons">
          <SecondaryButton
            text="Cancelar"
            handleClick={() => {
              handleClose();
              setFiles([]);
            }}
          />
          <PrimaryButton
            text={files.length > 0 ? `Subir (${files.length})` : 'Subir'}
            type="submit"
            disabled={files.length === 0}
          />
        </div>
      </div>
    </SpringModal>
  );
};

export default UpdateApplicationModal;
