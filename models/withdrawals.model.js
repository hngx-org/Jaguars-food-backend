module.exports = (sequelize, DataTypes) => {
	const Withdrawals = sequelize.define('withdrawals', {
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: '',
		},
		status: {
			type: DataTypes.ENUM('success', 'pending'),
			allowNull: false,
		},
		amount: {
			type: DataTypes.DOUBLE(10, 2),
			allowNull: false,
		},
		isDeleted: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: false,
		},
	});
	return Withdrawals;
};
