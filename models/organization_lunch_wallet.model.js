module.exports = (sequelize, DataTypes) => {
	const LunchWallet = sequelize.define('organization_lunch_wallets', {
		org_id: {
			allowNull: false,
			type: DataTypes.INTEGER,
			unique: true,
		},
		balance: {
			type: DataTypes.DOUBLE(10, 2),
			allowNull: false,
			defaultValue: 0,
		},
		isDeleted: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: false,
		},
	});
	return LunchWallet;
};
