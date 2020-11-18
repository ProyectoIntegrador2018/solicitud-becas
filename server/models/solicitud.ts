"use strict";

// import sequelize from "./index";
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

export interface SolicitudAttributes {
  id: string;
  name: string;
}

export interface SolicitudModel
  extends Model<SolicitudAttributes>,
    SolicitudAttributes {}

export type SolicitudStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): SolicitudModel;
};

export function SolicitudFactory(sequelize: Sequelize) {
  return <SolicitudStatic>sequelize.define("solicitudes", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
}

// export interface IApplication {
//   id: string;
//   name: string;
//   lastName: string;
//   convening: string;
//   area: string;
//   evaluations: IEvaluation[];
// }
