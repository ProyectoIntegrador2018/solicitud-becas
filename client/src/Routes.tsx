import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import PublicRoute from './utils/router/PublicRoute';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import useAuth from './utils/hooks/useAuth';

const Routes: React.FC = () => {
  const { fetchUser } = useAuth();

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Switch>
      <PublicRoute path="/iniciar-sesion" component={Login} />
      <PublicRoute path="/crear-cuenta" component={Register} />
    </Switch>
  );
};

export default Routes;
