import React, { useState, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_CONVENINGS } from '../convening.queries';
import { GET_APPLICATIONS } from '../../applications/applications.queries';
import {
  ASSOCIATE_APPLICATIONS,
  ASSOCIATE_AREAS,
  ASSOCIATE_EVALUATORS,
} from './associate.mutations';
import SpringModal from '../../../modal/Modal';
import SecondaryButton from '../../../buttons/SecondaryButton';
import { AREAS, EVALUATORS, APPLICATIONS } from '../convening.types';
import PrimaryButton from '../../../buttons/PrimaryButton';
import {
  baseStyle,
  activeStyle,
  acceptStyle,
  rejectStyle,
} from '../../../../utils/dropzone/styles';
import Spinner from '../../../../utils/spinner/Spinner';
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
  const [convening, setConvening] = useState(undefined);
  const history = useHistory();

  const { data, loading } = useQuery(GET_CONVENINGS, {
    fetchPolicy: 'cache-and-network',
    onError: () => {
      Swal.fire({
        title: 'Error cargando convocatorias',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    },
    onCompleted: () => {
      if (data.convenings.length > 0) {
        setConvening(data.convenings[0]);
      }
    },
  });

  const convenings = data ? data.convenings : [];

  const [associateApplications] = useMutation(ASSOCIATE_APPLICATIONS, {
    refetchQueries: [
      {
        query: GET_CONVENINGS,
      },
      {
        query: GET_APPLICATIONS,
      },
    ],
  });

  const [associateEvaluators] = useMutation(ASSOCIATE_EVALUATORS, {
    refetchQueries: [
      {
        query: GET_CONVENINGS,
      },
    ],
  });

  const [associateAreas] = useMutation(ASSOCIATE_AREAS, {
    refetchQueries: [
      {
        query: GET_CONVENINGS,
      },
    ],
  });

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

  const handleSubmit = async () => {
    if (association === AREAS) {
      try {
        await associateAreas({
          variables: {
            input: {
              files: [file],
            },
            id: convening?.id,
          },
        });
        Swal.fire({
          title: `Se han actualizado las areas para la convocatoria ${convening.name}`,
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          history.push('/admin/convocatorias/lista');
        });
      } catch (e) {
        Swal.fire({
          title: 'Hubo un error',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    } else if (association === APPLICATIONS) {
      try {
        await associateApplications({
          variables: {
            input: {
              files: [file],
            },
            id: convening?.id,
          },
        });
        Swal.fire({
          title: `Se han actualizado las solicitudes para la convocatoria ${convening.name}`,
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          history.push('/admin/convocatorias/lista');
        });
      } catch (e) {
        Swal.fire({
          title: 'Hubo un error',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    } else if (association === EVALUATORS) {
      try {
        await associateEvaluators({
          variables: {
            input: {
              files: [file],
            },
            id: convening?.id,
          },
        });
        Swal.fire({
          title: `Se han actualizado los evaluadores para la convocatoria ${convening.name}`,
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          history.push('/admin/convocatorias/lista');
        });
      } catch (e) {
        Swal.fire({
          title: 'Hubo un error',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    }
  };

  if (loading) {
    return <Spinner size={50} />;
  }

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
            value={convening?.id}
            onChange={e => {
              const conv = convenings.find(c => String(c.id) === e.target.value);
              setConvening(conv);
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
              handleSubmit().then(() => {
                handleClose();
                setFile(null);
                setError('');
              });
            }}
            disabled={!file || !convening}
          />
        </div>
      </div>
    </SpringModal>
  );
};

export default AssociateModal;
