"use strict";

import sequelize from "./index";
import { Model, DataTypes } from "sequelize";

export default class AuthorizedEmail extends Model {}

AuthorizedEmail.init(
  {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "AuthorizedEmail", // We need to choose the model name
  }
);

AuthorizedEmail.sync({ force: true });
