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
		defaultValue: 0
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
		allowNull: true,
		defaultValue: 0
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
		allowNull: false,
	},
	password_hash: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	isAdmin: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	launch_credit_balance: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: "none"
	},
	refresh_token: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: "none"
	},
	bank_number: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: "none"
	},
	bank_code: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: "none"
	},

	bank_name: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: "none"
	},

	bank_region: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: "none"
	},

	currency: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: "none"
	},

	currency_code: {
		type: DataTypes.TEXT,
		allowNull: true,
		defaultValue: "none"
	},
});

User.belongsTo(organization, { foreignKey: 'org_id' });

export { User };
