import React from 'react';
import { Switch, useRouteMatch, Redirect, Route } from 'react-router-dom';
import AdminRoute from '../../utils/router/AdminRoute';
import AdminHome from './home/AdminHome';

const Admin: React.FC<{}> = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <AdminRoute path={`${path}/*`}>
        <Switch>
          <Route path={`${path}/home`} component={AdminHome} />
          <Redirect from={`${path}/*`} to={`${path}/home`} />
        </Switch>
      </AdminRoute>
    </Switch>
  );
};

export default Admin;
