const {
    login,
    register,
    logout,
    addAvatar
  } = require("../controllers/authController");
  
  const router = require("express").Router();
  
  router.post("/login", login);
  router.post("/register", register);
  router.post("/addAvatar/:id", addAvatar);
  router.post("/logout/:id", logout);
  
  module.exports = router;