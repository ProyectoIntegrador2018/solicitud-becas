"use strict";

import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";

export default class AuthorizedEmail extends Model {}

export interface AuthorizedEmailAttributes {
  email: string;
}

export interface AuthorizedEmailModel
  extends Model<AuthorizedEmailAttributes>,
    AuthorizedEmailAttributes {}

export type AuthorizedEmailStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): AuthorizedEmailModel;
};

export function AuthorizedEmailFactory(sequelize: Sequelize) {
  return <AuthorizedEmailStatic>sequelize.define("authorizedEmails", {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
  });
}
