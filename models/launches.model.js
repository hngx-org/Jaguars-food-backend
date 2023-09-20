import { sequelize } from "./index.js";

import { DataTypes } from "sequelize";

import { User } from "./user.model.js";
import { Organizations } from "./organization.model.js";

const Launches = sequelize.define(
  "launches",
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
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    redeemed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true, // This enables timestamps (createdAt and updatedAt)
    underscored: true, // This configures the column names to be in snake_case (e.g., created_at, updated_at)
  }
);

Launches.belongsTo(User, { foreignKey: "receiverId" });

Launches.belongsTo(User, { foreignKey: "senderId" });

Launches.belongsTo(Organizations, { foreignKey: "org_id" });

export { Launches };
