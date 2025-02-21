const express = require('express');
const router = express.Router();
const handleError = require('../utils/handleError'); // Error Handler

// Return all eras
router.get('/', async (req, res) => {
    try {
        // Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from art-server.js
            .from('eras')
            .select();

        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get eras");
    }
});

module.exports = router;