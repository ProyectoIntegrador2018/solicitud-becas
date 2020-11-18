import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import RegisterAdminModal from '../register-admin-modal/RegisterAdminModal';
import './adminHome.css';

const AdminHome: React.FC<{}> = () => {
  const { path } = useRouteMatch();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="adminHome-layout">
        <div className="adminHome-content">
          <Link to={`${path}/convocatorias`}>
            <button className="adminHome-option blue-gradient">Convocatorias</button>
          </Link>
          <Link to={`${path}/solicitudes/lista`}>
            <button className="adminHome-option blue-gradient">Ver todas las solicitudes</button>
          </Link>
          <button className="adminHome-option green-gradient" onClick={() => setOpen(true)}>
            Registrar administrador
          </button>
        </div>
      </div>
      <RegisterAdminModal handleClose={() => setOpen(false)} isOpen={open} />
    </>
  );
};

export default AdminHome;
