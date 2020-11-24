"use strict";

import {
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
  Sequelize,
  Model,
  DataTypes,
  BuildOptions,
} from "sequelize";

import { ConvocatoriaStatic } from "./convocatoria";
import { UserStatic } from "./user";
import { AreaModel } from "./area";

export interface EvaluadorAttributes {
  id: number;
  convocatoriaId: string;
  userGoogleId: string;
}

export interface EvaluadorModel
  extends Model<EvaluadorAttributes>,
    EvaluadorAttributes {
  addAreas: HasManyAddAssociationsMixin<AreaModel, string>;
  setAreas: HasManySetAssociationsMixin<AreaModel, string>;
}

export type EvaluadorStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): EvaluadorModel;
};

export function EvaluadorFactory(
  sequelize: Sequelize,
  convocatoria: ConvocatoriaStatic,
  user: UserStatic
) {
  return <EvaluadorStatic>sequelize.define(
    "evaluadores",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      convocatoriaId: {
        type: DataTypes.STRING,
        references: {
          model: convocatoria,
          key: "id",
        },
      },
      userGoogleId: {
        type: DataTypes.STRING,
        references: {
          model: user,
          key: "googleId",
        },
      },
    },
    {
      // you should not be able to add the same user  multiple times as a
      // evaluador to a convocatoria
      indexes: [
        {
          unique: true,
          fields: ["convocatoriaId", "userGoogleId"],
        },
      ],
    }
  );
}
