const express = require('express');
const authController = require('../controllers/registerController');
const router = express.Router();

// Register User
router.post('/register', authController.registerUser);

// Login User
router.post('/login', authController.loginUser);

// Get User by Email
router.get('/:email', authController.getUserByEmail);

module.exports = router;
