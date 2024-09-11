const Movie = require('../Model/MovieModel'); // Adjust the path as needed

// Create a new movie
exports.createMovie = async (req, res) => {
    try {
        const { image, name, description } = req.body;

        // Check if the movie already exists
        const existingMovie = await Movie.findOne({ name });
        if (existingMovie) {
            return res.status(400).json({ message: 'Movie already exists' });
        }

        const newMovie = new Movie({ image, name, description });
        await newMovie.save();

        res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
    } catch (error) {
        res.status(500).json({ message: 'Error creating movie', error });
    }
};

// Get all movies
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving movies', error });
    }
};

// Get a single movie by ID
exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving movie', error });
    }
};

// Update a movie by ID
exports.updateMovie = async (req, res) => {
    try {
        const { image, name, description } = req.body;
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            { image, name, description },
            { new: true } // Return the updated movie
        );

        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({ message: 'Movie updated successfully', movie: updatedMovie });
    } catch (error) {
        res.status(500).json({ message: 'Error updating movie', error });
    }
};

// Delete a movie by ID
exports.deleteMovie = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting movie', error });
    }
};
