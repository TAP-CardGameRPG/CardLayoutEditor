const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/cards.sqlite',
  logging: false
})

let initialized = false
async function init () {
  if (initialized) return
  initialized = true
  await sequelize.sync({ alter: true })
}

class Card extends Model {
}

Card.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  modelName: 'card',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
})

async function getCard (id) {
  await init()
  return await Card.findOne({
    where: {
      id: id
    }
  })
}

async function findCards (query = {}) {
  await init()
  return await Card.findAll(query)
}

async function createCard () {
  await init()
  return await Card.create()
}

module.exports = {
  getCard,
  findCards,
  createCard
}
