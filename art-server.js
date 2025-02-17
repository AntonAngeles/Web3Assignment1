const express = require('express');
const supa = require ('@supabase/supabase-js');
const app = express()

const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqZ2ptbnNxZHlrZmFlbmFteWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2Njc3ODYsImV4cCI6MjA1NTI0Mzc4Nn0.K3AowBtPWEvXkBmWPSAS8giZUkOZDUaY3a-bEPLy5nE"
const URL = "https://cjgjmnsqdykfaenamydn.supabase.co"

const supabase = supa.createClient(URL, anonKey)

// /api/eras
app.get('/api/eras', async (req, res) => {
    const {data, error} = await supabase
        .from('eras')
        .select();
    res.send(data);
});

// /api/galleries
app.get('/api/galleries', async (req, res) => {
    const {data, error} = await supabase
        .from('galleries')
        .select();
    res.send(data);
});

// ref
app.get('/api/galleries/:ref', async (req, res) => {
    const {data, error} = await supabase
        .from('galleries')
        .select()
        .eq('galleryId', req.params.ref);
    res.send(data);
});

// country
app.get('api/galleries/country/:string', async (req, res) => {
    const string = req.params.string;
    const {data, error} = await supabase
        .from('galleries')
        .select()
        .ilike('galleryCountry', `%${string}%`);
    res.send(data);
});

app.listen(8080, () => {
    console.log('listening on port 8080');
    console.log('http://localhost:8080/api/eras');
    console.log('http://localhost:8080/api/galleries');
    console.log('http://localhost:8080/api/galleries/30');
    console.log('http://localhost:8080/api/galleries/Calgary');
    console.log('http://localhost:8080/api/galleries/country/fra');
});