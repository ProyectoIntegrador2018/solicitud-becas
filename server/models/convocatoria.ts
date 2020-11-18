"use strict";

import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

export interface ConvocatoriaAttributes {
  id: string;
  name: string;
  evaluationStartDate: Date;
  evaluationEndDate: Date;
}

export interface ConvocatoriaModel
  extends Model<ConvocatoriaAttributes>,
    ConvocatoriaAttributes {}

export type ConvocatoriaStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ConvocatoriaModel;
};

export function ConvocatoriaFactory(sequelize: Sequelize) {
  return <ConvocatoriaStatic>sequelize.define("convocatorias", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    evaluationStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    evaluationEndDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });
}
