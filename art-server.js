const express = require('express');
const supa = require('@supabase/supabase-js');
const app = express()

// APIKEY and URL for supabase sitting in .env file
const anonKey = process.env.APIKEY;
const URL = process.env.URL;
const supabase = supa.createClient(URL, anonKey)

// Make supabase instance available to all instances
app.set('supabase', supabase); 

// Import modules of all routes
const eraRoutes = require('./routes/eras');
const galleriesRoutes = require('./routes/galleries');
const artistsRoutes = require('./routes/artists');
const paintingsRoutes = require('./routes/paintings');
const genresRoutes = require('./routes/genres');
const countsRoutes = require('./routes/counts');

// Mount the specific routes with the respective API route calls
app.use('/api/eras', eraRoutes);
app.use('/api/galleries', galleriesRoutes);
app.use('/api/artists', artistsRoutes);
app.use('/api/paintings', paintingsRoutes);
app.use('/api/genres', genresRoutes);
app.use('/api/counts', countsRoutes);

// Run the server locally
app.listen(8080, () => {
    console.log('listening on port 8080');
    console.log('http://localhost:8080/api/eras'); // Bunch of URLS to test quickly
    console.log('http://localhost:8080/api/galleries');
    console.log('http://localhost:8080/api/galleries/30');
    console.log('http://localhost:8080/api/galleries/Calgary');
    console.log('http://localhost:8080/api/galleries/country/fra');
    console.log('http://localhost:8080/api/artists');
    console.log('http://localhost:8080/api/artists/12');
    console.log('http://localhost:8080/api/artists/12234523');
    console.log('http://localhost:8080/api/artists/search/ma');
    console.log('http://localhost:8080/api/artists/search/mA');
    console.log('http://localhost:8080/api/artists/country/fra');
    console.log('http://localhost:8080/api/paintings');
    console.log('http://localhost:8080/api/paintings/sort/year');
    console.log('http://localhost:8080/api/paintings/63');
    console.log('http://localhost:8080/api/paintings/search/port');
    console.log('http://localhost:8080/api/paintings/search/pORt');
    console.log('http://localhost:8080/api/paintings/years/1800/1850');
    console.log('http://localhost:8080/api/paintings/galleries/5');
    console.log('http://localhost:8080/api/paintings/artist/16');
    console.log('http://localhost:8080/api/paintings/artist/666');
    console.log('http://localhost:8080/api/paintings/artist/country/ital');
    console.log('http://localhost:8080/api/genres');
    console.log('http://localhost:8080/api/genres/76');
    console.log('http://localhost:8080/api/genres/painting/408');
    console.log('http://localhost:8080/api/paintings/genre/78');
    console.log('http://localhost:8080/api/paintings/era/2');
    console.log('http://localhost:8080/api/counts/genres');
    console.log('http://localhost:8080/api/counts/artists');
    console.log('http://localhost:8080/api/counts/topgenres/20');
});