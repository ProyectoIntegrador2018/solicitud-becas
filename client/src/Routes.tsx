import React from 'react';
import { Switch } from 'react-router-dom';
import PublicRoute from './utils/router/PublicRoute';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';

const Routes: React.FC = () => {
  return (
    <Switch>
      <PublicRoute path="/iniciar-sesion" component={Login} />
      <PublicRoute path="/crear-cuenta" component={Register} />
    </Switch>
  );
};

export default Routes;
