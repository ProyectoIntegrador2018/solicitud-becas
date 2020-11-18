import React, { useState } from 'react';
import MaterialTable from 'material-table';
import Swal from 'sweetalert2';
import tableIcons from '../../../../utils/table/TableIcons';
import PrimaryButton from '../../../buttons/PrimaryButton';
import SecondaryButton from '../../../buttons/SecondaryButton';
import UpdateApplicationModal from '../update-modal/UpdateApplicationModal';
import { IApplication } from '../applications.types';
import './applicationsTable.css';

const ApplicationsTable: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<IApplication>(null);

  const rowData: IApplication[] = [
    {
      id: '1',
      name: 'Jorge',
      lastName: 'Amione',
      area: 'Front',
      convening: 'Conv1',
      evaluations: [],
    },
    {
      id: '2',
      name: 'Eduardo',
      lastName: 'Hidalgo',
      area: 'Back',
      convening: 'Conv1',
      evaluations: [],
    },
    {
      id: '3',
      name: 'Fabi',
      lastName: 'Tamez',
      area: 'PM',
      convening: 'Conv1',
      evaluations: [],
    },
  ];

  return (
    <>
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
              field: 'lastName',
              title: 'Apellido',
              type: 'string',
            },
            {
              field: 'convening',
              title: 'Convocatoria',
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
                <PrimaryButton
                  text="Actualizar documentos"
                  handleClick={() => {
                    setSelected(rowData);
                    setOpen(true);
                  }}
                />
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
          data={rowData}
        />
      </div>
      {selected && (
        <UpdateApplicationModal
          isOpen={open}
          handleClose={() => setOpen(false)}
          application={selected}
        />
      )}
    </>
  );
};

export default ApplicationsTable;
