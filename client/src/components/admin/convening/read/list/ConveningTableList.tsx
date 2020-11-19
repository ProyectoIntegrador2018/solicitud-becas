import React from 'react';
import MaterialTable from 'material-table';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import tableIcons from '../../../../../utils/table/TableIcons';
import PrimaryButton from '../../../../buttons/PrimaryButton';
import SecondaryButton from '../../../../buttons/SecondaryButton';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_CONVENINGS } from '../../convening.queries';
import { DELETE_CONVENING } from '../../convening.mutations';
import { IConvening } from '../../convening.types';
import Spinner from '../../../../../utils/spinner/Spinner';
import './conveningTableList.css';

const ConveningTableList: React.FC = () => {
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

  const [deleteConvening] = useMutation(DELETE_CONVENING);

  const convenings: IConvening[] = data ? data.convenings : [];

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="conveningTable-layout">
      <MaterialTable
        title="Convocatorias"
        icons={tableIcons}
        columns={[
          {
            field: 'name',
            title: 'Nombre',
            render: rowData => (
              <Link to={`/admin/convocatorias/${rowData.id}`}>
                <PrimaryButton text={`${rowData.name}`} />
              </Link>
            ),
          },
          {
            field: 'areasCount',
            title: 'Areas',
            type: 'numeric',
          },
          {
            field: 'evaluatorsCount',
            title: 'Evaluadores',
            type: 'numeric',
          },
          {
            field: 'applicationsCount',
            title: 'Aplicaciones',
            type: 'numeric',
          },
          {
            field: 'evaluationStartDate',
            title: 'Fecha de Inicio',
            type: 'date',
          },
          {
            field: 'evaluationEndDate',
            title: 'Fecha de Cierre',
            type: 'date',
          },
          {
            field: 'editar',
            render: rowData => (
              <Link to={`/admin/convocatorias/editar/${rowData.id}`}>
                <SecondaryButton text="Editar" />
              </Link>
            ),
          },
          {
            field: 'borrar',
            render: rowData => (
              <SecondaryButton
                text="Borrar"
                handleClick={() => {
                  Swal.fire({
                    title: `Deseas eliminar la convocatoria ${rowData.name}?`,
                    icon: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Eliminar',
                  }).then(result => {
                    if (result.isConfirmed) {
                      deleteConvening({
                        variables: {
                          id: rowData.id,
                        },
                        refetchQueries: [
                          {
                            query: GET_CONVENINGS,
                          },
                        ],
                      });
                    }
                  });
                }}
              />
            ),
          },
        ]}
        data={convenings.map(conv => {
          return {
            ...conv,
            areasCount: conv.areas?.length,
            applicationsCount: conv.solicitudes?.length,
          };
        })}
      />
    </div>
  );
};

export default ConveningTableList;
