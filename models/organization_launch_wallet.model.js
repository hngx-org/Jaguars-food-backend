import { sequelize } from "./index.js";

import { DataTypes } from "sequelize";

import { User } from "./user.model.js";
import { Organizations } from "./organization.model.js";

const OrganizationLunchWallet = sequelize.define(
  "organization_lunch_wallets",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    balance: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    org_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true, // This enables timestamps (createdAt and updatedAt)
    underscored: true, // This configures the column names to be in snake_case (e.g., created_at, updated_at)
  }
);

OrganizationLunchWallet.belongsTo(Organizations, { foreignKey: "org_id" });

export { OrganizationLunchWallet };
