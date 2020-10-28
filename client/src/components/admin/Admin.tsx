import React from 'react';
import { Switch, useRouteMatch, Redirect, Route } from 'react-router-dom';
import AdminRoute from '../../utils/router/AdminRoute';
import AdminHome from './home/AdminHome';
import ConveningTable from './convening/read/ConveningTable';
import CreateConvening from './convening/create/CreateConvening';
import UpdateConvening from './convening/update/UpdateConvening';
import ConveningsHome from './convening/ConveningsHome';
import ApplicationsHome from './applications/ApplicationsHome';
import ApplicationsTable from './applications/read/ApplicationsTable';
import UpdateApplication from './applications/update/UpdateApplication';

const Admin: React.FC<{}> = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <AdminRoute path={`${path}/*`}>
        <Switch>
          <Route path={`${path}/convocatorias/lista/editar/:id`} component={UpdateConvening} />
          <Route path={`${path}/convocatorias/lista`} component={ConveningTable} />
          <Route path={`${path}/convocatorias/crear-convocatoria`} component={CreateConvening} />
          <Route path={`${path}/convocatorias`} component={ConveningsHome} />
          <Route path={`${path}/solicitudes/lista/editar/:id`} component={UpdateApplication} />
          <Route path={`${path}/solicitudes/lista`} component={ApplicationsTable} />
          <Route path={`${path}/solicitudes`} component={ApplicationsHome} />
          <Route path={`${path}`} component={AdminHome} />
          <Redirect from={`${path}/*`} to={`${path}`} />
        </Switch>
      </AdminRoute>
    </Switch>
  );
};

export default Admin;
