import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './evaluatorAreas.css';

const EvaluatorAreas: React.FC<{}> = () => {
  const { pathname } = useLocation();

  // api call to get areas with the conv in the url param
  // meanwhile
  const areas = ['Mate', 'Progra', 'Ciencia'];

  return (
    <div className="evaluatorAreas-layout">
      <div className="evaluatorAreas-content">
        {areas.map(a => {
          return (
            <Link key={a} to={`${pathname}/${a}`}>
              <button className="evaluatorAreas-option blue-gradient">{a}</button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default EvaluatorAreas;
