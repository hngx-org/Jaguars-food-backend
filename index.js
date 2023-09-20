import app, { PORT, syncDB } from "./config/config.js";

import { sequelize, connectToDatabase } from "./models/index.js";
// import { syncWithDb } from "./models/user.model.js";

connectToDatabase().then(() => {
  console.log("Database connection successful.");
});

const startApp = async () => {
  await syncDB();
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
};

startApp();
