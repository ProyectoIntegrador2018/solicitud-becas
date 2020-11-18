"use strict";

// import sequelize from "./index";
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

export interface EvaluacionAttributes {
  id: number;
  grade: number;
  comment: string;
}

export interface EvaluacionModel
  extends Model<EvaluacionAttributes>,
    EvaluacionAttributes {}

export type EvaluacionStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): EvaluacionModel;
};

export function EvaluacionFactory(sequelize: Sequelize) {
  return <EvaluacionStatic>sequelize.define("evaluaciones", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    grade: {
      type: DataTypes.INTEGER,
    },
    comment: {
      type: DataTypes.STRING,
    },
  });
}
