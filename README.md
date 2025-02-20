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
| /api/paintings/artist/```ref```  | Returns all the paintings by a given artist. Uses ```artistId```  |
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
[/api/eras](https://perfect-lunar-circle.glitch.me/api/eras)  
[/api/galleries](https://perfect-lunar-circle.glitch.me/api/galleries)  
[/api/galleries/30](https://perfect-lunar-circle.glitch.me/api/galleries/30)  
[/api/galleries/Calgary](https://perfect-lunar-circle.glitch.me/api/galleries/Calgary)   
[/api/galleries/country/fra](https://perfect-lunar-circle.glitch.me/api/galleries/country/fra)   
[/api/artists](https://perfect-lunar-circle.glitch.me/api/artists)   
[/api/artists/12](https://perfect-lunar-circle.glitch.me/api/artists/12)   
[/api/artists/1223423](https://perfect-lunar-circle.glitch.me/api/artists/1223423)  
[/api/artists/search/ma](https://perfect-lunar-circle.glitch.me/api/artists/search/ma)   
[/api/artists/search/mA](https://perfect-lunar-circle.glitch.me/api/artists/search/mA)   
[/api/artists/country/fra](https://perfect-lunar-circle.glitch.me/api/artists/country/fra)   
[/api/paintings](https://perfect-lunar-circle.glitch.me/api/paintings)   
[/api/paintings/63](https://perfect-lunar-circle.glitch.me/api/paintings/63)   
[/api/paintings/sort/year](https://perfect-lunar-circle.glitch.me/api/paintings/sort/year)  
[/api/paintings/search/port](https://perfect-lunar-circle.glitch.me/api/paintings/search/port)  
[/api/paintings/search/pOrt](https://perfect-lunar-circle.glitch.me/api/paintings/search/pOrt)  
[/api/paintings/search/conolly](https://perfect-lunar-circle.glitch.me/api/paintings/search/conolly)  
[/api/paintings/years/1800/1850](https://perfect-lunar-circle.glitch.me/api/paintings/years/1800/1850)  
[/api/paintings/galleries/5](https://perfect-lunar-circle.glitch.me/api/paintings/galleries/5)  
[/api/paintings/artist/16](https://perfect-lunar-circle.glitch.me/api/paintings/artist/16)  
[/api/paintings/artist/666](https://perfect-lunar-circle.glitch.me/api/paintings/artist/666)  
[/api/paintings/artist/country/ital](https://perfect-lunar-circle.glitch.me/api/paintings/artist/country/ital)  
[/api/genres](https://perfect-lunar-circle.glitch.me/api/genres)  
[/api/genres/76](https://perfect-lunar-circle.glitch.me/api/genres/76)  
[/api/genres/painting/408](https://perfect-lunar-circle.glitch.me/api/genres/painting/408)  
[/api/genres/painting/jsdfhg](https://perfect-lunar-circle.glitch.me/api/genres/painting/jsdfhg)  
[/api/paintings/genre/78](https://perfect-lunar-circle.glitch.me/api/paintings/genre/78)  
[/api/paintings/era/2](https://perfect-lunar-circle.glitch.me/api/paintings/era/2)  
[/api/counts/genres](https://perfect-lunar-circle.glitch.me/api/counts/genres)  
[/api/counts/artists](https://perfect-lunar-circle.glitch.me/api/counts/artists)  
[/api/counts/topgenres/20](https://perfect-lunar-circle.glitch.me/api/counts/topgenres/20)  
[/api/counts/topgenres/2034958](https://perfect-lunar-circle.glitch.me/api/counts/topgenres/2034958)  
