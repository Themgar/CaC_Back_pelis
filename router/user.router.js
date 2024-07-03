const express = require("express");
const router = express.Router();

const controller = require("../controller/user.controller");

router.get("/", controller.get_user);
router.get("/:id", controller.find_user);
router.post("/", controller.create_user);

module.exports=router;