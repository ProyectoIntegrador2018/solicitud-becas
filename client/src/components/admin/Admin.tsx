import React from 'react';
import { Switch, useRouteMatch, Redirect, Route } from 'react-router-dom';
import AdminRoute from '../../utils/router/AdminRoute';
import AdminHome from './home/AdminHome';
import ConveningTableList from './convening/read/list/ConveningTableList';
import CreateConvening from './convening/create/CreateConvening';
import UpdateConvening from './convening/update/UpdateConvening';
import ConveningsHome from './convening/ConveningsHome';
import ApplicationsTable from './applications/read/ApplicationsTable';
import ConveningTableSingle from './convening/read/single/ConveningTableSingle';
import EvaluationsTable from './evaluations/read/EvaluationsTable';

const Admin: React.FC<{}> = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <AdminRoute path={`${path}/*`}>
        <Switch>
          <Route path={`${path}/convocatorias/editar/:conv`} component={UpdateConvening} />
          <Route path={`${path}/convocatorias/lista`} component={ConveningTableList} />
          <Route path={`${path}/convocatorias/crear-convocatoria`} component={CreateConvening} />
          <Route path={`${path}/convocatorias/:conv/:area`} component={EvaluationsTable} />
          <Route path={`${path}/convocatorias/:conv`} component={ConveningTableSingle} />
          <Route path={`${path}/convocatorias`} component={ConveningsHome} />
          <Route path={`${path}/solicitudes/lista`} component={ApplicationsTable} />
          <Route path={`${path}`} component={AdminHome} />
          <Redirect from={`${path}/*`} to={`${path}`} />
        </Switch>
      </AdminRoute>
    </Switch>
  );
};

export default Admin;
