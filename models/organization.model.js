import { sequelize } from "./index.js";

import { DataTypes } from "sequelize";

const Organizations = sequelize.define(
  "organizations",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lauch_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    currency: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true, // This enables timestamps (createdAt and updatedAt)
    underscored: true, // This configures the column names to be in snake_case (e.g., created_at, updated_at)
  }
);

export { Organizations };
