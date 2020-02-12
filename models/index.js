const Sequelize = require('sequelize');
const db = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite',
});

const Track = db.define('tracks', {
  item_tag: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  item: Sequelize.STRING,
  username: Sequelize.STRING,
  discord_id: Sequelize.STRING,
  value: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  current_progress: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  }
});

module.exports = {
  db,
  Track
}
