require('dotenv').config({ path: '.env' });
const sequelize = require('../config/dbconfig.js');
const { Sequelize } = require('sequelize');

const db = {};

const connectToDatabase = async () => {
	return sequelize.authenticate();
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.connectToDatabase = connectToDatabase;

// Models
db.lunches = require('./lunches.model.js')(sequelize, DataTypes);
db.organization = require('./organization.model.js')(sequelize, DataTypes);
db.organizationInvites = require('./organization_invites.model.js')(
	sequelize,
	DataTypes
);
db.organizationLunchWallet = require('./organization_lunch_wallet.model.js')(
	sequelize,
	DataTypes
);
db.user = require('./user.model.js')(sequelize, DataTypes);
db.withdrawals = require('./withdrawals.model.js')(sequelize, DataTypes);

// db.sequelize.sync({ force: true }).then(() => {
db.sequelize.sync({}).then(() => {
	console.log('Database sync done!');
});

// Relationships
db.lunches.belongsTo(db.user, { foreignKey: 'senderId' });
db.lunches.belongsTo(db.user, { foreignKey: 'receiverId' });
db.lunches.belongsTo(db.organization, { foreignKey: 'org_id' });
db.withdrawals.belongsTo(db.user, { foreignKey: 'user_id' });
db.organizationInvites.belongsTo(db.organization, {
	foreignKey: 'org_id',
	as: 'organization',
});
db.user.belongsTo(db.organization, { foreignKey: 'org_id' });

module.exports = db;
