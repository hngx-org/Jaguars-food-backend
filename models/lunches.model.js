module.exports = (sequelize, DataTypes) => {
	const Lunches = sequelize.define('lunches', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},

		org_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		senderId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		receiverId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},

		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},

		redeemed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		note: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	});
	return Lunches;
};
