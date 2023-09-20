import { sequelize } from './index.js';

import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},

	org_id: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	first_name: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	last_name: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	profile_picture: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	email: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	phonenumber: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	password_hash: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	isAdmin: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	},
	launch_credit_balance: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	refresh_token: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	bank_number: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	bank_code: {
		type: DataTypes.TEXT,
		allowNull: false,
	},

	bank_name: {
		type: DataTypes.TEXT,
		allowNull: false,
	},

	bank_region: {
		type: DataTypes.TEXT,
		allowNull: false,
	},

	currency: {
		type: DataTypes.TEXT,
		allowNull: false,
	},

	currency_code: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
});

const syncWithDb = () => {
	User.sync({ force: true })
		.then(() => {
			console.log('Models synced successfully.');
		})
		.catch((error) => {
			console.error('Error syncing models:', error);
		});
};

export { User, syncWithDb };
