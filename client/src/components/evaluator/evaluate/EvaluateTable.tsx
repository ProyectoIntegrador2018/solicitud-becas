import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useQuery } from '@apollo/react-hooks';
import MaterialTable from 'material-table';
import tableIcons from '../../../utils/table/TableIcons';
import PrimaryButton from '../../buttons/PrimaryButton';
import EvaluateModal from '../modal/EvaluateModal';
import SecondaryButton from '../../buttons/SecondaryButton';
import { GET_CONVENING } from '../../admin/convening/convening.queries';
import { IConvening } from '../../admin/convening/convening.types';
import Spinner from '../../../utils/spinner/Spinner';
import useAuth from '../../../utils/hooks/useAuth';
import './evaluateTable.css';

const EvaluateTable: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const { conv, area } = useParams();

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

  const applications =
    convening && convening.solicitudes.length > 0
      ? convening.solicitudes.filter(app => String(app.areaPk) === area)
      : [];

  const areas = convening && convening.areas.length > 0 ? convening.areas : [];

  const rowsData = applications.map(app => {
    return {
      name: app.name + ' ' + app.id,
      evaluationsCount: app.evaluaciones.length,
      app: app,
    };
  });

  const evaluatorId = convening
    ? convening.evaluadores.find(ev => ev.userGoogleId === user.googleId).id
    : '';

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="evaluateTable-layout">
        <MaterialTable
          title={
            (convening ? convening.name : '') +
            ' - ' +
            (areas.length > 0 ? areas.find(a => String(a.pk) === area)?.name : '')
          }
          icons={tableIcons}
          columns={[
            {
              field: 'name',
              title: 'Clave del solicitante',
              type: 'string',
            },
            {
              field: 'evaluationsCount',
              title: 'Evaluaciones',
              type: 'numeric',
            },
            {
              field: 'evaluationsCount',
              title: 'Documentación',
              render: rowData => (
                <SecondaryButton
                  text="Descargar ZIP"
                  // disabled={!rowData.documents}
                  handleClick={() => {
                    console.log('bajo zip');
                  }}
                />
              ),
            },
            {
              field: 'evaluar',
              title: 'Evaluar',
              render: rowData => (
                <PrimaryButton
                  text={
                    rowData.evaluationsCount > 5 ||
                    rowData.app.evaluaciones.find(ev => ev.evaluadoreId === evaluatorId) !==
                      undefined
                      ? 'No disponible'
                      : 'Rúbrica'
                  }
                  handleClick={() => {
                    setSelected({ application: rowData.app, index: 0 });
                    setOpen(true);
                  }}
                  disabled={
                    rowData.evaluationsCount > 5 ||
                    rowData.app.evaluaciones.find(ev => ev.evaluadoreId === evaluatorId) !==
                      undefined
                  }
                />
              ),
            },
          ]}
          data={rowsData}
        />
      </div>
      {selected && (
        <EvaluateModal
          isOpen={open}
          handleClose={() => setOpen(false)}
          application={selected.application}
          convening={convening.name}
          evaluatorId={evaluatorId}
        />
      )}
    </>
  );
};

export default EvaluateTable;
