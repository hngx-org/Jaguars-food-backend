import app, { PORT } from "./config/config.js";

const startApp = async () => {
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
};

startApp();
