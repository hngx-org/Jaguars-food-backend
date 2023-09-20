import { sequelize } from "./index.js";

import { DataTypes } from "sequelize";

import { User } from "./user.model.js";
import { Organizations } from "./organization.model.js";

const OrganizationInvites = sequelize.define(
  "organization_invites",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    org_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    token: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TTL: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true, // This enables timestamps (createdAt and updatedAt)
    underscored: true, // This configures the column names to be in snake_case (e.g., created_at, updated_at)
  }
);

OrganizationInvites.belongsTo(Organizations, {
  foreignKey: "org_id",
  as: "organization",
});

export { OrganizationInvites };
