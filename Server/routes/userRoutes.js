const express = require("express");
const router = express.Router();

const UserControllers = require("../controllers/UserControllers");
router.get("/", (req, res) => {
  res.send("Hello NODE API");
});
router.get("/users", UserControllers.getAllUsers);
router.post("/users", UserControllers.createUser);
router.get("/users/:userId", UserControllers.getUserById);
router.put("/users/:userId", UserControllers.updateUser);
router.delete("/users/:userId", UserControllers.deleteUser);
module.exports = router;
