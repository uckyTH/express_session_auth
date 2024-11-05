const { fetchUserOwn } = require("../controller/User");
const router = require("express").Router();

router.get("/own", fetchUserOwn);


module.exports = router;
