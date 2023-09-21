const OrganizationInvites = sequelize.define(
    "organization_invites",
    {
     
  
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: true,
      }

  });
  
  export { OrganizationInvites };