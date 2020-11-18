import React from 'react';
import './header.css';
import { useHistory, Link } from 'react-router-dom';
import useAuth from '../../utils/hooks/useAuth';
import SecondaryButton from '../buttons/SecondaryButton';
import useWindowWidth from '../../utils/hooks/useWindowWidth';
import Logo from '../../assets/images/logo-i2t2.png';

const Header: React.FC = () => {
  const history = useHistory();
  const { admin, authenticated } = useAuth();
  const window = useWindowWidth();
  const getMarginRight = () => {
    if (window > 1000) return '75px';
    if (window > 900) return '50px';
    if (window > 800) return '40px';
    if (window > 700) return '35px';
    if (window > 600) return '30px';
    return '10px';
  };
  if (!authenticated) {
    return <></>;
  }
  return (
    <div className="header blue-gradient">
      <Link to="/">
        <img src={Logo} alt="Logo" />
      </Link>
      {window > 700 && (
        <h2 style={{ marginRight: getMarginRight() }}>{admin ? 'ADMINISTRADOR' : 'EVALUADOR'}</h2>
      )}
      <SecondaryButton text="regresar" handleClick={() => history.goBack()} />
    </div>
  );
};

export default Header;
