const APP_URL = process.env.APP_URL;
const HOST = process.env.MYSQL_ADDON_HOST || '127.0.0.1';
const USER = process.env.MYSQL_ADDON_USER || 'root';
const PASSWORD = process.env.MYSQL_ADDON_PASSWORD || '';
const DB = process.env.MYSQL_ADDON_DB || 'jaguar_food_app';

module.exports = { APP_URL, HOST, USER, PASSWORD, DB };
