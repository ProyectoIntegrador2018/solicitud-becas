import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import Title from '../../../title/Title';
import { IApplication } from '../applications.types';
import './updateApplication.css';
import {
  baseStyle,
  activeStyle,
  acceptStyle,
  rejectStyle,
} from '../../../../utils/dropzone/styles';
import { Link } from 'react-router-dom';
import SecondaryButton from '../../../buttons/SecondaryButton';
import PrimaryButton from '../../../buttons/PrimaryButton';

const UpdateConvening: React.FC = () => {
  // const { id } = useParams();
  // get application with api call

  // meanwhile:
  const application: IApplication = {
    id: '1',
    name: 'Jorge',
    last_name: 'Amione',
    convening: 'Conv1',
    area: 'Front',
  };

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    // Do something with the files
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
    <div className="updateApplication-layout">
      <Title text={`Aplicación de ${application.name} ${application.last_name}`} size={2} />
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Arrastra los archivos o haz click para seleccionarlos</p>
      </div>
      <div className="updateApplication-buttons">
        <Link to="/">
          <SecondaryButton text="Cancelar" />
        </Link>
        <PrimaryButton text="Subir" type="submit" />
      </div>
    </div>
  );
};

export default UpdateConvening;
