const express = require('express');
const router = express.Router();
const LoginController = require('../../controllers/LoginController');

const {checkToken} = require("../../utils/tokenProcessor");

// post login
router.post('/login', LoginController.postLogin);
// logout
router.post('/logout', checkToken, (req, res) =>{
    res.json({message: "Logout successful"})
});

module.exports = router;
