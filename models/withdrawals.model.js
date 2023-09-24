module.exports = (sequelize, DataTypes) => {
  const Withdrawals = sequelize.define('withdrawals', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM('success', 'pending'),
      allowNull: true,
      defaultValue: 'success',
    },
    amount: {
      type: DataTypes.DOUBLE(10, 2),
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
  return Withdrawals;
};
