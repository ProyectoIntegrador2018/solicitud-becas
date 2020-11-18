import React from 'react';
import MaterialTable from 'material-table';
import { Link, useLocation } from 'react-router-dom';
import { IConvening } from '../../convening.types';
import { IApplication } from '../../../applications/applications.types';
import { IEvaluator } from '../../../../evaluator/evaluator.types';
import tableIcons from '../../../../../utils/table/TableIcons';
import PrimaryButton from '../../../../buttons/PrimaryButton';
import './conveningTableSingle.css';

const ConveningTableSingle: React.FC = () => {
  const { pathname } = useLocation();

  // const { id } = useParams();
  // get convening with api call

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
          comment: 'bien',
          evaluator: evals[0],
          grade: 100,
        },
        {
          comment: 'bien',
          evaluator: evals[1],
          grade: 100,
        },
        {
          comment: 'bien',
          evaluator: evals[0],
          grade: 100,
        },
        {
          comment: 'bien',
          evaluator: evals[1],
          grade: 100,
        },
      ],
    },
    {
      id: '2',
      name: 'Jose',
      lastName: 'Perez',
      convening: 'Conv1',
      area: 'Arte',
      evaluations: [
        {
          comment: 'bien',
          evaluator: evals[2],
          grade: 100,
        },
      ],
    },
    {
      id: '3',
      name: 'Andres',
      lastName: 'Perez',
      convening: 'Conv1',
      area: 'Programacion',
      evaluations: [],
    },
    {
      id: '4',
      name: 'Alex',
      lastName: 'Perez',
      convening: 'Conv1',
      area: 'Ciencia',
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
      area: 'Deporte',
      evaluations: [
        {
          comment: 'bien',
          evaluator: evals[0],
          grade: 100,
        },
      ],
    },
  ];

  const convening: Partial<IConvening> = {
    name: 'Conv1',
    evaluationStartDate: new Date(2020, 5, 10),
    evaluationEndDate: new Date(2020, 5, 12),
    evaluatorsCount: 3,
    evaluators: evals,
    areasCount: 5,
    areas: ['Mate', 'Compu', 'Deporte', 'Programacion', 'Arte'],
    applicationsCount: 5,
    applications: apps,
  };

  const areaRows = convening.areas.map(area => {
    return {
      name: area,
      evaluatorsCount: convening.evaluators.reduce(
        (x, evaluator) => x + (evaluator.areas.find(a => area === a) ? 1 : 0),
        0,
      ),
      applicationsCount: convening.applications.reduce(
        (x, app) => x + (app.area === area ? 1 : 0),
        0,
      ),
      evaluations3OrMore: convening.applications.reduce(
        (x, app) => x + (app.area === area && app.evaluations.length > 2 ? 1 : 0),
        0,
      ),
      evaluations3OrLess: convening.applications.reduce(
        (x, app) => x + (app.area === area && app.evaluations.length <= 2 ? 1 : 0),
        0,
      ),
    };
  });

  return (
    <div className="conveningTableSingle-layout">
      <div className="conveningTableSingle-table">
        <MaterialTable
          title={convening.name}
          icons={tableIcons}
          columns={[
            {
              field: 'name',
              title: 'Area',
              render: rowData => (
                <Link to={`${pathname}/${rowData.name}`}>
                  <PrimaryButton text={`${rowData.name}`} />
                </Link>
              ),
            },
            {
              field: 'evaluatorsCount',
              title: 'Evaluadores',
              type: 'numeric',
            },
            {
              field: 'applicationsCount',
              title: 'Solicitudes',
              type: 'numeric',
            },
            {
              field: 'evaluations3OrMore',
              title: 'Ap. con 3 o mas eval',
              type: 'numeric',
            },
            {
              field: 'evaluations3OrLess',
              title: 'Ap. con menos de 3 eval',
              type: 'numeric',
            },
          ]}
          data={areaRows}
        />
      </div>
      <div className="conveningTableSingle-buttons">
        <button className="conveningTableSingle-infobutton blue-gradient">
          {convening.evaluatorsCount} Evaluadores
        </button>
        <button className="conveningTableSingle-infobutton blue-gradient">
          {convening.applicationsCount} Solicitudes
        </button>
      </div>
    </div>
  );
};

export default ConveningTableSingle;
