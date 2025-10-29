// models/Contact.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Contact = sequelize.define(
  "Contact",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    companyname: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
  },
  {
    timestamps: true,
    tableName: "contact",
  }
);

module.exports = Contact;
