const express = require('express');
const supa = require('@supabase/supabase-js');
const app = express()

const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqZ2ptbnNxZHlrZmFlbmFteWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2Njc3ODYsImV4cCI6MjA1NTI0Mzc4Nn0.K3AowBtPWEvXkBmWPSAS8giZUkOZDUaY3a-bEPLy5nE"
const URL = "https://cjgjmnsqdykfaenamydn.supabase.co"

const supabase = supa.createClient(URL, anonKey)

// /api/eras
app.get('/api/eras', async (req, res) => {
    const { data, error } = await supabase
        .from('eras')
        .select();
    res.send(data);
});

// /api/galleries
app.get('/api/galleries', async (req, res) => {
    const { data, error } = await supabase
        .from('galleries')
        .select();
    res.send(data);
});

// ref
app.get('/api/galleries/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('galleries')
        .select()
        .eq('galleryId', req.params.ref);
    res.send(data);
});

// country
app.get('/api/galleries/country/:string', async (req, res) => {
    const string = req.params.string;
    const { data, error } = await supabase
        .from('galleries')
        .select()
        .ilike('galleryCountry', `%${string}%`);
    res.send(data);
});

// artist routes
app.get('/api/artists', async (req, res) => {
    const { data, error } = await supabase
        .from('artists')
        .select();
    res.send(data);
});

app.get('/api/artists/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('artists')
        .select()
        .eq('artistId', req.params.ref);
    res.send(data);
});

app.get('/api/artists/search/:string', async (req, res) => {
    const string = req.params.string;
    const { data, error } = await supabase
        .from('artists')
        .select()
        .ilike('lastName', `%${string}%`);
    res.send(data);
});

app.get('/api/artists/country/:string', async (req, res) => {
    const string = req.params.string;
    const { data, error } = await supabase
        .from('artists')
        .select()
        .ilike('nationality', `%${string}%`);
    res.send(data);
});

// paintings routes
app.get('/api/paintings', async (req, res) => {
    const { data, error } = await supabase
        .from('paintings')
        .select(
            'paintingId, imageFileName, title, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, wikiLink, jsonAnnotations, artists(*), galleries(*)'
        )
        .order('title', { ascending: true });
    res.send(data);
});

app.get('/api/paintings/sort/:sortBy', async (req, res) => {
    const sortBy = req.params.sortBy;

    let orderBy = 'title';

    if (sortBy === 'year') {
        orderBy = 'yearOfWork';
    }

    const { data, error } = await supabase
        .from('paintings')
        .select(
            'paintingId, imageFileName, title, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, wikiLink, jsonAnnotations, artists(*), galleries(*)'
        )
        .order(orderBy, { ascending: true });
    res.send(data);
});

app.get('/api/paintings/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('paintings')
        .select(
            'paintingId, imageFileName, title, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, wikiLink, jsonAnnotations, artists(*), galleries(*)'
        )
        .eq('paintingId', req.params.ref)
        .order('title', { ascending: true });
    res.send(data);
});

app.get('/api/paintings/search/:string', async (req, res) => {
    const {data, error} = await supabase
        .from('paintings')
        .select(
            'paintingId, imageFileName, title, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, wikiLink, jsonAnnotations, artists(*), galleries(*)'
        )
        .ilike('title', `%${req.params.string}%`)
        .order('title', { ascending: true });
    res.send(data);
});

app.get('/api/paintings/years/:start/:end', async (req, res) => {
    const start = req.params.start;
    const end = req.params.end;

    const {data, error} = await supabase
        .from('paintings')
        .select(
            'paintingId, imageFileName, title, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, wikiLink, jsonAnnotations, artists(*), galleries(*)'
        )
        .gte('yearOfWork', start)
        .lte('yearOfWork', end)
        .order('yearOfWork', {ascending: true});
    res.send(data);
});

app.get('/api/paintings/galleries/:ref', async (req, res) => {
    const {data, error} = await supabase
        .from('paintings')
        .select(
            'paintingId, imageFileName, title, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, wikiLink, jsonAnnotations, artists(*), galleries(*)'
        )
        .eq('galleryId', req.params.ref)
        .order('title', { ascending: true });
    res.send(data);
});

app.get('/api/paintings/artist/:ref', async (req, res) => {
    const {data, error} = await supabase
        .from('paintings')
        .select(
            'paintingId, imageFileName, title, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, wikiLink, jsonAnnotations, artists(*), galleries(*)'
        )
        .eq('artistId', req.params.ref)
        .order('title', { ascending: true });
    res.send(data);
});

// join required here
app.get('/api/paintings/artist/country/:ref', async (req, res) => {
    const {data, error} = await supabase
        .from('paintings')
        .select(
            'paintingId, imageFileName, title, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, wikiLink, jsonAnnotations, artists!inner(*), galleries(*)'
        )
        .ilike('artists.nationality', `%${req.params.ref}%`)
        .order('title', { ascending: true });
    res.send(data);
});

// genres
app.get('/api/genres', async (req, res) => {
    const {data, error} = await supabase
        .from('genres')
        .select(
            'genreId, genreName, eras(*), description, wikiLink'
        );
    res.send(data);
});

app.get('/api/genres/:ref', async (req, res) => {
    const {data, error} = await supabase
        .from('genres')
        .select(
            'genreId, genreName, eras(*), description, wikiLink'
        )
        .eq('genreId', req.params.ref);
    res.send(data);
});

app.get('/api/genres/painting/:ref ', async (req, res) => {
    const {data, error} = await supabase
        .from('genres')
        .select(
            'genreId, genreName, eras(*), description, wikiLink'
        )
        .eq('genreId', req.params.ref);
    res.send(data);
});

// painting genres
app.get('/api/painting/genre/:ref', async (req, res) => {
    const {data, error} = await supabase
        .from('paintingGenres')
        .select(
            'paintings(title),genres(*)'
        );
    res.send(data);
});

app.listen(8080, () => {
    console.log('listening on port 8080');
    console.log('http://localhost:8080/api/eras');
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
    console.log('http://localhost:8080/api/genres/painting/408'); // need to fix
    console.log('http://localhost:8080/api/painting/genre/78'); // need to fix
});