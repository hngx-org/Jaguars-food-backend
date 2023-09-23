const APP_URL = process.env.APP_URL;
const HOST = process.env.MYSQL_ADDON_HOST || "127.0.0.1";
const USER = process.env.MYSQL_ADDON_USER || "root";
const PASSWORD = process.env.MYSQL_ADDON_PASSWORD || "";
const DB = process.env.MYSQL_ADDON_DB || "jaguar_food_app";
const MAIL_USERNAME = process.env.MAIL_USERNAME;
const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
const MAIL_FROM_ADDRESS = process.env.MAIL_FROM_ADDRESS;

module.exports = {
  APP_URL,
  HOST,
  USER,
  PASSWORD,
  DB,
  MAIL_USERNAME,
  MAIL_HOST,
  MAIL_PASSWORD,
  MAIL_FROM_ADDRESS,
};
