import React from 'react';
import MaterialTable from 'material-table';
import { Link, useLocation, useParams } from 'react-router-dom';
import tableIcons from '../../../../../utils/table/TableIcons';
import PrimaryButton from '../../../../buttons/PrimaryButton';
import Spinner from '../../../../../utils/spinner/Spinner';
import { GET_CONVENING } from '../../convening.queries';
import Swal from 'sweetalert2';
import { useQuery } from '@apollo/react-hooks';
import { IConvening } from '../../convening.types';
import './conveningTableSingle.css';

const ConveningTableSingle: React.FC = () => {
  const { pathname } = useLocation();
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

  console.log(convening);

  const areaRows =
    convening && convening.areas
      ? convening.areas.map(area => {
          return {
            name: area.name,
            evaluatorsCount: convening.evaluadores
              ? convening.evaluadores.reduce(
                  (x, evaluator) => x + (evaluator.areas.find(a => area.name === a) ? 1 : 0),
                  0,
                )
              : 0,
            applicationsCount: area.solicitudes.length,
            evaluations3OrMore: area.solicitudes.reduce(
              (x, sol) => x + (sol.area.name === area.name && sol.evaluaciones.length > 2 ? 1 : 0),
              0,
            ),
            evaluations3OrLess: area.solicitudes.reduce(
              (x, sol) => x + (sol.area === area && sol.evaluaciones.length <= 2 ? 1 : 0),
              0,
            ),
          };
        })
      : [];

  // const areaRows = [];

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="conveningTableSingle-layout">
      <div className="conveningTableSingle-table">
        <MaterialTable
          title={convening?.name}
          icons={tableIcons}
          columns={[
            {
              field: 'name',
              title: 'Area',
              render: rowData => (
                <Link to={`${pathname}/${rowData.name}`}>
                  <PrimaryButton text={`${rowData.name}`} />
                </Link>
              ),
            },
            {
              field: 'evaluatorsCount',
              title: 'Evaluadores',
              type: 'numeric',
            },
            {
              field: 'applicationsCount',
              title: 'Solicitudes',
              type: 'numeric',
            },
            {
              field: 'evaluations3OrMore',
              title: 'Ap. con 3 o mas eval',
              type: 'numeric',
            },
            {
              field: 'evaluations3OrLess',
              title: 'Ap. con menos de 3 eval',
              type: 'numeric',
            },
          ]}
          data={areaRows}
        />
      </div>
      <div className="conveningTableSingle-buttons">
        <button className="conveningTableSingle-infobutton blue-gradient">
          {/* {convening.evaluatorsCount} Evaluadores */}
          Evaluadores
        </button>
        <button className="conveningTableSingle-infobutton blue-gradient">
          {/* {convening.applicationsCount} Solicitudes */}
          Solicitudes
        </button>
      </div>
    </div>
  );
};

export default ConveningTableSingle;
