"use strict";

// import sequelize from "./index";
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

export interface AreaAttributes {
  id: string;
  name: string;
  // because of the relation
  convocatoriaId: string;
}

export interface AreaModel extends Model<AreaAttributes>, AreaAttributes {}

export type AreaStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): AreaModel;
};

export function AreaFactory(sequelize: Sequelize) {
  return <AreaStatic>sequelize.define("areas", {
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
