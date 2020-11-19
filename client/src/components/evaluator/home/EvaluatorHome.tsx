import React from 'react';
import useAuth from '../../../utils/hooks/useAuth';
import { Link } from 'react-router-dom';
import './evaluatorHome.css';

const EvaluatorHome: React.FC<{}> = () => {
  const { convenings = ['Conv1', 'Conv2'] } = useAuth();

  return (
    <div className="evaluatorHome-layout">
      <div className="evaluatorHome-content">
        {convenings.map(c => {
          return (
            <Link key={c} to={`/evaluador/${c}`}>
              <button className="evaluatorHome-option blue-gradient">{c}</button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default EvaluatorHome;
