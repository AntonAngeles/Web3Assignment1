const express = require('express');
const router = express.Router();
const handleError = require('../utils/handleError'); // Error Handler

// Returns all paintings
router.get('/', async (req, res) => {
    try {
        // Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from art-server.js
            .from('paintings')
            .select(
                'paintingId, imageFileName, title, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, wikiLink, jsonAnnotations, artists(*), galleries(*)'
            )
            .order('title', { ascending: true });

        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get paintings");
    }
});

// Returns sort by title or year of work
router.get('/sort/:sortBy', async (req, res) => {
    try {
        const sortBy = req.params.sortBy;
        let orderBy = 'title'; // Default to order by Title

        if (sortBy === 'year') { // If year is called
            orderBy = 'yearOfWork';
        }
        
        // Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from art-server.js
            .from('paintings')
            .select(
                'paintingId, imageFileName, title, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, wikiLink, jsonAnnotations, artists(*), galleries(*)'
            )
            .order(orderBy, { ascending: true });

        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get paintings");
    }
});

// Returns the specified painting
router.get('/:ref', async (req, res) => {
    try {
        // Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from art-server.js
            .from('paintings')
            .select(
                'paintingId, imageFileName, title, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, wikiLink, jsonAnnotations, artists(*), galleries(*)'
            )
            .eq('paintingId', req.params.ref)
            .order('title', { ascending: true });

        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Specified paintings not found." }); 
        }

        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get paintings");
    }
});

// returns the paintings whose title contains the provided substring
router.get('/search/:string', async (req, res) => {
    try {
        // Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from art-server.js
            .from('paintings')
            .select(
                'paintingId, imageFileName, title, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, wikiLink, jsonAnnotations, artists(*), galleries(*)'
            )
            .ilike('title', `%${req.params.string}%`)
            .order('title', { ascending: true });
        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Specified search does not exist." }); 
        }
        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get paintings");
    }
});

// Returns the paintings between two years
router.get('/years/:start/:end', async (req, res) => {
    try {
        const start = req.params.start;
        const end = req.params.end;

        // Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from art-server.js
            .from('paintings')
            .select(
                'paintingId, imageFileName, title, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, wikiLink, jsonAnnotations, artists(*), galleries(*)'
            )
            .gte('yearOfWork', start)
            .lte('yearOfWork', end)
            .order('yearOfWork', { ascending: true });

        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Specified search doesnt exist and/or end year is earlier than the start." }); 
        }
        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get paintings");
    }

});

// Returns all the paintings in a given gallery
router.get('/galleries/:ref', async (req, res) => {
    try {// Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from art-server.js
            .from('paintings')
            .select(
                'paintingId, imageFileName, title, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, wikiLink, jsonAnnotations, artists(*), galleries(*)'
            )
            .eq('galleryId', req.params.ref)
            .order('title', { ascending: true });

        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Specified search does not exist." }); 
        }
        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get paintings");
    }
});

// Retruns all the paintings by a given artist
router.get('/artist/:ref', async (req, res) => {
    try {// Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from art-server.js
            .from('paintings')
            .select(
                'paintingId, imageFileName, title, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, wikiLink, jsonAnnotations, artists(*), galleries(*)'
            )
            .eq('artistId', req.params.ref)
            .order('title', { ascending: true });

        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Specified search does not exist." }); 
        }
        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get paintings");
    }
});

// Returns all the artists whose nationality begins with the provided substring
router.get('/artist/country/:ref', async (req, res) => {
    try {// Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from art-server.js
            .from('paintings')
            .select(
                'paintingId, imageFileName, title, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, wikiLink, jsonAnnotations, artists!inner(*), galleries(*)'
            )
            .ilike('artists.nationality', `%${req.params.ref}%`)
            .order('title', { ascending: true });

        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Specified search does not exist." }); 
        }

        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get paintings");
    }
});

// Returns all the paintings for a given genre
router.get('/genre/:ref', async (req, res) => {
    try {// Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from art-server.js
            .from('paintingGenres')
            .select(
                'genres(genreName),paintings(paintingId, title, yearOfWork)'
            )
            .eq('genreId', req.params.ref);
        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Specified search does not exist." }); 
        }
        res.send(data);
    } catch (err) {
        handleError(res, err, "Failed to get paintings");
    }
});

// Returns all the paintings for a given genre
router.get('/era/:ref', async (req, res) => {
    try {// Provide Supabase Query Builder Query
        const { data, error } = await req.app.get('supabase') // Take the supabase instance in the request from art-server.js
            .from('paintingGenres')
            .select('genres!inner(eraId), paintings(paintingId, title, yearOfWork)')
            .eq('genres.eraId', req.params.ref);

        // Process the data into something that we can order and readable
        const processedData = data.map(item => ({
            paintingID: item.paintings.paintingId,
            title: item.paintings.title,
            year: item.paintings.yearOfWork,
            eraID: item.genres.eraId,
        }));

        // Sort by the year
        processedData.sort((a, b) => a.year - b.year); // Ascending

        if (processedData.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Specified search does not exist." }); 
        }
        res.send(processedData);
    } catch (err) {
        handleError(res, err, "Failed to get paintings");
    }
});

module.exports = router;
