import React, { useState } from 'react';
import MaterialTable from 'material-table';
import tableIcons from '../../../utils/table/TableIcons';
import PrimaryButton from '../../buttons/PrimaryButton';
import EvaluateModal from '../modal/EvaluateModal';
import SecondaryButton from '../../buttons/SecondaryButton';
import './evaluateTable.css';

const EvaluateTable: React.FC = () => {
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

  // const rowsData = apps.map(app => {
  //   return {
  //     name: app.name + ' ' + app.lastName + ' ' + app.id,
  //     evaluationsCount: app.evaluations.length,
  //     app: app,
  //   };
  // });

  const rowsData = [];

  return (
    <>
      <div className="evaluateTable-layout">
        <MaterialTable
          title={convening.name + '- Mate'}
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
                  text={rowData.evaluationsCount > 5 ? 'No disponible' : 'Rúbrica'}
                  handleClick={() => {
                    setSelected({ application: rowData.app, index: 0 });
                    setOpen(true);
                  }}
                  disabled={rowData.evaluationsCount > 5}
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
        />
      )}
    </>
  );
};

export default EvaluateTable;
