const express = require('express');
const router = express.Router();

// Insert Model
const Movie = require('../Model/MovieModel');

// Insert Movie Controllers
const MovieController = require('../Controllers/MovieController');

// Define routes
router.post('/Movie', MovieController.createMovie); // POST /movies
router.get('/Movie', MovieController.getAllMovies);  // GET /movies
router.get('/Movie:id', MovieController.getMovieById); // GET /movies/:id
router.put('/Movie:id', MovieController.updateMovie); // PUT /movies/:id
router.delete('/Movie:id', MovieController.deleteMovie); // DELETE /movies/:id

module.exports = router;
