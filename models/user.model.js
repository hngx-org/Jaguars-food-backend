<<<<<<< HEAD
import { sequelize } from './index.js';

import { DataTypes } from 'sequelize';
import { organization } from './organization.model.js';

const User = sequelize.define('users', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},

	org_id: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	first_name: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	last_name: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	profile_picture: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: true,
		validate: {
			isEmail: true,
		},
		unique: true,
	},
	phone_number: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	password_hash: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	isAdmin: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	launch_credit_balance: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	refresh_token: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	bank_number: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	bank_code: {
		type: DataTypes.TEXT,
		allowNull: true,
	},	
	bank_name: {
		type: DataTypes.TEXT,
		allowNull: true,
	},

	bank_region: {
		type: DataTypes.TEXT,
		allowNull: true,
	},

	currency: {
		type: DataTypes.TEXT,
		allowNull: true,
	},

	currency_code: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
});

User.belongsTo(organization, { foreignKey: 'org_id' });

export { User };
=======
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
>>>>>>> develop
