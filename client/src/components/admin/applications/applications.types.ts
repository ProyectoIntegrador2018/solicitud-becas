import { IEvaluation } from '../../evaluator/evaluator.types';
import { IConvening } from '../convening/convening.types';

export interface IApplication {
  id: string;
  name: string;
  convocatoria?: IConvening;
  area?: IArea;
  areaId: string;
  evaluaciones?: IEvaluation[];
}

export interface IArea {
  convocatoriaId: string;
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
}
