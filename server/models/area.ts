"use strict";

// import sequelize from "./index";
import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

export interface AreaAttributes {
  id: string;
  name: string;
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

// export interface AreaAttributes {
//   id: string;
//   name: string;
// }

// export default class Area extends Model<AreaAttributes> {
//   public id!: string;
//   public name!: string;

//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
// }

// Area.init(
//   {
//     id: {
//       type: DataTypes.STRING,
//       primaryKey: true,
//       allowNull: false,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     // Other model options go here
//     sequelize, // We need to pass the connection instance
//     modelName: "Area", // We need to choose the model name
//   }
// );
