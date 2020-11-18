import { IEvaluation } from '../../evaluator/evaluator.types';

export interface IApplication {
  id: string;
  name: string;
  lastName: string;
  convening: string;
  area: string;
  evaluations: IEvaluation[];
}
