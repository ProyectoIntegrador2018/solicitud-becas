import React, { useState } from 'react';
import MaterialTable from 'material-table';
import Swal from 'sweetalert2';
import tableIcons from '../../../../utils/table/TableIcons';
import PrimaryButton from '../../../buttons/PrimaryButton';
import SecondaryButton from '../../../buttons/SecondaryButton';
import UpdateApplicationModal from '../update-modal/UpdateApplicationModal';
import { IApplication } from '../applications.types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_APPLICATIONS } from '../applications.queries';
import DELETE_APPLICATION from '../applications.mutations';
import Spinner from '../../../../utils/spinner/Spinner';
import './applicationsTable.css';

const ApplicationsTable: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<IApplication>(null);

  const { data, loading } = useQuery(GET_APPLICATIONS, {
    fetchPolicy: 'cache-and-network',
    onError: () => {
      Swal.fire({
        title: 'Error cargando solicitudes',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    },
  });

  const [deleteApplication] = useMutation(DELETE_APPLICATION);

  const applications: IApplication[] = data ? data.applications : [];

  const rowData = applications.map(app => {
    return {
      id: app.id,
      name: app.name,
      convening: app.convocatoria.name,
      area: app.area.name,
    };
  });

  if (loading) {
    return <Spinner />;
  }

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
                    const application = applications.find(app => app.id === rowData.id);
                    setSelected(application);
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
                    }).then(result => {
                      if (result.isConfirmed) {
                        deleteApplication({
                          variables: {
                            id: rowData.id,
                          },
                          refetchQueries: [
                            {
                              query: GET_APPLICATIONS,
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
