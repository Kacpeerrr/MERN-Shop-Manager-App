const express = require('express')
const router = express.Router()
const { registerUser, loginUser, logout, getUser, loginStatus, updateUser, changePassword } = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');

router.post("/rejestracja", registerUser);
router.post("/logowanie", loginUser);
router.get("/wylogowanie", logout);
router.get("/uzytkownik", protect, getUser);
router.get("/zalogowano", loginStatus);
router.patch("/edycja", protect, updateUser);
router.patch("/zmienhaslo", protect, changePassword);

module.exports = router
