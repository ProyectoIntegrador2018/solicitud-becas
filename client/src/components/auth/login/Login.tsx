import React from 'react';
import useAuth from '../../../utils/hooks/useAuth';

const Login: React.FC = () => {
  const { authenticated, loading } = useAuth();
  if (loading) return <div>Cargando...</div>;
  if (authenticated) return <div>Autenticado! Te debiste haber redirigido a /</div>;
  return <div>No Autenticado! Debes estar viendo este mensaje ya que debes iniciar sesión</div>;
};

export default Login;
