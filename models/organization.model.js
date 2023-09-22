module.exports = (sequelize, DataTypes) => {
	const organization = sequelize.define('organizations', {
		name: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		currency_code: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		lunch_price: {
			allowNull: false,
			type: DataTypes.DOUBLE(10, 2),
		},
		isDeleted: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: false,
		},
	});
	return organization;
};
