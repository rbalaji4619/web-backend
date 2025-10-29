require('dotenv').config();
const { Sequelize } = require('sequelize');

<<<<<<< HEAD
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: process.env.NODE_ENV === 'production'
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Render/Postgres needs this
        },
      }
    : {},
=======
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
>>>>>>> 6a701fa (database change)
});

sequelize.authenticate()
  .then(() => console.log('✅ Connected to Aiven PostgreSQL'))
  .catch((err) => console.error('❌ Database connection failed:', err));

module.exports = sequelize;
