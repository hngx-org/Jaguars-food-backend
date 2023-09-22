import { sequelize } from './index.js';
import { DataTypes } from 'sequelize';

const lunchWallet = sequelize.define('organization_lunch_wallet', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	org_id: {
		allowNull: false,
		type: DataTypes.INTEGER,
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
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	name: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	email: {
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
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
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
	org_id: {
		allowNull: false,
		type: DataTypes.INTEGER,
	},
});

// Relationships
lunchWallet.belongsTo(organization, { foreignKey: 'org_id' });
invites.belongsTo(organization, { foreignKey: 'org_id', as: 'organization' });

export { lunchWallet, organization, invites };
