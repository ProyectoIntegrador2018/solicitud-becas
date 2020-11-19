import React, { useState } from 'react';
import MaterialTable from 'material-table';
import tableIcons from '../../../../utils/table/TableIcons';
import PrimaryButton from '../../../buttons/PrimaryButton';
import EvaluationModal from '../modal/EvaluationModal';
import './evaluationsTable.css';

const EvaluationsTable: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // const { id } = useParams();
  // get info with api call

  // meanwhile:
  const convening = {
    name: 'Conv1 ',
    evaluationStartDate: new Date(2020, 5, 10),
    evaluationEndDate: new Date(2020, 5, 12),
    evaluatorsCount: 3,
    // evaluators: evals,
    areasCount: 5,
    areas: ['Mate', 'Compu', 'Deporte', 'Programacion', 'Arte'],
    applicationsCount: 5,
    // applications: apps,
  };

  // const getAvg = (evaluations: IEvaluation[]) => {
  //   const sum = evaluations.reduce((x, ev) => x + ev.grade, 0);
  //   return Number((sum / evaluations.length).toFixed());
  // };

  // const rowsData = apps.map(app => {
  //   return {
  //     name: app.name + ' ' + app.lastName + ' ' + app.id,
  //     evaluationsCount: app.evaluations.length,
  //     ev1: app.evaluations.length > 0 ? String(app.evaluations[0].grade) : null,
  //     ev2: app.evaluations.length > 1 ? String(app.evaluations[1].grade) : null,
  //     ev3: app.evaluations.length > 2 ? String(app.evaluations[2].grade) : null,
  //     ev4: app.evaluations.length > 3 ? String(app.evaluations[3].grade) : null,
  //     ev5: app.evaluations.length > 4 ? String(app.evaluations[4].grade) : null,
  //     ev6: app.evaluations.length > 5 ? String(app.evaluations[5].grade) : null,
  //     avg: app.evaluations.length > 0 ? getAvg(app.evaluations) : null,
  //     app: app,
  //   };
  // });

  const rowsData = [];

  return (
    <>
      <div className="evaluationsTable-layout">
        <MaterialTable
          title={convening.name + '- Mate'}
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
          convening={convening.name}
        />
      )}
    </>
  );
};

export default EvaluationsTable;
