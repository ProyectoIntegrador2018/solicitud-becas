import React from 'react';
import useAuth from '../../../utils/hooks/useAuth';
import Title from '../../title/Title';
import GoogleButton from '../google/GoogleButton';
import FieldLabel from '../../labels/field-label/FieldLabel';
import Spinner from '../../../utils/spinner/Spinner';
import './login.css';

const Login: React.FC = () => {
  const { loading } = useAuth();
  if (loading) return <Spinner />;
  return (
    <div className="login-layout">
      <div className="login-title">
        <Title size={1} text="¡Bienvenido!" />
      </div>
      <div className="login-actions">
        <FieldLabel text="Ingresa con tu cuenta de Google" htmlFor="email" />
        <GoogleButton />
      </div>
    </div>
  );
};

export default Login;
