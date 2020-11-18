"use strict";

import { Sequelize } from "sequelize";

import { AreaFactory, AreaStatic } from "./area";
import { ConvocatoriaFactory, ConvocatoriaStatic } from "./convocatoria";
import { UserFactory, UserStatic } from "./user";
import {
  AuthorizedEmailFactory,
  AuthorizedEmailStatic,
} from "./authorizedEmail";

import config from "../config/config";

export interface DB {
  sequelize: Sequelize;
  Convocatoria: ConvocatoriaStatic;
  Area: AreaStatic;
  AuthorizedEmail: AuthorizedEmailStatic;
  User: UserStatic;
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

Convocatoria.hasMany(Area);
Area.belongsTo(Convocatoria);

export const db: DB = {
  sequelize,
  Area,
  Convocatoria,
  AuthorizedEmail,
  User,
};

sequelize.sync({ force: true });
