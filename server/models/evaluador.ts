"use strict";

import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

import { ConvocatoriaStatic } from "./convocatoria";
import { UserStatic } from "./user";

export interface EvaluadorAttributes {
  id: number;
  userEmail: string;
  convocatoriaId: string;
}

export interface EvaluadorModel
  extends Model<EvaluadorAttributes>,
    EvaluadorAttributes {}

export type EvaluadorStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): EvaluadorModel;
};

export function EvaluadorFactory(
  sequelize: Sequelize,
  convocatoria: ConvocatoriaStatic,
  user: UserStatic
) {
  return <EvaluadorStatic>sequelize.define("evaluadores", {
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
    userEmail: {
      type: DataTypes.STRING,
      references: {
        model: user,
        key: "email",
      },
    },
  });
}
