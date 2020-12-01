import React from 'react';
import { IApplication } from '../../applications/applications.types';
import PrimaryButton from '../../../buttons/PrimaryButton';
import SpringModal from '../../../modal/Modal';
import './evaluationModal.css';
import SecondaryButton from '../../../buttons/SecondaryButton';

interface IProps {
  application: IApplication;
  isOpen: boolean;
  handleClose: any;
  evaluationIndex: number;
  convening: string;
}
const EvaluationModal: React.FC<IProps> = (props: IProps) => {
  const { application, isOpen, handleClose, evaluationIndex, convening } = props;

  // const { givenName: evName, familyName: evLastName } = application.evaluaciones[
  //   evaluationIndex
  // ].evaluadoreId;

  const name = application.evaluaciones[evaluationIndex].evaluadoreId;

  const { grade, comment } = application.evaluaciones[evaluationIndex];

  return (
    <SpringModal isOpen={isOpen} handleClose={handleClose}>
      <div className="evaluationModal">
        <h3>{convening}</h3>
        <h2>Rúbrica virtual – EVALUACIÓN RECIBIDA</h2>
        <div className="evaluationModal-info">
          <span>
            <strong> Solicitante:</strong> {application.name}
          </span>
          <span>
            {/* <strong>Evaluador:</strong> {evName} {evLastName} */}
            <strong>Evaluador:</strong> {name}
          </span>
        </div>
        <div className="evaluationModal-data">
          <span>
            <strong>Calificación:</strong> {grade}
          </span>
          <span>
            <strong>Comentarios:</strong> {comment}{' '}
          </span>
        </div>
        <div className="evaluationModal-file">
          {/* <a download href=""> */}
          <SecondaryButton text="Bajar adjunto" />
          {/* </a> */}
        </div>
        <div className="evaluationModal-buttons">
          <PrimaryButton text="Cerrar" handleClick={handleClose} />
          <SecondaryButton text="Deshabilitar evaluación" />
        </div>
      </div>
    </SpringModal>
  );
};

export default EvaluationModal;
