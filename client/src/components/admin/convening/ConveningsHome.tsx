import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { AREAS, EVALUATORS, APPLICATIONS } from './convening.types';
import AssociateModal from './associate/AssociateModal';
import '../home/adminHome.css';

const ConveningsHome: React.FC<{}> = () => {
  const { path } = useRouteMatch();
  const [open, setOpen] = useState(false);
  const [association, setAssociation] = useState(null);

  const handleOpen = (a: number) => {
    setAssociation(a);
    setOpen(true);
  };

  return (
    <>
      <div className="adminHome-layout">
        <div className="adminHome-content">
          <Link to={`${path}/lista`}>
            <button className="adminHome-option blue-gradient">Ver convocatorias</button>
          </Link>
          <Link to={`${path}/crear-convocatoria`}>
            <button className="adminHome-option blue-gradient">Crear convocatoria</button>
          </Link>
          <button
            className="adminHome-option light-blue-gradient tc-gray"
            onClick={() => handleOpen(EVALUATORS)}
          >
            Asociar evaluadores
          </button>
          <button
            className="adminHome-option light-blue-gradient tc-gray"
            onClick={() => handleOpen(AREAS)}
          >
            Asociar áreas
          </button>
          <button
            className="adminHome-option light-blue-gradient tc-gray"
            onClick={() => handleOpen(APPLICATIONS)}
          >
            Asociar solicitudes
          </button>
        </div>
      </div>
      <AssociateModal handleClose={() => setOpen(false)} isOpen={open} association={association} />
    </>
  );
};

export default ConveningsHome;
