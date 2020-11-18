"use strict";

import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

export interface UserAttributes {
  googleId: string;
  givenName: string;
  familyName: string;
  email: string;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

export function UserFactory(sequelize: Sequelize) {
  return <UserStatic>sequelize.define("users", {
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
  });
}
