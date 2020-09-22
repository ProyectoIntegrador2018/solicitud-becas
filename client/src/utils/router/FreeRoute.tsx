import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

const FreeRoute: React.FC<RouteProps> = (props: RouteProps) => {
  return <Route {...props} />;
};

export default FreeRoute;
