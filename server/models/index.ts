"use strict";

import { Sequelize } from "sequelize";

const node_env = process.env.NODE_ENV || "development";

import config from "../config/config";

const configJson = config[node_env];

const DB_URI =
  node_env === "production"
    ? process.env[configJson.use_env_variable]
    : configJson.url;

if (DB_URI === undefined) {
  throw new Error("DB_URI should not be undefined !");
}

const sequelize = new Sequelize(DB_URI);

export default sequelize;
