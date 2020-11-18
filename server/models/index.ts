"use strict";

import { Sequelize } from "sequelize";

import { AreaFactory, AreaStatic } from "./area";
import { ConvocatoriaFactory, ConvocatoriaStatic } from "./convocatoria";
import { UserFactory, UserStatic } from "./user";
import {
  AuthorizedEmailFactory,
  AuthorizedEmailStatic,
} from "./authorizedEmail";

import { SolicitudFactory, SolicitudStatic } from "./solicitud";

import config from "../config/config";

// instructions/checklist for adding new models:
// 1. add a new model in /models/<new model>.ts
// 2. import it here
// 3. add its Static interface to the DB interface
// 4. add a call to it's factory
// 5. add any relations
// 6. export it in the DB object

export interface DB {
  sequelize: Sequelize;
  Convocatoria: ConvocatoriaStatic;
  Area: AreaStatic;
  AuthorizedEmail: AuthorizedEmailStatic;
  User: UserStatic;
  Solicitud: SolicitudStatic;
}

const node_env = process.env.NODE_ENV || "development";

const configJson = config[node_env];

const DB_URI =
  node_env === "production"
    ? process.env[configJson.use_env_variable]
    : configJson.url;

if (DB_URI === undefined) {
  throw new Error("DB_URI should not be undefined !");
}

const sequelize = new Sequelize(DB_URI);

const Area = AreaFactory(sequelize);
const Convocatoria = ConvocatoriaFactory(sequelize);
const AuthorizedEmail = AuthorizedEmailFactory(sequelize);
const User = UserFactory(sequelize);
const Solicitud = SolicitudFactory(sequelize);

Convocatoria.hasMany(Area);
Area.belongsTo(Convocatoria);

// Los evaluadores pueden estar en varias convocatorias
Convocatoria.belongsToMany(User, { through: "convocatoria_has_evaluadores" });
User.belongsToMany(Convocatoria, { through: "convocatoria_has_evaluadores" });

// Un evaluador puede tener 1 o más areas asignadas
// User.hasMany(Area, {
//   as: { singular: "areaAsignada", plural: "areasAsignadas" },
// });
// Area.belongsTo(User);

// Una convocatoria tiene muchas solicitudes, una solicitud tiene 1 convocatoria
Convocatoria.hasMany(Solicitud);
Solicitud.belongsTo(Convocatoria);

// Solicitud solo puede tener 1 area
Area.hasMany(Solicitud);
Solicitud.belongsTo(Area);

export const db: DB = {
  sequelize,
  Area,
  Convocatoria,
  AuthorizedEmail,
  User,
  Solicitud,
};

// THIS LINE SHOULD NOT BE COMMITED IF PRODUCTION DATABASE HAS REAL DATA
sequelize.sync({ force: true });
