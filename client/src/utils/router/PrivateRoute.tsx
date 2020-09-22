import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { ...routeProps } = props;
  const authenticated = true;
  const loading = false;

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

  return <Route {...routeProps} />;
};

export default PrivateRoute;
