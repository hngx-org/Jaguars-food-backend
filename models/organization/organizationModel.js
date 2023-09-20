import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../index.js";

const OrganizationModel = sequelize.define('OrganizationModel', {
    organization_name: {
        type: DataTypes.STRING,
        unique: true,
    },
    currency_code: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
    lunch_price: DataTypes.INTEGER,
});

export {OrganizationModel } 