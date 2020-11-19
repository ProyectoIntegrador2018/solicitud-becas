import React from 'react';
import MaterialTable from 'material-table';
import { Link, useLocation } from 'react-router-dom';
import tableIcons from '../../../../../utils/table/TableIcons';
import PrimaryButton from '../../../../buttons/PrimaryButton';
import './conveningTableSingle.css';

const ConveningTableSingle: React.FC = () => {
  const { pathname } = useLocation();

  // const { id } = useParams();
  // get convening with api call

  // const areaRows = convening.areas.map(area => {
  //   return {
  //     name: area,
  //     evaluatorsCount: convening.evaluators.reduce(
  //       (x, evaluator) => x + (evaluator.areas.find(a => area === a) ? 1 : 0),
  //       0,
  //     ),
  //     applicationsCount: convening.applications.reduce(
  //       (x, app) => x + (app.area === area ? 1 : 0),
  //       0,
  //     ),
  //     evaluations3OrMore: convening.applications.reduce(
  //       (x, app) => x + (app.area === area && app.evaluations.length > 2 ? 1 : 0),
  //       0,
  //     ),
  //     evaluations3OrLess: convening.applications.reduce(
  //       (x, app) => x + (app.area === area && app.evaluations.length <= 2 ? 1 : 0),
  //       0,
  //     ),
  //   };
  // });

  const areaRows = [];

  return (
    <div className="conveningTableSingle-layout">
      <div className="conveningTableSingle-table">
        <MaterialTable
          title={'CONVENINGS.NAME'}
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
          {/* {convening.evaluatorsCount} Evaluadores */}
          Evaluadores
        </button>
        <button className="conveningTableSingle-infobutton blue-gradient">
          {/* {convening.applicationsCount} Solicitudes */}
          Solicitudes
        </button>
      </div>
    </div>
  );
};

export default ConveningTableSingle;
