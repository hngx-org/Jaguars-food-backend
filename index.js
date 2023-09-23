const { app, PORT } = require("./config/config");

require("dotenv").config({ path: ".env" });

const startApp = async () => {
	app.listen(PORT, () => {
		console.log(`Server is up and running at port ${PORT}`);
	});
};

startApp();
