export const dev_dbconfig = {
  HOST: "127.0.0.1",
  USER: "root",
  PASSWORD: "",
  DB: "jaguar_food_app",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    accuire: 30000,
    idle: 10000,
  },
};
