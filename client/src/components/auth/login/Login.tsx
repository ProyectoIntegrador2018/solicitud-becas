import React from 'react';
import useAuth from '../../../utils/hooks/useAuth';
import Title from '../../title/Title';
import PrimaryButton from '../../buttons/PrimaryButton';
import TextInput from '../../input/TextInput';
import './login.css';
import FieldLabel from '../../labels/field-label/FieldLabel';

const Login: React.FC = () => {
  const { loading, fetchUser } = useAuth();
  if (loading) return <div>Cargando...</div>;
  return (
    <main className="layout">
      <div className="login-layout">
        <div className="login-title">
          <Title size={1} text="¡Bienvenido!" />
        </div>
        <div className="login-actions">
          <div className="login-email">
            <FieldLabel text="Ingresa con tu gmail" htmlFor="email" />
            <TextInput placeholder="ejemplo@gmail.com" id="email" size="l" />
          </div>
          <PrimaryButton text="Iniciar Sesión" type="submit" handleClick={fetchUser} />
        </div>
      </div>
    </main>
  );
};

export default Login;
