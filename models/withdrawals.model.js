import { sequelize } from './index.js';

import { DataTypes } from 'sequelize';

import { User } from './user.model.js';

const Withdrawals = sequelize.define('withdrawals', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},

	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	status: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	amount: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

Withdrawals.belongsTo(User, { foreignKey: 'user_id' });

export { Withdrawals };
