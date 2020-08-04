const moment = require('moment')
const { randomString } = require('../utils/helper')

module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    paranoid: true,
    getterMethods: {
      createdAt() {
        return moment(this.getDataValue('createdAt')).format()
      },
      updatedAt() {
        return moment(this.getDataValue('updatedAt')).format()
      },
    },
  })

  Session.generateAccess = async (id) => {
    let transaction = null
    try {
      transaction = await sequelize.transaction()

      await Session.destroy({ where: { userId: id }, transaction })

      const session = await Session.create({
        userId: id,
        token: randomString(20),
      }, { transaction })

      await transaction.commit()

      return session.token
    } catch (e) {
      if (transaction) await transaction.rollback()
      throw new Error('Generate access token error')
    }
  }

  return Session
}