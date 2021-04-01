const express = require('express')
const bodyParser = require('body-parser') 
const app = express()
const port = 3000

var moviesDB = [
  {
    "Title": "The Shawshank Redemption",
    "Year": "1994",
    "Rated": "R",
    "Released": "14 Oct 1994",
    "Runtime": "2 h 22 min",
    "Genre": "Crime, Drama",
    "Director": "Frank Darabont",
    "Writer": "Stephen King, Frank Darabont",
    "Actors": "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
    "Plot": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg",
    "imdbRating": "9.3",
    "imdbVotes": "1,078,045",
    "imdbID": "tt0111161",
    "Type": "movie",
    "Response": "True",
    "0": {
      "trailer": "https://www.youtube.com/v/6hB3S9bIaco?version=3&amp;f=videos&amp;app=youtube_gdata"
    }
  },
  {
    "Title": "Fight Club",
    "Year": "1999",
    "Rated": "R",
    "Released": "15 Oct 1999",
    "Runtime": "2 h 19 min",
    "Genre": "Drama",
    "Director": "David Fincher",
    "Writer": "Chuck Palahniuk, Jim Uhls",
    "Actors": "Brad Pitt, Edward Norton, Helena Bonham Carter, Meat Loaf",
    "Plot": "An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more...",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BMjIwNTYzMzE1M15BMl5BanBnXkFtZTcwOTE5Mzg3OA@@._V1_SX300.jpg",
    "imdbRating": "8.8",
    "imdbVotes": "819,812",
    "imdbID": "tt0137523",
    "Type": "movie",
    "Response": "True",
    "0": {
      "trailer": "https://www.youtube.com/v/SUXWAEX2jlg?version=3&amp;f=videos&amp;app=youtube_gdata"
    }
  },
  {
    "Title": "Star Wars: Episode V - The Empire Strikes Back",
    "Year": "1980",
    "Rated": "PG",
    "Released": "21 May 1980",
    "Runtime": "2 h 7 min",
    "Genre": "Action, Adventure, Sci-Fi",
    "Director": "Irvin Kershner",
    "Writer": "Leigh Brackett, Lawrence Kasdan",
    "Actors": "Mark Hamill, Harrison Ford, Carrie Fisher, Billy Dee Williams",
    "Plot": "After the rebels have been brutally overpowered by the Empire on their newly established base, Luke Skywalker takes advanced Jedi training with Master Yoda, while his friends are pursued by Darth Vader as part of his plan to capture Luke.",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BMjE2MzQwMTgxN15BMl5BanBnXkFtZTcwMDQzNjk2OQ@@._V1_SX300.jpg",
    "imdbRating": "8.8",
    "imdbVotes": "522,846",
    "imdbID": "tt0080684",
    "Type": "movie",
    "Response": "True",
    "0": {
      "trailer": "https://www.youtube.com/v/PkEKIw0FU6Y?version=3&amp;f=videos&amp;app=youtube_gdata"
    }
  },
  {
    "Title": "The Lord of the Rings: The Fellowship of the Ring",
    "Year": "2001",
    "Rated": "PG-13",
    "Released": "19 Dec 2001",
    "Runtime": "2 h 58 min",
    "Genre": "Action, Adventure, Fantasy",
    "Director": "Peter Jackson",
    "Writer": "J.R.R. Tolkien, Fran Walsh",
    "Actors": "Elijah Wood, Ian McKellen, Orlando Bloom, Sean Bean",
    "Plot": "A meek hobbit of The Shire and eight companions set out on a journey to Mount Doom to destroy the One Ring and the dark lord Sauron.",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BNTEyMjAwMDU1OV5BMl5BanBnXkFtZTcwNDQyNTkxMw@@._V1_SX300.jpg",
    "imdbRating": "8.8",
    "imdbVotes": "798,909",
    "imdbID": "tt0120737",
    "Type": "movie",
    "Response": "True",
    "0": {
      "trailer": "https://www.youtube.com/v/VIgkpEgCV-I?version=3&amp;f=videos&amp;app=youtube_gdata"
    }
  },
  {
    "Title": "One Flew Over the Cuckoo's Nest",
    "Year": "1975",
    "Rated": "R",
    "Released": "21 Nov 1975",
    "Runtime": "2 h 13 min",
    "Genre": "Drama",
    "Director": "Milos Forman",
    "Writer": "Lawrence Hauben, Bo Goldman",
    "Actors": "Jack Nicholson, Louise Fletcher, Michael Berryman, Peter Brocco",
    "Plot": "Upon admittance to a mental institution, a brash rebel rallies the patients to take on the oppressive head nurse.",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BMTk5OTA4NTc0NF5BMl5BanBnXkFtZTcwNzI5Mzg3OA@@._V1_SX300.jpg",
    "imdbRating": "8.8",
    "imdbVotes": "451,957",
    "imdbID": "tt0073486",
    "Type": "movie",
    "Response": "True",
    "0": {
      "trailer": "https://www.youtube.com/v/2WSyJgydTsA?version=3&amp;f=videos&amp;app=youtube_gdata"
    }
  },
  {
    "Title": "Inception",
    "Year": "2010",
    "Rated": "PG-13",
    "Released": "16 Jul 2010",
    "Runtime": "2 h 28 min",
    "Genre": "Action, Adventure, Mystery, Sci-Fi, Thriller",
    "Director": "Christopher Nolan",
    "Writer": "Christopher Nolan",
    "Actors": "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Ken Watanabe",
    "Plot": "A skilled extractor is offered a chance to regain his old life as payment for a task considered to be impossible.",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    "imdbRating": "8.8",
    "imdbVotes": "851,292",
    "imdbID": "tt1375666",
    "Type": "movie",
    "Response": "True",
    "0": {
      "trailer": "https://www.youtube.com/v/66TuSJo4dZM?version=3&amp;f=videos&amp;app=youtube_gdata"
    }
  },
  {
    "Title": "Goodfellas",
    "Year": "1990",
    "Rated": "R",
    "Released": "19 Sep 1990",
    "Runtime": "2 h 26 min",
    "Genre": "Biography, Crime, Drama, Thriller",
    "Director": "Martin Scorsese",
    "Writer": "Nicholas Pileggi, Nicholas Pileggi",
    "Actors": "Robert De Niro, Ray Liotta, Joe Pesci, Lorraine Bracco",
    "Plot": "Henry Hill and his friends work their way up through the mob hierarchy.",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BMjU3MTQ4OTA0MV5BMl5BanBnXkFtZTYwNjAyMDg4._V1_SX300.jpg",
    "imdbRating": "8.7",
    "imdbVotes": "473,919",
    "imdbID": "tt0099685",
    "Type": "movie",
    "Response": "True",
    "0": {
      "trailer": "https://www.youtube.com/v/qo5jJpHtI1Y?version=3&amp;f=videos&amp;app=youtube_gdata"
    }
  },
  {
    "Title": "Star Wars",
    "Year": "1977",
    "Rated": "PG",
    "Released": "25 May 1977",
    "Runtime": "2 h 1 min",
    "Genre": "Action, Adventure, Fantasy, Sci-Fi",
    "Director": "George Lucas",
    "Writer": "George Lucas",
    "Actors": "Mark Hamill, Harrison Ford, Carrie Fisher, Alec Guinness",
    "Plot": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the universe from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BMTU4NTczODkwM15BMl5BanBnXkFtZTcwMzEyMTIyMw@@._V1_SX300.jpg",
    "imdbRating": "8.7",
    "imdbVotes": "588,148",
    "imdbID": "tt0076759",
    "Type": "movie",
    "Response": "True",
    "0": {
      "trailer": "https://www.youtube.com/v/9gvqpFbRKtQ?version=3&amp;f=videos&amp;app=youtube_gdata"
    }
  },
  {
    "Title": "Seven Samurai",
    "Year": "1954",
    "Rated": "Unrated",
    "Released": "19 Nov 1956",
    "Runtime": "2 h 38 min",
    "Genre": "Action, Drama",
    "Director": "Akira Kurosawa",
    "Writer": "Akira Kurosawa, Shinobu Hashimoto",
    "Actors": "Toshir\u00f4 Mifune, Takashi Shimura, Keiko Tsushima, Yukiko Shimazaki",
    "Plot": "A poor village under attack by bandits recruits seven unemployed samurai to help them defend themselves.",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BNzg5Mzk5Nzc0NF5BMl5BanBnXkFtZTcwNjg3MDQzMQ@@._V1_SX300.jpg",
    "imdbRating": "8.8",
    "imdbVotes": "162,278",
    "imdbID": "tt0047478",
    "Type": "movie",
    "Response": "True",
    "0": {
      "trailer": "https://www.youtube.com/v/xnRUHtSgJ9o?version=3&amp;f=videos&amp;app=youtube_gdata"
    }
  },
  {
    "Title": "Forrest Gump",
    "Year": "1994",
    "Rated": "PG-13",
    "Released": "06 Jul 1994",
    "Runtime": "2 h 22 min",
    "Genre": "Drama, Romance",
    "Director": "Robert Zemeckis",
    "Writer": "Winston Groom, Eric Roth",
    "Actors": "Tom Hanks, Robin Wright, Gary Sinise, Sally Field",
    "Plot": "Forrest Gump, while not intelligent, has accidentally been present at many historic moments, but his true love, Jenny Curran, eludes him.",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BMTQwMTA5MzI1MF5BMl5BanBnXkFtZTcwMzY5Mzg3OA@@._V1_SX300.jpg",
    "imdbRating": "8.7",
    "imdbVotes": "722,459",
    "imdbID": "tt0109830",
    "Type": "movie",
    "Response": "True",
    "0": {
      "trailer": "https://www.youtube.com/v/uPIEn0M8su0?version=3&amp;f=videos&amp;app=youtube_gdata"
    }
  },
  {
    "Title": "The Matrix",
    "Year": "1999",
    "Rated": "R",
    "Released": "31 Mar 1999",
    "Runtime": "2 h 16 min",
    "Genre": "Action, Adventure, Sci-Fi",
    "Director": "Andy Wachowski, Lana Wachowski",
    "Writer": "Andy Wachowski, Lana Wachowski",
    "Actors": "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving",
    "Plot": "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BMjEzNjg1NTg2NV5BMl5BanBnXkFtZTYwNjY3MzQ5._V1_SX300.jpg",
    "imdbRating": "8.7",
    "imdbVotes": "779,661",
    "imdbID": "tt0133093",
    "Type": "movie",
    "Response": "True",
    "0": {
      "trailer": "https://www.youtube.com/v/m8e-FF8MsqU?version=3&amp;f=videos&amp;app=youtube_gdata"
    }
  }]

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// 2 kinds of get request 
// Get all 
// get one 

app.get('/', (req, res) => {
  console.log("I am on the roort route")
  res.send("Yay looks like this works AGAIN!")
});


app.get('/movies', (req, res) => {
  console.log("GET Movies route")
  // send all details fo all movies
  // DB query 
  // let movies = SELECT * from TABLE NAME
  // res.send(movies)
  res.send(moviesDB)
});


app.get('/movies/:imdbID', (req, res) => {
  console.log("GET ROUTE OF TITLE")
  let imdbID = req.params.imdbID
  for (let i = 0; i < moviesDB.length; i++) {
    const movie = moviesDB[i];

    if (movie.imdbID === imdbID) {
      res.json(movie)
      return;
    }
  }
});

app.put('/movies/:imdbID', (req, res) => {
  // PUT - put this record instead of the origina record
  // WE need to send all details!
  // FInd the movie with :imdbID and replace
console.log("PUT ROUTE OF TITLE")
  let imdbID = req.params.imdbID
  // console.log(imdbID)
  // console.log(req.body)
  for (let i = 0; i < moviesDB.length; i++) {
    let movie = moviesDB[i];
      console.log(movie.Title)


    if (movie.imdbID === imdbID) {
      movie.Title = req.body.Title
      console.log(movie.Title)
      res.send("Updated movie successfully")
      console.log(moviesDB)
      return;
    }
  }


});



app.post('/movie', (req, res) => {
  const movie = req.body

  console.log("Welcome to the movie POST route")
  console.log(movie)
  res.send("Thank you for the movie details")

  // Read the body - done
  // Add this body to movies.json file
  moviesDB.push(movie)
})

app.listen(port, () => console.log(`App is running on port ${port}!`));


// {
//     "Title": "The Shawshank Redemption",
//     "Year": "1994",
//     "Rated": "R",
//     "Released": "14 Oct 1994",
//     "Runtime": "2 h 22 min",
//     "Genre": "Crime, Drama",
//     "Director": "Frank Darabont",
//     "Writer": "Stephen King, Frank Darabont",
//     "Actors": "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
//     "Plot": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
//     "Poster": "http://ia.media-imdb.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg",
//     "imdbRating": "9.3",
//     "imdbVotes": "1,078,045",
//     "imdbID": "tt0111161",
//     "Type": "movie",
//     "Response": "True",
//     "0": {
//       "trailer": "https://www.youtube.com/v/6hB3S9bIaco?version=3&amp;f=videos&amp;app=youtube_gdata"
//     }