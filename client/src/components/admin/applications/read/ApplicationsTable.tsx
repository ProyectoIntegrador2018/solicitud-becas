import React from 'react';
import MaterialTable from 'material-table';
import Swal from 'sweetalert2';
import tableIcons from '../../../../utils/table/TableIcons';
import { Link, useRouteMatch } from 'react-router-dom';
import PrimaryButton from '../../../buttons/PrimaryButton';
import SecondaryButton from '../../../buttons/SecondaryButton';
import './applicationsTable.css';

const ApplicationsTable: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <div className="applicationsTable-layout">
      <MaterialTable
        title="Aplicaciones en todas las convocatorias"
        icons={tableIcons}
        columns={[
          {
            field: 'name',
            title: 'Nombre',
            type: 'string',
          },
          {
            field: 'last_name',
            title: 'Apellido',
            type: 'string',
          },
          {
            field: 'convening',
            title: 'Convenio',
            type: 'string',
          },
          {
            field: 'area',
            title: 'Área',
            type: 'string',
          },
          {
            field: 'documents',
            title: 'Documentos',
            render: rowData => (
              <Link to={`${path}/editar/${rowData.id}`}>
                <PrimaryButton text="Actualizar documentos" />
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
                    title: `Deseas eliminar la aplicación de ${rowData.name}?`,
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
            id: 1,
            name: 'Jorge',
            last_name: 'Amione',
            area: 'Front',
            convening: 'Conv1',
          },
          {
            id: 2,
            name: 'Eduardo',
            last_name: 'Hidalgo',
            area: 'Back',
            convening: 'Conv1',
          },
          {
            id: 3,
            name: 'Fabi',
            last_name: 'Tamez',
            area: 'PM',
            convening: 'Conv1',
          },
        ]}
      />
    </div>
  );
};

export default ApplicationsTable;
