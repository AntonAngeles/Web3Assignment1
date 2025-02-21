const express = require('express');
const router = express.Router();
const handleError = require('../utils/handleError'); // Error Handler

// returns all artists
router.get('/', async (req, res) => {
    try {
        // Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from art-server.js
            .from('artists')
            .select();

        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get artists");
    }
});

// returns the specified artist
router.get('/:ref', async (req, res) => {
    try {// Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from art-server.js
            .from('artists')
            .select()
            .eq('artistId', req.params.ref);

        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Artist not found." }); 
        }
        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get artists");
    }
});

// returns the artists whose last name begins with the provided substring
router.get('/search/:string', async (req, res) => {
    try {
        const string = req.params.string;// Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from art-server.js
            .from('artists')
            .select()
            .ilike('lastName', `%${string}%`);

        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Artist not found." }); 
        }
        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get artists");
    }
});

// returns artists whose nationality begins with the provided substring
router.get('/country/:string', async (req, res) => {
    try {
        const string = req.params.string;// Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from art-server.js
            .from('artists')
            .select()
            .ilike('nationality', `%${string}%`);

        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Specified country not found." }); 
        }
        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get artists");
    }
});

module.exports = router;