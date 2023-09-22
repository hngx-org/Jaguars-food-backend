const { NOW } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	const Invites = sequelize.define('organization_invites', {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true,
			},
		},
		token: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ttl: {
			allowNull: true,
			type: DataTypes.DATE,
			defaultValue: NOW,
		},
		org_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		isDeleted: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: false,
		},
	});
	return Invites;
};
