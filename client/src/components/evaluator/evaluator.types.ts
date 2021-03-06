import { IGoogleUser } from '../auth/auth.types';
import { IApplication } from '../admin/applications/applications.types';
import { IArea } from '../admin/convening/convening.types';

export interface IEvaluator extends IGoogleUser {
  areas: IArea[];
  convocatoriaId: string;
  userGoogleId: string;
  user: IGoogleUser;
  id?: string;
}
export interface IEvaluation {
  comment: string;
  grade: number;
  evaluadoreId: string;
  solicitudeId?: string;
}
