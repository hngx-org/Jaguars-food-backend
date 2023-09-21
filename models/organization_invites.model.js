module.exports = (sequelize, DataTypes) => {
	const Invites = sequelize.define('organization_invites', {
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
	return Invites;
};
