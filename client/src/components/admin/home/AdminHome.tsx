import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import './adminHome.css';

const AdminHome: React.FC<{}> = () => {
  const { path } = useRouteMatch();

  return (
    <div className="adminHome-layout">
      <div className="adminHome-content">
        <Link to={`${path}/convocatorias`}>
          <button className="adminHome-option blue-gradient">Convocatorias</button>
        </Link>
        <Link to={`${path}/solicitudes/lista`}>
          <button className="adminHome-option blue-gradient">Ver todas las solicitudes</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
