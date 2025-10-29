const express = require("express");
const controller = require("../controllers/userController");
const router = express.Router();

router.post("/contact",controller.createContact);

module.exports = router;