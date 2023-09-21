const { app, PORT } = require('./config/config.js');
const db = require('./models/index.js');
// const { User } = require( './models/index.js';
// const './models/user.model.js';
// const './models/organization.model.js';
// const './models/lunches.model.js';
// const './models/withdrawals.model.js';

const startApp = async () => {
	db.connectToDatabase().then(() => {
		console.log('Database connection successful.');
		db.sequelize.sync({ force: false });
	});
	app.listen(PORT, () => {
		console.log(`Server started at port ${PORT}`);
	});
};

startApp();
