const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const sequelize = require("./config/db"); // Sequelize config
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // handles JSON bodies
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/", userRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Server is Rendering ...");
});


// Server + Database sync
const PORT = process.env.PORT || 3012;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Database connected & synced");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });
