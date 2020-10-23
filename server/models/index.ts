"use strict";

import { Sequelize } from "sequelize";

const node_env = process.env.NODE_ENV || "development";

const config = require(__dirname + "/../config/config.js")[node_env];

let DB_URI = process.env[config.use_env_variable];

if (DB_URI === undefined) {
  throw new Error("DB_URI should not be undefined !");
}

const sequelize = new Sequelize(DB_URI);

export default sequelize;
