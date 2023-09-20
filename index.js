import app, { PORT } from "./config/config.js";

import { sequelize, connectToDatabase } from "./models/index.js";

const startApp = async () => {
  await connectToDatabase().then(() => {
    console.log("Database connection successful.");
  });
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
};

startApp();
