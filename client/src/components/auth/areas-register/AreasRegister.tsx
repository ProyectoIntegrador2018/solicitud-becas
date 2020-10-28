import React from 'react';
import useAuth from '../../../utils/hooks/useAuth';
import Title from '../../title/Title';
import PrimaryButton from '../../buttons/PrimaryButton';
import FieldLabel from '../../labels/field-label/FieldLabel';
import AreasCheckboxes from './areas-checkboxes/AreasCheckboxes';
import './areasRegister.css';
import { useHistory } from 'react-router-dom';

const hardCodedOptions = () => {
  return [
    'Quimica',
    'Mate',
    'Economia',
    'Ciencia',
    'Programacion',
    'Baile',
    'Deportes',
    'Arte',
    'Biotec',
    'Astrofisica',
    'Ingenieria',
    'Arquitectura',
  ];
};

const AreasRegister: React.FC = () => {
  const { loading } = useAuth();
  const history = useHistory();
  if (loading) return <div>Cargando...</div>;
  return (
    <div className="areasRegister-layout">
      <Title size={2} text="Registra tus areas" />
      <div className="areasRegister-checkboxes">
        <FieldLabel text="Selecciona las areas en las que participarás" htmlFor="email" />
        <AreasCheckboxes areas={hardCodedOptions()} />
      </div>
      <div className="areasRegister-button">
        <Title size={5} text="Nota: solo lo podrás hacer una vez" />
        <span style={{ marginTop: '10px' }}>
          <PrimaryButton text="Registrar" type="submit" handleClick={() => history.push('./')} />
        </span>
      </div>
    </div>
  );
};

export default AreasRegister;
