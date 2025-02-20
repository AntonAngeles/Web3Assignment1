const express = require('express');
const supa = require('@supabase/supabase-js');
const app = express()

const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqZ2ptbnNxZHlrZmFlbmFteWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2Njc3ODYsImV4cCI6MjA1NTI0Mzc4Nn0.K3AowBtPWEvXkBmWPSAS8giZUkOZDUaY3a-bEPLy5nE"
const URL = "https://cjgjmnsqdykfaenamydn.supabase.co"

const supabase = supa.createClient(URL, anonKey)

// Return all erras
app.get('/api/eras', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('eras')
            .select();

        if (error) {
            return (res.status(404).json({ message: "Not found." }));
        }
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

// return all galleries
app.get('/api/galleries', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('galleries')
            .select();

        if (error) {
            return (res.status(404).json({ message: "Not found." }));
        }
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

// returns a specified gallery
app.get('/api/galleries/:ref', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('galleries')
            .select()
            .eq('galleryId', req.params.ref);
        if (error) {
            return (res.status(404).json({ message: "Gallery specified not found." }));
        }
        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Gallery not found." }); 
        }
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

// returns the galleries whos country begins with the provided substring
app.get('/api/galleries/country/:string', async (req, res) => {
    try {
        const string = req.params.string;
        const { data, error } = await supabase
            .from('galleries')
            .select()
            .ilike('galleryCountry', `%${string}%`);

        if (error) {
            return (res.status(404).json({ message: "No galleries found for that country" }));
        }
        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Country not found." }); 
        }
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

// returns all artists
app.get('/api/artists', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('artists')
            .select();

        if (error) {
            return (res.status(404).json({ message: "No artists found." }));
        }
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

// returns the specified artist
app.get('/api/artists/:ref', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('artists')
            .select()
            .eq('artistId', req.params.ref);

        if (error) {
            return (res.status(404).json({ message: "Specified artist not found." }));
        }
        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Artist not found." }); 
        }
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

// returns the artists whose last name begins with the provided substring
app.get('/api/artists/search/:string', async (req, res) => {
    try {
        const string = req.params.string;
        const { data, error } = await supabase
            .from('artists')
            .select()
            .ilike('lastName', `%${string}%`);

        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Artist not found." }); 
        }
        if (error) {
            return (res.status(404).json({ message: "Specified last name of artist not found." }));
        }
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

// returns artists whose nationality begins with the provided substring
app.get('/api/artists/country/:string', async (req, res) => {
    try {
        const string = req.params.string;
        const { data, error } = await supabase
            .from('artists')
            .select()
            .ilike('nationality', `%${string}%`);

        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Specified country not found." }); 
        }
        if (error) {
            return (res.status(404).json({ message: "Specified country not found." }));
        }
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

// returns all paintings
app.get('/api/paintings', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('paintings')
            .select(
                'paintingId, imageFileName, title, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, wikiLink, jsonAnnotations, artists(*), galleries(*)'
            )
            .order('title', { ascending: true });

        if (error) {
            return (res.status(404).json({ message: "Paintings not found." }));
        }
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

// returns sort by title or year of work
app.get('/api/paintings/sort/:sortBy', async (req, res) => {
    try {
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

        if (error) {
            return (res.status(404).json({ message: "Paintings not found." }));
        }
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

// returns the specified painting
app.get('/api/paintings/:ref', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('paintings')
            .select(
                'paintingId, imageFileName, title, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, wikiLink, jsonAnnotations, artists(*), galleries(*)'
            )
            .eq('paintingId', req.params.ref)
            .order('title', { ascending: true });

        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Specified paintings not found." }); 
        }
        if (error) {
            return (res.status(404).json({ message: "Paintings not found." }));
        }
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

// returns the paintings whose title contains the provided substring
app.get('/api/paintings/search/:string', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('paintings')
            .select(
                'paintingId, imageFileName, title, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, wikiLink, jsonAnnotations, artists(*), galleries(*)'
            )
            .ilike('title', `%${req.params.string}%`)
            .order('title', { ascending: true });
        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Specified search does not exist." }); 
        }
        if (error) {
            return (res.status(404).json({ message: "Paintings not found." }));
        }
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

//returns the paintings between two years
app.get('/api/paintings/years/:start/:end', async (req, res) => {
    try {
        const start = req.params.start;
        const end = req.params.end;

        const { data, error } = await supabase
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
        if (error) {
            return (res.status(404).json({ message: "Paintings not found." }));
        }
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }

});

// returns all the paintings in a given gallery
app.get('/api/paintings/galleries/:ref', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('paintings')
            .select(
                'paintingId, imageFileName, title, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, wikiLink, jsonAnnotations, artists(*), galleries(*)'
            )
            .eq('galleryId', req.params.ref)
            .order('title', { ascending: true });
        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Specified search does not exist." }); 
        }
        if (error) {
            return (res.status(404).json({ message: "Paintings not found." }));
        }
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

// retruns all the paintings by a given artist
app.get('/api/paintings/artist/:ref', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('paintings')
            .select(
                'paintingId, imageFileName, title, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, wikiLink, jsonAnnotations, artists(*), galleries(*)'
            )
            .eq('artistId', req.params.ref)
            .order('title', { ascending: true });

        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Specified search does not exist." }); 
        }
        if (error) {
            return (res.status(404).json({ message: "Artists not found." }));
        }
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

// returns all the artists whose nationality begins with the provided substring
app.get('/api/paintings/artist/country/:ref', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('paintings')
            .select(
                'paintingId, imageFileName, title, museumLink, accessionNumber, copyrightText, description, excerpt, yearOfWork, width, height, medium, cost, MSRP, wikiLink, jsonAnnotations, artists!inner(*), galleries(*)'
            )
            .ilike('artists.nationality', `%${req.params.ref}%`)
            .order('title', { ascending: true });

        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Specified search does not exist." }); 
        }
        if (error) {
            return (res.status(404).json({ message: "Nationality not found." }));
        }
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

// returns all genres
app.get('/api/genres', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('genres')
            .select(
                'genreId, genreName, description, wikiLink, eras()'
            );
        if (error) {
            return (res.status(404).json({ message: "Genres not found." }));
        }
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }

});

// returns just the specified genre
app.get('/api/genres/:ref', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('genres')
            .select(
                'genreId, genreName, description, wikiLink, eras()'
            )
            .eq('genreId', req.params.ref);
        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Specified search does not exist." }); 
        }
        if (error) {
            return (res.status(404).json({ message: "Specified genre not found." }));
        }
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

// returns the genres used in a given painting
app.get('/api/genres/painting/:ref', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('paintingGenres')
            .select(
                'paintings(title), genres(*)'
            )
            .eq('paintingId', req.params.ref)
            .order('genreName', { referencedTable: 'genres', ascending: true });
        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Specified search does not exist." }); 
        }
        if (error) {
            return (res.status(404).json({ message: "Specified painting not found." }));
        }
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

// returns all the paintings for a given genre
app.get('/api/paintings/genre/:ref', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('paintingGenres')
            .select(
                'genres(genreName),paintings(*)'
            )
            .eq('genreId', req.params.ref);
        if (data.length === 0) {  // Check for empty data array
            return res.status(404).json({ message: "Specified search does not exist." }); 
        }
        if (error) {
            return (res.status(404).json({ message: "Specified genre not found." }));
        }
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

// returns all the paintings for a given genre
app.get('/api/paintings/era/:ref', async (req, res) => {
    try {
        const { data, error } = await supabase
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
        if (error) {
            return (res.status(404).json({ message: "Specified genre not found." }));
        }
        res.send(processedData);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});

// returns the genre name and number of painting for each genre
app.get('/api/counts/genres', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('genres')
            .select('genreName, paintingGenres!inner(count)');

        // Process the data so that we can order the counts
        const processedData = data.map(item => ({
            genreName: item.genreName,
            paintingCount: item.paintingGenres[0]?.count || 0,
        }));

        // Now sort by paintingCount (ascending or descending)
        processedData.sort((a, b) => a.paintingCount - b.paintingCount); // Ascending

        if (error) {
            return (res.status(404).json({ message: "Genre not found." }));
        }
        res.send(processedData);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }

});

// returns artists name and number of paintings artist
app.get('/api/counts/artists', async (req, res) => {
    try {
        const { data, error } = await supabase
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
        res.status(500).json({ error: error.message });
    }
});

// returns genre name and number of paintings. specified minimum count
app.get("/api/counts/topgenres/:ref", async (req, res) => {
    try {
      const minCount = parseInt(req.params.ref);
  
      const { data, error } = await supabase
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
      if (error) {
        return res.status(404).json({ message: "Not found." });
      }
      res.send(processedData);
    } catch (err) {
      res.status(500).json({ error: "Unexpected Error/Query doens't exist" });
    }
  });

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