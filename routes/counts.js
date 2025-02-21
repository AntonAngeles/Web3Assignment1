const express = require('express');
const router = express.Router();
const handleError = require('../utils/handleError');

// Returns the genre name and number of painting for each genre
router.get('/genres', async (req, res) => {
    try {
        // Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from art-server.js
            .from('genres')
            .select('genreName, paintingGenres!inner(count)');

        // Process the data so that we can order the counts
        const processedData = data.map(item => ({
            genreName: item.genreName,
            paintingCount: item.paintingGenres[0]?.count || 0,
        }));

        // Now sort by paintingCount (ascending or descending)
        processedData.sort((a, b) => a.paintingCount - b.paintingCount); // Ascending

        res.send(processedData);
    } catch (err) {
        handleError(res, err, "Failed to get counts");
    }

});

// Returns artists name and number of paintings artist
router.get('/artists', async (req, res) => {
    try {
        // Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from art-server.js
            .from('artists')
            .select('firstName, lastName, paintings!inner(count)');

        // Process the data so that we can order the counts
        const processedData = data.map(item => ({
            firstName: item.firstName,
            lastName: item.lastName,
            paintingCount: item.paintings[0]?.count || 0
        }));

        // Now sort by paintingCount (ascending or descending)
        processedData.sort((a, b) => b.paintingCount - a.paintingCount); // Descending

        if (error) {
            return (res.status(404).json({ message: "Not found." }));
        }
        res.send(processedData);
    } catch (err) {
        handleError(res, err, "Failed to get counts");
    }
});

// Returns genre name and number of paintings. specified minimum count
router.get("/topgenres/:ref", async (req, res) => {
    try {
        const minCount = parseInt(req.params.ref);
        
        // Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from art-server.js
            .from("genres")
            .select("genreName, paintingGenres!inner(count)");

        // Process the data so that we can order the counts
        const processedData = data
            .map((item) => ({
                genreName: item.genreName,
                paintingCount: item.paintingGenres[0]?.count || 0,
            }))
            .filter((item) => item.paintingCount > minCount);

        // Now sort by paintingCount (ascending or descending)
        processedData.sort((a, b) => b.paintingCount - a.paintingCount); // most to least

        if (processedData.length === 0) {
            // Check for empty data array
            return res
                .status(404)
                .json({ message: "Specified search does not exist." });
        }

        res.send(processedData);
    } catch (err) {
        handleError(res, err, "Failed to get counts");
    }
});

module.exports = router;