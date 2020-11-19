import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../buttons/PrimaryButton';
import TextInput from '../input/TextInput';
import useAuth from '../../utils/hooks/useAuth';
import Title from '../title/Title';
import './home.css';

const Home: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="home-layout">
      <Title text={user.givenName} size={1} />
      <Link to="/registrar-areas">
        <PrimaryButton
          text="Botón primario --> click para form registro de areas"
          handleClick={() => console.log('click primario')}
        />
      </Link>
      <Link to="/admin/">
        <PrimaryButton text="Admin homepage" />
      </Link>
      <Link to="/evaluador/">
        <PrimaryButton text="Evaluador homepage" />
      </Link>
      <TextInput id="prueba" placeholder="Un placeholder..." />
    </div>
  );
};

export default Home;
