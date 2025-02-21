const express = require('express');
const router = express.Router();
const handleError = require('../utils/handleError');

// return all galleries
router.get('/', async (req, res) => {
    try {
        const { data, error } = await req.app.get('supabase')
            .from('galleries')
            .select();

        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get galleries");
    }
});

// returns a specified gallery
router.get('/:ref', async (req, res) => {
    try {
        const { data, error } = await req.app.get('supabase')
            .from('galleries')
            .select()
            .eq('galleryId', req.params.ref);

        if (data === null) {
            return res.status(404).json({ message: 'No galleries found' }); // Or handle it differently
        }

        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: 'No galleries found' });
        }
        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get galleries");
    }
});

// returns the galleries whos country begins with the provided substring
router.get('/country/:string', async (req, res) => {
    try {
        const string = req.params.string;
        const { data, error } = await req.app.get('supabase')
            .from('galleries')
            .select()
            .ilike('galleryCountry', `%${string}%`);

        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Country not found." });
        }
        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get galleries");
    }
});

module.exports = router;