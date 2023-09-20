import app, { PORT } from "./config/config.js";
import { sequelize, connectToDatabase, syncDB } from "./models/index.js";


const startApp = async () => {
  await connectToDatabase().then(() => {
    console.log("Database connection successful.");
    syncDB();
  });
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
};

startApp();
