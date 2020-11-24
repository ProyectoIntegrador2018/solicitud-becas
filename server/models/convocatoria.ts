'use strict';

import {
  Sequelize,
  Model,
  DataTypes,
  BuildOptions,
  HasManyRemoveAssociationsMixin,
  BelongsToManyAddAssociationsMixin
} from 'sequelize';

import { AreaModel } from './area';
import { AuthorizedEmailModel } from './authorizedEmail';

export interface ConvocatoriaAttributes {
  id: string;
  name: string;
  evaluationStartDate: Date;
  evaluationEndDate: Date;
  areas: [AreaModel];
}

export interface ConvocatoriaModel
  extends Model<ConvocatoriaAttributes>,
    ConvocatoriaAttributes {
  removeAreas: HasManyRemoveAssociationsMixin<AreaModel, string>;
  addAuthorizedEmails: BelongsToManyAddAssociationsMixin<
    AuthorizedEmailModel,
    string
  >;
}

export type ConvocatoriaStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ConvocatoriaModel;
};

export function ConvocatoriaFactory(sequelize: Sequelize) {
  return <ConvocatoriaStatic>sequelize.define('convocatorias', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    evaluationStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    evaluationEndDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  });
}
