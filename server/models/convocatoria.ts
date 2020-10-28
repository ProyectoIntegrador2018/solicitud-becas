"use strict";

import sequelize from "./index";
import { Model, DataTypes } from "sequelize";

export interface ConvocatoriaAttributes {
  id: string;
  name: string;
  evaluationStartDate: Date;
  evaluationEndDate: Date;
}

export default class Convocatoria
  extends Model<ConvocatoriaAttributes>
  implements ConvocatoriaAttributes {
  public id!: string;
  public name!: string;
  public evaluationStartDate!: Date;
  public evaluationEndDate!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Convocatoria.init(
  {
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
      // allowNull: false,
    },
    evaluationEndDate: {
      type: DataTypes.DATEONLY,
      // allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Convocatoria", // We need to choose the model name
  }
);

Convocatoria.sync({ force: true });
