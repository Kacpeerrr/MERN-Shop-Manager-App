const express = require('express')
const router = express.Router()
const { registerUser, loginUser, logout, getUser } = require('../controllers/userController')

router.post("/rejestracja", registerUser);
router.post("/logowanie", loginUser);
router.get("/wylogowanie", logout);
router.get("/uzytkownik", getUser);

module.exports = router
