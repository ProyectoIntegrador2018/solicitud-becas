import { IEvaluator } from '../../evaluator/evaluator.types';
import { IApplication } from '../applications/applications.types';

export const AREAS = 1;
export const EVALUATORS = 2;
export const APPLICATIONS = 3;
export interface IConvening {
  id: string;
  name: string;
  evaluationStartDate: Date;
  evaluationEndDate: Date;
  solicitudes?: IApplication[];
  areas?: IArea[];
  evaluadores?: IEvaluator[];
  createdAt: Date;
  updatedAt: Date;
  authorizedEmails: any[];
}

export interface IArea {
  convocatoriaId: string;
  createdAt: string;
  id: string;
  name: string;
  solicitudes: IApplication[];
  updatedAt: string;
  pk: string;
}
