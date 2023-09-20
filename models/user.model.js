import { sequelize } from "./index.js";

import { DataTypes } from "sequelize";
import { Organizations } from "./organization.model.js";

const User = sequelize.define(
  "users",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    org_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    phonenumber: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    launch_credit_balance: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    bank_number: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    bank_code: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    bank_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    bank_region: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    currency: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    currency_code: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true, // This enables timestamps (createdAt and updatedAt)
    underscored: true, // This configures the column names to be in snake_case (e.g., created_at, updated_at)
  }
);

User.belongsTo(Organizations, { foreignKey: "org_id" });

export { User };