"use strict";

// import sequelize from "./index";
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

export interface AreaAttributes {
  pk?: number;
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
  return <AreaStatic>sequelize.define(
    "areas",
    {
      pk: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // you should not be able to add multiple areas with the same id for a
      // single convocatoria
      indexes: [
        {
          unique: true,
          fields: ["convocatoriaId", "id"],
        },
      ],
    }
  );
}
