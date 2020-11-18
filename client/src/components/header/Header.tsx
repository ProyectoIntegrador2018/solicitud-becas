import React from 'react';
import './header.css';
import { useHistory } from 'react-router-dom';
import useAuth from '../../utils/hooks/useAuth';
import SecondaryButton from '../buttons/SecondaryButton';
import useWindowWidth from '../../utils/hooks/useWindowWidth';

const Header: React.FC = () => {
  const history = useHistory();
  const { admin, authenticated } = useAuth();
  const window = useWindowWidth();
  const getMarginLeft = () => {
    if (window > 1000) return '75px';
    if (window > 900) return '70px';
    if (window > 800) return '60px';
    if (window > 700) return '50px';
    if (window > 600) return '40px';
    return '10px';
  };
  if (!authenticated) {
    return <></>;
  }
  return (
    <div className="header blue-gradient">
      <h2>LOGO</h2>
      {window > 550 && (
        <h2 style={{ marginLeft: getMarginLeft() }}>{admin ? 'ADMINISTRADOR' : 'EVALUADOR'}</h2>
      )}
      <SecondaryButton text="regresar" handleClick={() => history.goBack()} />
    </div>
  );
};

export default Header;
