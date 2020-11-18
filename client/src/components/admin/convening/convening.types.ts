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
  areasCount: number;
  evaluatorsCount: number;
  applicationsCount: number;
  applications: IApplication[];
  areas: string[];
  evaluators: IEvaluator[];
  createdAt: Date;
  updatedAt: Date;
}
