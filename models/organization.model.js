import { sequelize } from './index.js';

import { DataTypes } from 'sequelize';

const lunchWallet = sequelize.define('organization_lunch_wallet', {
	id: {
		allowNull: false,
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
	},
	org_id: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	balance: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 1000000,
	},
});

const organization = sequelize.define('organization', {
	id: {
		allowNull: false,
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
	},
	name: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	lunch_price: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	currency: {
		allowNull: false,
		type: DataTypes.STRING,
	},
});

const invites = sequelize.define('organization_invites', {
	id: {
		allowNull: false,
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
	},
	email: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	token: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	ttl: {
		allowNull: false,
		type: DataTypes.DATE,
	},
});

export { lunchWallet, organization, invites };
