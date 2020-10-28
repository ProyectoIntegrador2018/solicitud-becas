import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import '../home/adminHome.css';

const ConveningsHome: React.FC<{}> = () => {
  const { path } = useRouteMatch();

  return (
    <div className="adminHome-layout">
      <div className="adminHome-content">
        <Link to={`${path}/lista`}>
          <button className="adminHome-option blue-gradient">Ver aplicaciones</button>
        </Link>
      </div>
    </div>
  );
};

export default ConveningsHome;
