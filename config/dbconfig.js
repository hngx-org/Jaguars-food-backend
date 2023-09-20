export const dev_dbconfig = {
  HOST: process.env.MYSQL_ADDON_HOST || "127.0.0.1",
  USER: process.env.MYSQL_ADDON_USER || "root",
  PASSWORD: process.env.MYSQL_ADDON_PASSWORD || "",
  DB: process.env.MYSQL_ADDON_DB || "jaguar_food_app",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    accuire: 30000,
    idle: 10000,
  },
};
