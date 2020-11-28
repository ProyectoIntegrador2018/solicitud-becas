import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Spinner from '../../../utils/spinner/Spinner';
import { IConvening } from '../../admin/convening/convening.types';
import { GET_CONVENINGS } from '../../admin/convening/convening.queries';
import useAuth from '../../../utils/hooks/useAuth';
import './evaluatorHome.css';

const EvaluatorHome: React.FC<{}> = () => {
  const { user } = useAuth();
  const { data, loading } = useQuery(GET_CONVENINGS, {
    fetchPolicy: 'cache-and-network',
    onError: () => {
      Swal.fire({
        title: 'Error cargando convocatorias',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    },
  });

  const convenings: IConvening[] = data ? data.convenings : [];

  const evaluatorConvenings = convenings.filter(c =>
    c.authorizedEmails.find(ae => ae.email === user.email),
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="evaluatorHome-layout">
      <div className="evaluatorHome-content">
        {evaluatorConvenings.map(c => {
          return (
            <Link key={c.id} to={`/evaluador/${c.id}`}>
              <button className="evaluatorHome-option blue-gradient">{c.name}</button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default EvaluatorHome;
