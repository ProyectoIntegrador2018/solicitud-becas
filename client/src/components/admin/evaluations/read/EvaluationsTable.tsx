import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import Swal from 'sweetalert2';
import { IConvening } from '../../convening/convening.types';
import { GET_CONVENING } from '../../convening/convening.queries';
import tableIcons from '../../../../utils/table/TableIcons';
import PrimaryButton from '../../../buttons/PrimaryButton';
import EvaluationModal from '../modal/EvaluationModal';
import { IEvaluation } from '../../../evaluator/evaluator.types';
import Spinner from '../../../../utils/spinner/Spinner';
import './evaluationsTable.css';

const EvaluationsTable: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const { conv, area } = useParams();

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

  const getAvg = (evaluations: IEvaluation[]) => {
    const sum = evaluations.reduce((x, ev) => x + ev.grade, 0);
    return Number((sum / evaluations.length).toFixed());
  };
  const applications = convening
    ? convening.solicitudes.filter(app => String(app.areaPk) === area)
    : [];
  const rowsData = applications.map(app => {
    return {
      name: app.name + ' ' + app.id,
      evaluationsCount: app.evaluaciones.length,
      ev1: app.evaluaciones.length > 0 ? String(app.evaluaciones[0].grade) : null,
      ev2: app.evaluaciones.length > 1 ? String(app.evaluaciones[1].grade) : null,
      ev3: app.evaluaciones.length > 2 ? String(app.evaluaciones[2].grade) : null,
      ev4: app.evaluaciones.length > 3 ? String(app.evaluaciones[3].grade) : null,
      ev5: app.evaluaciones.length > 4 ? String(app.evaluaciones[4].grade) : null,
      ev6: app.evaluaciones.length > 5 ? String(app.evaluaciones[5].grade) : null,
      avg: app.evaluaciones.length > 0 ? getAvg(app.evaluaciones) : null,
      app: app,
    };
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="evaluationsTable-layout">
        <MaterialTable
          title={convening.name + ' - ' + convening.areas.find(a => String(a.pk) === area)?.name}
          icons={tableIcons}
          columns={[
            {
              field: 'name',
              title: 'Clave',
              type: 'string',
            },
            {
              field: 'evaluationsCount',
              title: 'Evaluaciones',
              type: 'numeric',
            },
            {
              field: 'ev1',
              title: 'Ev. 1',
              type: 'numeric',
              render: rowData => (
                <PrimaryButton
                  text={`${rowData.ev1}`}
                  disabled={!rowData.ev1}
                  handleClick={() => {
                    setSelected({ application: rowData.app, index: 0 });
                    setOpen(true);
                  }}
                />
              ),
            },
            {
              field: 'ev2',
              title: 'Ev. 2',
              type: 'numeric',
              render: rowData => (
                <PrimaryButton
                  text={`${rowData.ev2}`}
                  disabled={!rowData.ev2}
                  handleClick={() => {
                    setSelected({ application: rowData.app, index: 1 });
                    setOpen(true);
                  }}
                />
              ),
            },
            {
              field: 'ev3',
              title: 'Ev. 3',
              type: 'numeric',
              render: rowData => (
                <PrimaryButton
                  text={`${rowData.ev3}`}
                  disabled={!rowData.ev3}
                  handleClick={() => {
                    setSelected({ application: rowData.app, index: 2 });
                    setOpen(true);
                  }}
                />
              ),
            },
            {
              field: 'ev4',
              title: 'Ev. 4',
              type: 'numeric',
              render: rowData => (
                <PrimaryButton
                  text={`${rowData.ev4}`}
                  disabled={!rowData.ev4}
                  handleClick={() => {
                    setSelected({ application: rowData.app, index: 3 });
                    setOpen(true);
                  }}
                />
              ),
            },
            {
              field: 'ev5',
              title: 'Ev. 5',
              type: 'numeric',
              render: rowData => (
                <PrimaryButton
                  text={`${rowData.ev5}`}
                  disabled={!rowData.ev5}
                  handleClick={() => {
                    setSelected({ application: rowData.app, index: 4 });
                    setOpen(true);
                  }}
                />
              ),
            },
            {
              field: 'ev6',
              title: 'Ev. 6',
              type: 'numeric',
              render: rowData => (
                <PrimaryButton
                  text={`${rowData.ev6}`}
                  disabled={!rowData.ev6}
                  handleClick={() => {
                    setSelected({ application: rowData.app, index: 5 });
                    setOpen(true);
                  }}
                />
              ),
            },
            {
              field: 'avg',
              title: 'AVG',
              type: 'numeric',
            },
          ]}
          data={rowsData}
        />
      </div>
      {selected && (
        <EvaluationModal
          isOpen={open}
          handleClose={() => setOpen(false)}
          application={selected.application}
          evaluationIndex={selected.index}
          convening={convening}
        />
      )}
    </>
  );
};

export default EvaluationsTable;
