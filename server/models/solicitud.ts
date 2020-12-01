"use strict";

// import sequelize from "./index";
import {
  Sequelize,
  HasManyAddAssociationMixin,
  Model,
  DataTypes,
  BuildOptions,
} from "sequelize";

import { EvaluacionModel } from "./evaluacion";

export interface SolicitudAttributes {
  id: string;
  name: string;
  convocatoriaId: string;
}

export interface SolicitudModel
  extends Model<SolicitudAttributes>,
    SolicitudAttributes {
  addEvaluacione: HasManyAddAssociationMixin<EvaluacionModel, number>;
}

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
