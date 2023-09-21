import { sequelize } from "./index.js";
import { DataTypes } from "sequelize";
import { User } from "./user.model.js";
import { organization } from "./organization.model.js";

const Lunches = sequelize.define("lunches", {
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
});

Lunches.belongsTo(User, { foreignKey: "receiverId" });
Lunches.belongsTo(User, { foreignKey: "senderId" });
Lunches.belongsTo(organization, { foreignKey: "org_id" });

export { Lunches };
