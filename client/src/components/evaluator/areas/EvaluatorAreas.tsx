import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useQuery } from '@apollo/react-hooks';
import { GET_CONVENING } from '../../admin/convening/convening.queries';
import { IConvening } from '../../admin/convening/convening.types';
import Spinner from '../../../utils/spinner/Spinner';
import useAuth from '../../../utils/hooks/useAuth';
import './evaluatorAreas.css';

const EvaluatorAreas: React.FC<{}> = () => {
  const { pathname } = useLocation();

  const { conv } = useParams();
  const { user } = useAuth();

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

  const evaluators = convening && convening.evaluadores ? convening.evaluadores : [];

  const areas =
    evaluators.length > 0 ? evaluators.find(e => e.userGoogleId === user.googleId).areas : [];

  const noAreasRegistered = areas.length === 0;

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="evaluatorAreas-layout">
      <div className="evaluatorAreas-content">
        {noAreasRegistered ? (
          <Link to={`${pathname}/registrar-areas`}>
            <button className="evaluatorAreas-option blue-gradient">Registrar Areas</button>
          </Link>
        ) : (
          areas.map(a => {
            return (
              <Link key={a.pk} to={`${pathname}/${a.pk}`}>
                <button className="evaluatorAreas-option blue-gradient">{a.name}</button>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EvaluatorAreas;
