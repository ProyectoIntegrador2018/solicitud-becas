import React, { useState, useCallback, useMemo } from 'react';
import PrimaryButton from '../../../buttons/PrimaryButton';
import { useDropzone } from 'react-dropzone';
import SpringModal from '../../../modal/Modal';
import {
  baseStyle,
  activeStyle,
  acceptStyle,
  rejectStyle,
} from '../../../../utils/dropzone/styles';
import SecondaryButton from '../../../buttons/SecondaryButton';
import { AREAS, EVALUATORS, APPLICATIONS } from '../convening.types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './associateModal.css';

interface IProps {
  isOpen: boolean;
  handleClose: any;
  association: number;
}
const AssociateModal: React.FC<IProps> = (props: IProps) => {
  const { isOpen, handleClose, association } = props;
  const [file, setFile] = useState<File>(null);
  const [error, setError] = useState<string>('');

  const associationToString = (a: number) => {
    switch (a) {
      case AREAS:
        return 'ÁREAS';
      case EVALUATORS:
        return 'EVALUADORES';
      case APPLICATIONS:
        return 'SOLICITUDES';
      default:
        return 'NULL';
    }
  };

  const convenings = [
    {
      id: '1',
      name: 'Conv1',
    },
    {
      id: '2',
      name: 'Conv2',
    },
    {
      id: '3',
      name: 'Conv3',
    },
    {
      id: '4',
      name: 'Conv4',
    },
  ];
  const [convening, setConvening] = useState(convenings[0].id);

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
      <div className="associateModal">
        <h3>Administrador</h3>
        <h2>Asociar {associationToString(association)} a convocatoria</h2>
        <FormControl variant="outlined" className="associateModal-select">
          <InputLabel id="convening-select-label">Convocatoria</InputLabel>
          <Select
            labelId="convening-select-label"
            id="convening-select"
            value={convening}
            onChange={e => {
              setConvening(e.target.value as string);
            }}
            label="Convocatoria"
          >
            {convenings.map(cv => {
              return (
                <MenuItem value={cv.id} key={cv.id}>
                  {cv.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <div className="associateModal-file">
          <p>Excel CSV con los datos correspondientes a la convocatoria actual</p>
          <div {...getRootProps({ style })} className="associateModal-dropzone">
            <input {...getInputProps()} />
            <p>Adjunta CSV</p>
          </div>
          {file && (
            <a download href={URL.createObjectURL(file)}>
              {file.name}
            </a>
          )}
          {error && <span>{error}</span>}
        </div>
        <div className="associateModal-buttons">
          <SecondaryButton
            text="Cancelar"
            handleClick={() => {
              handleClose();
              setFile(null);
              setError('');
            }}
          />
          <PrimaryButton
            text="Asociar"
            handleClick={() => {
              handleClose();
              setFile(null);
              setError('');
            }}
            disabled={!file}
          />
        </div>
      </div>
    </SpringModal>
  );
};

export default AssociateModal;
