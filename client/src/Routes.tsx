import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import PublicRoute from './utils/router/PublicRoute';
import Login from './components/auth/login/Login';
import AreasRegister from './components/auth/areas-register/AreasRegister';
// import useAuth from './utils/hooks/useAuth';
import Home from './components/homepage/Home';
import PrivateRoute from './utils/router/PrivateRoute';
import CreateConvening from './components/convention/create/CreateConvening';

const Routes: React.FC = () => {
  // const { login } = useAuth();

  useEffect(() => {
    // login();
    // eslint-disable-next-line
  }, []);

  return (
    <Switch>
      <PublicRoute path="/iniciar-sesion" component={Login} />
      <PrivateRoute path="/registrar-areas" component={AreasRegister} />
      <PrivateRoute path="/crear-convocatoria" component={CreateConvening} />
      <PrivateRoute path="/" component={Home} />
    </Switch>
  );
};

export default Routes;
