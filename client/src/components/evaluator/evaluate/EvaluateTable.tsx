import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { IConvening } from '../../admin/convening/convening.types';
import { IApplication } from '../../admin/applications/applications.types';
import { IEvaluator } from '../evaluator.types';
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
  const evals: IEvaluator[] = [
    {
      areas: ['Mate', 'Ciencia', 'Deporte'],
      googleId: '1',
      imageUrl: '1',
      email: 'jorge@gmail.com',
      name: 'Jorge',
      givenName: '',
      familyName: 'Amione',
      convening: 'conv1',
    },
    {
      areas: ['Mate', 'Ciencia', 'Programacion'],
      googleId: '2',
      imageUrl: '2',
      email: 'eduardo@gmail.com',
      name: 'Eduardo',
      givenName: '',
      familyName: 'Hidalgo',
      convening: 'conv1',
    },
    {
      areas: ['Programacion', 'Arte'],
      googleId: '3',
      imageUrl: '3',
      email: 'fabi@gmail.com',
      name: 'Fabi',
      givenName: '',
      familyName: 'Tamez',
      convening: 'conv1',
    },
  ];

  const apps: IApplication[] = [
    {
      id: '1',
      name: 'Chuchito',
      lastName: 'Perez',
      convening: 'Conv1',
      area: 'Mate',
      evaluations: [
        {
          comment:
            'Lorem ipsum dolor sit amet, nobis dolor volumus ex nam, duo soluta deserunt no, mei iriure probatus ne. Oratio volutpat democritum id has, ut pri dolorem oporteat expetenda. Vel dolor ceteros ponderum at, natum percipit ei duo, mel ne saepe disputando. Id graeco pertinacia per. Mea semper repudiare contentiones ex. Qui audiam mnesarchum ex, natum deserunt ea sea. Oratio nonumes persecuti at eos, qui accumsan omnesque an. Tale velit comprehensam te vis. Ea qui vide lorem. Nec ex impedit dissentiet. Ad munere prompta lobortis eam. Dolor deleniti antiopam mea id, duo ut percipit ',
          evaluator: evals[0],
          grade: 91,
        },
        {
          comment: 'bien',
          evaluator: evals[1],
          grade: 51,
        },
        {
          comment: 'bien',
          evaluator: evals[0],
          grade: 67,
        },
        {
          comment: 'bien',
          evaluator: evals[1],
          grade: 100,
        },
        {
          comment: 'bien',
          evaluator: evals[1],
          grade: 51,
        },
        {
          comment: 'bien',
          evaluator: evals[1],
          grade: 51,
        },
      ],
    },
    {
      id: '2',
      name: 'Jose',
      lastName: 'Perez',
      convening: 'Conv1',
      area: 'Mate',
      evaluations: [
        {
          comment: 'bien',
          evaluator: evals[2],
          grade: 93,
        },
        {
          comment: 'bien',
          evaluator: evals[1],
          grade: 91,
        },
      ],
    },
    {
      id: '3',
      name: 'Andres',
      lastName: 'Perez',
      convening: 'Conv1',
      area: 'Mate',
      evaluations: [],
    },
    {
      id: '4',
      name: 'Alex',
      lastName: 'Perez',
      convening: 'Conv1',
      area: 'Mate',
      evaluations: [
        {
          comment: 'bien',
          evaluator: evals[0],
          grade: 100,
        },
      ],
    },
    {
      id: '5',
      name: 'Manuel',
      lastName: 'Perez',
      convening: 'Conv1',
      area: 'Mate',
      evaluations: [
        {
          comment: 'bien',
          evaluator: evals[0],
          grade: 10,
        },
        {
          comment: 'bien',
          evaluator: evals[0],
          grade: 2,
        },
        {
          comment: 'bien',
          evaluator: evals[0],
          grade: 34,
        },
      ],
    },
  ];

  const convening: Partial<IConvening> = {
    name: 'Conv1 ',
    evaluationStartDate: new Date(2020, 5, 10),
    evaluationEndDate: new Date(2020, 5, 12),
    evaluatorsCount: 3,
    evaluators: evals,
    areasCount: 5,
    areas: ['Mate', 'Compu', 'Deporte', 'Programacion', 'Arte'],
    applicationsCount: 5,
    applications: apps,
  };

  const rowsData = apps.map(app => {
    return {
      name: app.name + ' ' + app.lastName + ' ' + app.id,
      evaluationsCount: app.evaluations.length,
      app: app,
    };
  });

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
