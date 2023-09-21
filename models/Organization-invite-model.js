import { sequelize } from './index.js';
import { DataTypes } from 'sequelize';

const OrganizationInvites = sequelize.define('organization_invites', {
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
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export { OrganizationInvites };
