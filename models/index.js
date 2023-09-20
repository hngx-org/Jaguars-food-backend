import { dev_dbconfig } from "../config/dbconfig.js";

import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(
  dev_dbconfig.DB,
  dev_dbconfig.USER,
  dev_dbconfig.PASSWORD,
  {
    host: dev_dbconfig.HOST,
    dialect: dev_dbconfig.dialect,
    pool: {
      max: dev_dbconfig.pool.max,
      min: dev_dbconfig.pool.min,
      acquire: dev_dbconfig.pool.accuire,
      idle: dev_dbconfig.pool.idle,
    },
  }
);

const connectToDatabase = () => {
  return sequelize.authenticate();
};

export { sequelize, connectToDatabase };
