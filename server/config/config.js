// this file is javascript since we want to leave comments and that would mess
// up if it were a json file

module.exports = {
  development: {
    // for use in sequelize-cli, since it doesn't care about the use_env_variable
    url: "postgres://postgres:becas@127.0.0.1:5432/database_development",
    dialect: "postgres",
    // for use locally, and to keep it as close as the way we do it in production
    // you might need to run (in your terminal)
    // `source .sequelize_env` to modify the environment
    use_env_variable: "DATABASE_URL",
  },
  production: {
    dialect: "postgres",
    use_env_variable: "DATABASE_URL",
  },
};
