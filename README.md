# COMP 4513 (Winter 2025)
### Assignment #1: Node, SQL (via supabase)

## Overview
This repository houses the code for a RESTful API designed to manage and serve data for an Art Gallery.  Built using Node.js and the Express.js framework, this API provides a robust backend for accessing and manipulating information about artists, galleries, paintings, genres, and eras.  The data is persistently stored in a Supabase database, leveraging its PostgreSQL capabilities for efficient and scalable data management.

![NodeJS](https://badgen.net/static/NodeJS/22.11.0/green) ![Express](https://badgen.net/static/Express/4.21.2/blue) ![Supabase](https://badgen.net/static/Supabase/2.48.1/red) 

# API Endpoints

| API Endpoint  | Description |
| ------------- | ------------- |
| /api/eras  | Returns all eras  |
| /api/galleries  | Returns all galleries  |
| /api/galleries/```ref``` | Returns the specified gallery with  ``` galleryId ``` |
| /api/galleries/country/```substring```  | Returns the galleries whose country begins with the provided substring  |
| /api/artists  | Returns all artists |
| /api/artists/```ref```  | Returns the specified artist  |
| /api/artists/search/```substring```| Returns the artists whose last name begins with the provided substring  |
| /api/artists/country/```substring```  | Returns the artists whose nationality begins with the provided substring  |
| /api/paintings  | Returns all the paintings |
| /api/paintings/sort/```title/year```  | Returns all paintings sorted by either title or yearOfWork  |
| /api/paintings/```ref``` | Returns just the specified painting |
| /api/paintings/search/```substring```  | Returns the paintings whos title contains the provided substring  |
| /api/paintings/year/```start```/```end``` | Returns the paintings between two years ordered by ```yearOfWork```  |
| /api/paintings/galleries/```ref```  | Returns all the paintings in a given gallery. Uses ```galleryId```  |
| /api/paintings/artists/country/```substring```  | Returns all the paintings by artists whose natinonality begins with the provided substring |
| /api/genres  | Returns all the genres  |
| /api/genres/```ref```  | Returns just the specified genre. Uses ```genreId```  |
| /api/genres/painting/```ref```  | Return the genre used in a given painting  |
| /api/paintings/genre/```ref```  | Returns all returns all the paintings for a given genre |
| /api/paintings/era/```ref```  | Returns all paintings for a given era  |
| /api/counts/genres  | Returns the genre name and unubmer of paintings for each genre  |
| /api/counts/artists  | Returns the artist name and the number of paintings for each artist  |
| /api/counts/topgenres/```ref```  | Returns the genre name and number of paintings for each genre  |

# Test Links
[api/eras](https://perfect-lunar-circle.glitch.me/api/eras)
