const { app, PORT } = require("./config/config.js");
// const db = require('./models');

require("dotenv").config({ path: ".env" });

const startApp = async () => {
  app.listen(PORT, () => {
    console.log(`Server is up and running at port ${PORT}`);
  });
};

startApp();
