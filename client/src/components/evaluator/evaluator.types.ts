import { IGoogleUser } from '../auth/auth.types';
import { IApplication } from '../admin/applications/applications.types';

export interface IEvaluator extends IGoogleUser {
  areas: string[];
  convening: string;
}
export interface IEvaluation {
  comment: string;
  grade: number;
  evaluator: IEvaluator;
  application?: IApplication;
}
