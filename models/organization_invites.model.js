module.exports = (sequelize, DataTypes) => {
	const Invites = sequelize.define('organization_invites', {
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
	return Invites;
};
