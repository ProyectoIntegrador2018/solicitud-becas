import React from 'react';
import { Switch, useRouteMatch, Route, Redirect } from 'react-router-dom';
import EvaluatorHome from './home/EvaluatorHome';
import EvaluatorRoute from '../../utils/router/EvaluatorRoute';
import EvaluatorAreas from './areas/EvaluatorAreas';
import EvaluateTable from './evaluate/EvaluateTable';

const Evaluator: React.FC<{}> = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <EvaluatorRoute path={`${path}/*`}>
        <Switch>
          <Route path={`${path}/:conv/:area`} component={EvaluateTable} />
          <Route path={`${path}/:conv`} component={EvaluatorAreas} />
          <Route path={`${path}`} component={EvaluatorHome} />
          <Redirect from={`${path}/*`} to={`${path}`} />
        </Switch>
      </EvaluatorRoute>
    </Switch>
  );
};

export default Evaluator;
