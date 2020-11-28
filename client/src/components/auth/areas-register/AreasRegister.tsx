import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Title from '../../title/Title';
import PrimaryButton from '../../buttons/PrimaryButton';
import FieldLabel from '../../labels/field-label/FieldLabel';
import AreasCheckboxes from './areas-checkboxes/AreasCheckboxes';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_CONVENING } from '../../admin/convening/convening.queries';
import { IConvening } from '../../admin/convening/convening.types';
import Spinner from '../../../utils/spinner/Spinner';
import REGISTER_AREAS from './areas.mutations';
import useAuth from '../../../utils/hooks/useAuth';
import './areasRegister.css';

const AreasRegister: React.FC = () => {
  const history = useHistory();
  const [areas, setAreas] = useState<string[]>([]);
  const { user } = useAuth();

  const selectArea = (area: string) => {
    const a = areas;
    if (areas.includes(area)) {
      a.filter(ar => ar !== area);
    } else {
      a.push(area);
    }
    setAreas(a);
  };

  const { conv } = useParams();

  const { data, loading } = useQuery(GET_CONVENING, {
    variables: {
      id: conv,
    },
    fetchPolicy: 'cache-and-network',
    onError: () => {
      Swal.fire({
        title: 'Error cargando convocatoria',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    },
  });

  const convening: IConvening = data ? data.convening : null;

  const options = convening ? convening.areas.map(area => area.name) : [];

  const [registerAreas] = useMutation(REGISTER_AREAS);

  const handleSubmit = async () => {
    try {
      await registerAreas({
        variables: {
          input: {
            areas: areas.map(a => {
              return { id: convening.areas.find(ar => ar.name === a).id };
            }),
            convocatoriaId: conv,
            userGoogleId: user.googleId,
          },
        },
      });
      Swal.fire({
        title: `Se han registrado las areas`,
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then(() => {
        history.push('/');
      });
    } catch (e) {
      console.log(e.statusCode);
      Swal.fire({
        title: `Hubo un error`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="areasRegister-layout">
      <Title size={2} text="Registra tus areas" />
      <div className="areasRegister-checkboxes">
        <FieldLabel text="Selecciona las areas en las que participarás" htmlFor="areas" />
        <AreasCheckboxes areas={options} selectArea={selectArea} />
      </div>
      <div className="areasRegister-button">
        <Title size={5} text="Nota: solo lo podrás hacer una vez" />
        <span style={{ marginTop: '10px' }}>
          <PrimaryButton text="Registrar" type="submit" handleClick={handleSubmit} />
        </span>
      </div>
    </div>
  );
};

export default AreasRegister;
