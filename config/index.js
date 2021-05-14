require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 3000,
  DB: process.env.DB_MONGO_PROD || null
}
