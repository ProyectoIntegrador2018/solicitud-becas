import React from 'react';
import MaterialTable from 'material-table';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import tableIcons from '../../../../utils/table/TableIcons';
import { Link, useRouteMatch } from 'react-router-dom';
import PrimaryButton from '../../../buttons/PrimaryButton';
import SecondaryButton from '../../../buttons/SecondaryButton';
import './conveningTable.css';

const ConveningTable: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <div className="conveningTable-layout">
      <MaterialTable
        title="Convocatorias"
        icons={tableIcons}
        columns={[
          {
            field: 'nombre',
            title: 'Nombre',
            render: rowData => (
              <Link to={`${path}/${rowData.nombre}`}>
                <PrimaryButton text={`${rowData.nombre}`} />
              </Link>
            ),
          },
          {
            field: 'areas',
            title: 'Areas',
            type: 'numeric',
          },
          {
            field: 'evaluadores',
            title: 'Evaluadores',
            type: 'numeric',
          },
          {
            field: 'aplicaciones',
            title: 'Aplicaciones',
            type: 'numeric',
          },
          {
            field: 'fecha_inicio',
            title: 'Fecha de Inicio',
            type: 'date',
          },
          {
            field: 'fecha_cierre',
            title: 'Fecha de Cierre',
            type: 'date',
          },
          {
            field: 'editar',
            render: rowData => (
              <Link to={`${path}/editar/${rowData.nombre}`}>
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
                    title: `Deseas eliminar la convocatoria ${rowData.nombre}?`,
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
            nombre: 'Conv1',
            areas: 20,
            evaluadores: 40,
            aplicaciones: 30,
            fecha_inicio: dayjs('5/10/2020').toDate(),
            fecha_cierre: dayjs('5/12/2020').toDate(),
          },
          {
            nombre: 'Conv2',
            areas: 111,
            evaluadores: 123,
            aplicaciones: 221,
            fecha_inicio: dayjs('2/11/2019').toDate(),
            fecha_cierre: dayjs('5/10/2021').toDate(),
          },
          {
            nombre: 'Conv3',
            areas: 10,
            evaluadores: 1334,
            aplicaciones: 123,
            fecha_inicio: dayjs('1/12/2020').toDate(),
            fecha_cierre: dayjs('5/2/2022').toDate(),
          },
        ]}
      />
    </div>
  );
};

export default ConveningTable;
