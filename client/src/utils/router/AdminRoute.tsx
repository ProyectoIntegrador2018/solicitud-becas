import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Spinner from '../spinner/Spinner';

const AdminRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { ...routeProps } = props;
  const { authenticated, loading, admin } = useAuth();

  if (loading) {
    return <Spinner />;
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

  if (!admin) {
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

export default AdminRoute;
