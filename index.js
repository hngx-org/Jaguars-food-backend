import app, { PORT } from "./config/config.js";

import { sequelize, connectToDatabase } from "./models/index.js";

connectToDatabase().then(() => {
  console.log("Database connection successful.");
});

const startApp = async () => {
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
};

startApp();
