const express = require('express');
const router = express.Router();

// Insert Model
const User = require('../Model/UserModel');

// Insert User Controllers
const UserController = require('../Controllers/UserController');

// Define routes
router.post('/', UserController.createUser); // POST /users
router.get('/', UserController.getAllUsers);  // GET /users
router.get('/:id', UserController.getUserById); // GET /users/:id
router.put('/:id', UserController.updateUser); // PUT /users/:id
router.delete('/:id', UserController.deleteUser); // DELETE /users/:id

module.exports = router;
