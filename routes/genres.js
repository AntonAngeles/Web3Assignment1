const express = require('express');
const router = express.Router();
const handleError = require('../utils/handleError'); 

// Returns all genres
router.get('/', async (req, res) => {
    try {
        // Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from art-server.js
            .from('genres')
            .select(
                'genreId, genreName, description, wikiLink, eras()'
            );

        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get genres");
    }

});

// Returns just the specified genre
router.get('/:ref', async (req, res) => {
    try {
        // Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from art-server.js
            .from('genres')
            .select(
                'genreId, genreName, description, wikiLink, eras()'
            )
            .eq('genreId', req.params.ref);

        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Specified search does not exist." }); 
        }

        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get genres");
    }
});

// Returns the genres used in a given painting
router.get('/painting/:ref', async (req, res) => {
    try {
        // Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from art-server.js
            .from('paintingGenres')
            .select(
                'paintings(title), genres(*)'
            )
            .eq('paintingId', req.params.ref)
            .order('genreName', { referencedTable: 'genres', ascending: true });
        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Specified search does not exist." }); 
        }

        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get genres");
    }
});

module.exports = router;