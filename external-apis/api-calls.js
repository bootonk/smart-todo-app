const axios = require('axios');

const apiCalls = function(searchTodo) {

  return Promise.all([callYelpCategory(searchTodo), callYelpBiz(searchTodo), callGoogleBooks(searchTodo),callTvmaze(searchTodo),callOpenMovieDatabase(searchTodo), callWalmartDatabase(searchTodo)])
    .then((results) => {
      console.log(`Results from\n Yelp: ${results[0]},\n YelpBiz: ${results[1]},\n GoogleBook: ${results[2]},\n Tvmaze: ${results[3]},\n OpenMovieDatabase: ${results[4]}, \n Walmart: ${results[5]}`);

      console.log(results)

      let category_id = 5;

      // close matching results required

      //word count

      const searchTodo1 = searchTodo.toLowerCase().split(' ');
      console.log(searchTodo1)
      const NumberOfWords = searchTodo1.length
      console.log('Number of words',NumberOfWords)



      //if searchterm has  2+ words >>>> googleBooks, tv&movie, shop, eat


        //if searchterm has 1 word >>>> shop, eat, tv&Movies, googleBooks

         // for Movie and TV category
         if (results[3] !== undefined || results[4] !== undefined) {
          category_id = 2;
         }

      // for Read category
      if (results[2] !== undefined) {
        category_id = 1;
      } else {
        // less strict match within an array required
        for (let result of results) {
          if (result === 'undefined') {
            continue;
          }

          // for Buy category
          const buyResults = ['fashion', 'shopping', 'sporting goods', 'accessories', 'home cleaning', 'hats', 'Gym', 'auto repair'];

          // for Eat category
          const eatResults = ['restaurants', 'food', 'gourmet', 'italian', 'vegan', 'mexican', 'burgers', 'bakeries', 'desserts'];

          if (buyResults.includes(result)) {
            category_id = 3;
          } else if (eatResults.includes(result)) {
            category_id = 4;
          }
        }

      }

      return category_id;
    });
};

const callYelpCategory = function(searchTodo) {
  const options = {
    method: 'GET',
    url: `https://api.yelp.com/v3/categories/${searchTodo}`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.API_YELP}`
    }
  };


  return axios
    .request(options)
    .then(function(response) {
      const yelpCategory = response.data.category.parent_aliases[0].toLowerCase();
      console.log('Yelp Response:', response.data.category.parent_aliases);
      console.log('yelpCategory:',yelpCategory);
      return yelpCategory;
    })
    .catch(function(error) {
      console.error("Cannot find Yelp Category");
    });
};

const callYelpBiz = function(searchTodo) {
  const options = {
    method: 'GET',
    url: 'https://api.yelp.com/v3/businesses/search',
    params: {location: 'canada', term: `${searchTodo}`, sort_by: 'best_match', limit: '10'},
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.API_YELP}`
    }
  };

  return axios
    .request(options)
    .then(function(response) {
      const yelpBusiness = response.data.businesses[0].categories[0].title.toLowerCase();
      console.log('yelpBusiness:',yelpBusiness);
      return yelpBusiness;
    })
    .catch(function(error) {
      console.error("Cannot find Yelp Business");
    });
};

// callYelpBiz('burguer')

const callGoogleBooks = function(searchTodo) {
  const apiKey = process.env.API_GOOGLE_BOOKS;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTodo}&key=${apiKey}`;

  return axios.get(url)
    .then(function(response) {
      const searchBook = searchTodo.toLowerCase().split(' ');
      const googleBook = response.data.items[0].volumeInfo.title.toLowerCase().split(' ');

      console.log(searchBook, googleBook);
      let wordCount = 0;
      for (let word of searchBook) {
        if (googleBook.includes(word)) {
          wordCount++;
        }

        console.log(wordCount, googleBook.length);
        if (searchBook.length === 1 && wordCount === googleBook.length) {
          return googleBook;
        } else if (searchBook.length > 1 && wordCount >= (googleBook.length / 2)) {
          return googleBook;
        }

      }
      return undefined;
    })
    .catch(function(error) {
      console.error(error);
    });
};

const callTvmaze = function(searchTodo) {
  const endpoint = `https://api.tvmaze.com/search/shows?q=${searchTodo}`;

  return axios.get(endpoint)
    .then(response => {
      const searchTvShow = searchTvShow.toLowerCase().split(' ');
      const name = response.data[0].show.name.toLowerCase().split(' ');
      console.log('TVmaze Results:',name);

      let wordCount = 0;
      for (let word of searchTvShow) {
        if (name.includes(word)) {
          wordCount++;
        }

        console.log(wordCount, name.length);
        if (searchTvShow.length === 1 && wordCount === name.length) {
          return name;
        } else if (searchTvShow.length > 1 && wordCount >= (name.length / 2)) {
          return name;
        }

      }
      return undefined;
      


      return name;
    })
    .catch(error => {
      console.log('Cannot find in TvMaze');
    });
  
};

const callOpenMovieDatabase = function(searchTodo) {
  const endpoint = `http://www.omdbapi.com/?s=${searchTodo}&apikey=${process.env.API_OPEN_MOVIE_DATABASE}&`;

  return axios.get(endpoint)
    .then(response => {
      const searchMovie = searchTodo.toLowerCase().split(' ');
      const title = response.data.toLowerCase().split(' ');
      console.log('OpenMovieDatabase Results:',title);
      
      let wordCount = 0;
      for (let word of searchMovie) {
        if (title.includes(word)) {
          wordCount++;
        }

        console.log(wordCount, title.length);
        if (searchMovie.length === 1 && wordCount === title.length) {
          return title;
        } else if (searchMovie.length > 1 && wordCount >= (title.length / 2)) {
          return title;
        }
      }
      return undefined;
    })
    .catch(error => {
      console.log('Cannot find in OpenMovieDatabase');
    });

};

const callWalmartDatabase = function(searchTodo) {
  const options = {
    method: 'GET',
    url: 'https://bluecart.p.rapidapi.com/request',
    params: {type: 'autocomplete', search_term: `${searchTodo}`},
    headers: {
      'X-RapidAPI-Key': `process.env.X-RapidAPI-Key`,
      'X-RapidAPI-Host': 'bluecart.p.rapidapi.com'
    }
  };

  return axios.request(options)
    .then(function(response) {
      const results = response.autocomplete_results[0].suggestion;
      console.log('From Walkmart', { results });
      return results;
    }).catch(error => {
      console.log('Cannot find in Walmart', error.message);
    });
};

apiCalls('love is in the air');


module.exports = { apiCalls };