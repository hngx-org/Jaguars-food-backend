const { app, PORT } = require("./config/config");
const { connectToDatabase } = require("./models");

require("dotenv").config({ path: ".env" });

const startApp = async () => {
  connectToDatabase().then(() => {
    console.log("Database connection successful.");
  });
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
};

startApp();
