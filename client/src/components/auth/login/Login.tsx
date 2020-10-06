import React from 'react';
import useAuth from '../../../utils/hooks/useAuth';
import GoogleBtn from '../../../GoogleBtn';

const Login: React.FC = () => {
  const { authenticated, loading } = useAuth();
  if (loading) return <div>Cargando...</div>;
  if (authenticated) return <div>Autenticado! Te debiste haber redirigido a /</div>;
  return <GoogleBtn />;
};

export default Login;
