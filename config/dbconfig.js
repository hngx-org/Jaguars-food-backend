const mysql2 = require("mysql2");
const { Sequelize } = require("sequelize");
const { HOST, USER, PASSWORD, DB } = require("../utils/constants");
require("dotenv").config({ path: ".env" });

const dev_dbconfig = {
  HOST,
  USER,
  PASSWORD,
  DB,
  dialect: "mysql",

  pool: {
    max: 100,
    min: 0,
    accuire: 30000,
    idle: 10000,
  },
};

const sequelize = new Sequelize(
  dev_dbconfig.DB,
  dev_dbconfig.USER,
  dev_dbconfig.PASSWORD,
  {
    host: dev_dbconfig.HOST,
    dialect: dev_dbconfig.dialect,
    dialectModule: mysql2,
    pool: {
      max: dev_dbconfig.pool.max,
      min: dev_dbconfig.pool.min,
      acquire: dev_dbconfig.pool.accuire,
      idle: dev_dbconfig.pool.idle,
    },
    define: {
      freezeTableName: true,
      timestamps: true, // This enables timestamps (createdAt and updatedAt)
      underscored: true, // This configures the column names to be in snake_case
    },
  }
);

module.exports = sequelize;
