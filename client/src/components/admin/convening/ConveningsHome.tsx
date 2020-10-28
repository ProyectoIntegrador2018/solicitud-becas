import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import '../home/adminHome.css';

const ConveningsHome: React.FC<{}> = () => {
  const { path } = useRouteMatch();

  return (
    <div className="adminHome-layout">
      <div className="adminHome-content">
        <Link to={`${path}/lista`}>
          <button className="adminHome-option blue-gradient">Ver convocatorias</button>
        </Link>
        <Link to={`${path}/crear-convocatoria`}>
          <button className="adminHome-option green-gradient">Crear convocatoria</button>
        </Link>
        <Link to={`${path}/asociar-evaluaciones`}>
          <button className="adminHome-option red-gradient">Asociar evaluadores</button>
        </Link>
        <Link to={`${path}/asociar-areas`}>
          <button className="adminHome-option red-gradient">Asociar áreas</button>
        </Link>
        <Link to={`${path}/asociar-solicitudes`}>
          <button className="adminHome-option red-gradient">Asociar solicitudes</button>
        </Link>
      </div>
    </div>
  );
};

export default ConveningsHome;
