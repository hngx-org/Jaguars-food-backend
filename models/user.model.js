import { sequelize } from './index.js';

import { DataTypes } from 'sequelize';
import { organization } from './organization.model.js';

const User = sequelize.define('users', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},

	org_id: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	first_name: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	last_name: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	profile_picture: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			isEmail: true,
		},
		unique: true,
	},
	phonenumber: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	password_hash: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	isAdmin: {
		type: DataTypes.BOOLEAN,
		allowNull: true,
		defaultValue: false,
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
		allowNull: true,
	},
	bank_code: {
		type: DataTypes.TEXT,
		allowNull: true,
	},

	bank_name: {
		type: DataTypes.TEXT,
		allowNull: true,
	},

	bank_region: {
		type: DataTypes.TEXT,
		allowNull: true,
	},

	currency: {
		type: DataTypes.TEXT,
		allowNull: true,
	},

	currency_code: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
});

User.belongsTo(organization, { foreignKey: 'org_id' });

export { User };
