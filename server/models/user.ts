"use strict";

import sequelize from "./index";
import { Model, DataTypes } from "sequelize";

export default class User extends Model {}

User.init(
  {
    googleId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    givenName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    familyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name
  }
);

// User.sync({ force: true });
