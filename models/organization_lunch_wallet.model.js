module.exports = (sequelize, DataTypes) => {
	const LunchWallet = sequelize.define('organization_lunch_wallet', {
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
	return LunchWallet;
};
