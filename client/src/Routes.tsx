import React, { useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import PublicRoute from './utils/router/PublicRoute';
import Login from './components/auth/login/Login';
import useAuth from './utils/hooks/useAuth';
import EvaluatorRoute from './utils/router/EvaluatorRoute';
import Evaluator from './components/evaluator/Evaluator';
import Admin from './components/admin/Admin';
import AdminRoute from './utils/router/AdminRoute';

const Routes: React.FC = () => {
  const { fetchSession, logout, setState, admin } = useAuth();

  useEffect(() => {
    const at = localStorage.getItem('accessTokenBecas');
    const ti = localStorage.getItem('tokenIdBecas');
    if (at && ti) {
      fetchSession(at, ti)
        .then(response => response.json())
        .then(data => {
          if (Object.keys(data).length === 0 || data.reason) {
            // eslint-disable-next-line
            throw 'Sesión agotada';
          }
          setState({
            user: data,
            authenticated: true,
            admin: data.isAdmin,
            evaluator: !data.isAdmin,
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
      <EvaluatorRoute path="/evaluador" component={Evaluator} />
      <AdminRoute path="/admin" component={Admin} />
      <Redirect from="/*" to={admin ? '/admin/' : '/evaluador/'} />
    </Switch>
  );
};

export default Routes;
