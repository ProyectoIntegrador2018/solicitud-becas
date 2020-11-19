import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import PublicRoute from './utils/router/PublicRoute';
import Login from './components/auth/login/Login';
import AreasRegister from './components/auth/areas-register/AreasRegister';
import useAuth from './utils/hooks/useAuth';
import Home from './components/homepage/Home';
import PrivateRoute from './utils/router/PrivateRoute';
import EvaluatorRoute from './utils/router/EvaluatorRoute';
import Evaluator from './components/evaluator/Evaluator';
import Admin from './components/admin/Admin';
import AdminRoute from './utils/router/AdminRoute';

const Routes: React.FC = () => {
  const { fetchSession, logout, setState } = useAuth();

  useEffect(() => {
    const at = localStorage.getItem('accessTokenBecas');
    const ti = localStorage.getItem('tokenIdBecas');
    if (at && ti) {
      fetchSession(at, ti)
        .then(response => response.json())
        .then(data => {
          if (data.reason) {
            // eslint-disable-next-line
            throw 'Usuario no registrado';
          }
          setState({
            user: data,
            authenticated: true,
            admin: true,
            evaluator: true,
            loading: false,
          });
        })
        .catch(_ => {
          logout();
        });
    } else {
      logout();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Switch>
      <PublicRoute path="/iniciar-sesion" component={Login} />
      <PrivateRoute path="/registrar-areas" component={AreasRegister} />
      <EvaluatorRoute path="/evaluador" component={Evaluator} />
      <AdminRoute path="/admin" component={Admin} />
      <PrivateRoute path="/" component={Home} />
    </Switch>
  );
};

export default Routes;
