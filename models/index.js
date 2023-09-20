import mysql2 from 'mysql2';

import { dev_dbconfig } from '../config/dbconfig.js';
import { Sequelize, DataTypes } from 'sequelize';

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
		},
	}
);

const connectToDatabase = async () => {
	return sequelize.authenticate();
};

export { sequelize, connectToDatabase };

// TODO:: This module would be eventually used to export the initialization of all models
// current code would move to config
