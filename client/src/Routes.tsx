import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import PublicRoute from './utils/router/PublicRoute';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import useAuth from './utils/hooks/useAuth';

// this is a component just to make sure that we are deploying correctly,
// when there's something to show at the beginning we should remove this
const HelloComponent: React.FC = () => {
  return <div>Hola !</div>;
};

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
      <PublicRoute path="/" component={HelloComponent} />
    </Switch>
  );
};

export default Routes;
