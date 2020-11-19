import React from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Spinner from '../spinner/Spinner';

const PublicRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { ...routeProps } = props;
  const { authenticated, loading } = useAuth();
  const location = useLocation<any>();

  if (loading) {
    return <Spinner />;
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
