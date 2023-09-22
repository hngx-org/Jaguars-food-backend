module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('users', {
		orgId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		profilePicture: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: '',
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true,
			},
			unique: true,
		},
		phoneNumber: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: '',
		},
		passwordHash: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: false,
		},
		launchCreditBalance: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: '',
		},
		refreshToken: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: '',
		},
		bankNumber: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: '',
		},
		bankCode: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: '',
		},

		bankName: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: '',
		},

		bankRegion: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: '',
		},

		currency: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: '',
		},

		currencyCode: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: '',
		},
	});
	return User;
};
