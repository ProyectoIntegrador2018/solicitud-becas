import React from 'react';
import MaterialTable from 'material-table';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import tableIcons from '../../../../../utils/table/TableIcons';
import PrimaryButton from '../../../../buttons/PrimaryButton';
import SecondaryButton from '../../../../buttons/SecondaryButton';
import { useQuery } from '@apollo/react-hooks';
import GET_CONVENINGS from '../../convening.queries';
import './conveningTableList.css';

const ConveningTableList: React.FC = () => {
  const { data } = useQuery(GET_CONVENINGS, {
    fetchPolicy: 'cache-and-network',
    onError: () => {
      Swal.fire({
        title: 'Error cargando convocatorias',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    },
  });

  const convenings = data ? data.convenings : [];

  console.log(convenings);

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
              <Link to={`/admin/convocatorias/${rowData.name}`}>
                <PrimaryButton text={`${rowData.name}`} />
              </Link>
            ),
          },
          {
            field: 'areas_count',
            title: 'Areas',
            type: 'numeric',
          },
          {
            field: 'evaluators_count',
            title: 'Evaluadores',
            type: 'numeric',
          },
          {
            field: 'applications_count',
            title: 'Aplicaciones',
            type: 'numeric',
          },
          {
            field: 'convening_start',
            title: 'Fecha de Inicio',
            type: 'date',
          },
          {
            field: 'convening_end',
            title: 'Fecha de Cierre',
            type: 'date',
          },
          {
            field: 'editar',
            render: rowData => (
              <Link to={`/admin/convocatorias/editar/${rowData.name}`}>
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
                  });
                }}
              />
            ),
          },
        ]}
        data={[
          {
            name: 'Conv1',
            areas_count: 20,
            evaluators_count: 40,
            applications_count: 30,
            convening_start: dayjs('5/10/2020').toDate(),
            convening_end: dayjs('5/12/2020').toDate(),
          },
          {
            name: 'Conv2',
            areas_count: 111,
            evaluators_count: 123,
            applications_count: 221,
            convening_start: dayjs('2/11/2019').toDate(),
            convening_end: dayjs('5/10/2021').toDate(),
          },
          {
            name: 'Conv3',
            areas_count: 10,
            evaluators_count: 1334,
            applications_count: 123,
            convening_start: dayjs('1/12/2020').toDate(),
            convening_end: dayjs('5/2/2022').toDate(),
          },
        ]}
      />
    </div>
  );
};

export default ConveningTableList;
