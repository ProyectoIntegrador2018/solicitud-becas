import React from 'react';
import { Link } from 'react-router-dom';

import PrimaryButton from '../../buttons/PrimaryButton';
import SecondaryButton from '../../buttons/SecondaryButton';
import TextInput from '../../input/TextInput';
import Title from '../../title/Title';
import FieldLabel from '../../labels/field-label/FieldLabel';
import './createConvening.css';

const CreateConvening: React.FC = () => {
  return (
    <main className="layout">
      <div className="createConvening-layout">
        <Title text="Crea una nueva convocatoria" size={2} />
        <div className="createConvening-content">
          <div className="createConvening-name">
            <FieldLabel htmlFor="convening-name" text="Nombre de la convocatoria" />
            <TextInput id="convening-name" />
          </div>
          <div className="createConvening-fatInputs">
            <div className="createConvening-fatInput">
              <FieldLabel htmlFor="areas" text="Areas, separadas por coma" />
              <TextInput id="areas" size="fat" placeholder="Quimica, Matemáticas, Economía" />
            </div>
            <div className="createConvening-fatInput">
              <FieldLabel htmlFor="evaluators" text="Correos, separados por coma" />
              <TextInput
                id="evaluators"
                size="fat"
                placeholder="jorge@gmail.com, pedro@gmail.com"
              />
            </div>
          </div>
          <div className="createConvening-buttons">
            <Link to="/">
              <SecondaryButton text="Cancelar" />
            </Link>
            <PrimaryButton text="Crear" type="submit" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateConvening;
