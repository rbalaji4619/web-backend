require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true, // Aiven requires SSL
      rejectUnauthorized: false, // 🔥 Ignore self-signed certificate error
    },
  },
});

sequelize.authenticate()
  .then(() => console.log('✅ Connected to Aiven PostgreSQL'))
  .catch((err) => console.error('❌ Database connection failed:', err));

module.exports = sequelize;
