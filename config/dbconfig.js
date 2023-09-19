module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "jaguars-food-app",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    accuire: 30000,
    idle: 10000,
  },
};
