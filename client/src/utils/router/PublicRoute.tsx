import React from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PublicRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { ...routeProps } = props;
  const { authenticated, loading } = useAuth();
  const location = useLocation<any>();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (authenticated) {
    if (location.state?.redirect) {
      return <Redirect to={location.state.redirect} />;
    }
    return <Redirect to="/" />;
  }
  return <Route {...routeProps} />;
};

export default PublicRoute;
