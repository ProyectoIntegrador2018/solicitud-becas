import React from 'react';
import { Switch, useRouteMatch, Route, Redirect } from 'react-router-dom';
import EvaluatorHome from './home/EvaluatorHome';
import EvaluatorRoute from '../../utils/router/EvaluatorRoute';

const Evaluator: React.FC<{}> = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <EvaluatorRoute path={`${path}/*`}>
        <Switch>
          <Route path={`${path}/home`} component={EvaluatorHome} />
          <Redirect from={`${path}/*`} to={`${path}/home`} />
        </Switch>
      </EvaluatorRoute>
    </Switch>
  );
};

export default Evaluator;
