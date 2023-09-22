const { app, PORT } = require('./config/config.js');
// const db = require('./models');

require('dotenv').config({ path: '.env' });

const startApp = async () => {
	connectToDatabase().then(() => {
		console.log('Database connection successful.');
		// sequelize.sync({ force: true });
	});
	app.listen(PORT, () => {
		console.log(`Server started at port ${PORT}`);
	});
};

startApp();
