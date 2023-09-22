module.exports = (sequelize, DataTypes) => {
	const Withdrawals = sequelize.define('withdrawals', {
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
	return Withdrawals;
};
