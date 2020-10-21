import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const EvaluatorRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { ...routeProps } = props;
  const { authenticated, loading, evaluator } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!authenticated) {
    return (
      <Redirect
        to={{
          pathname: '/iniciar-sesion',
          state: {
            redirect: routeProps.location.pathname,
          },
        }}
      />
    );
  }

  if (!evaluator) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  }

  return <Route {...routeProps} />;
};

export default EvaluatorRoute;
