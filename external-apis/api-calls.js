const axios = require('axios');

const apiCalls = function(searchTodo) {

  return Promise.all([callGoogleBooks(searchTodo), callTvmaze(searchTodo), callOpenMovieDatabase(searchTodo), callYelpCategory(searchTodo), callYelpBiz(searchTodo), callWalmartDatabase(searchTodo)])
    .then((results) => {
      console.log(results)
      let category_id = 5;

      // for Buy category
      const buyResults = ['fashion', 'shopping', 'sporting goods', 'accessories', 'home cleaning', 'hats', 'Gym', 'auto repair'];

      // for Eat category
      const eatResults = ['restaurants', 'food', 'gourmet', 'italian', 'vegan', 'mexican', 'burgers', 'bakeries', 'desserts', 'coffee & tea'];

      const searchTerm = searchTodo.split(' ');
      if (searchTerm.length > 1) {
        if (results[1] !== undefined || results[2] !== undefined) {
          category_id = 2;
          return category_id;
        } else if (results[0] !== undefined) {
          category_id = 1;
          return category_id;
        } else {
          for (const result of results) {
            if (buyResults.includes(result)) {
              category_id = 3;
              return category_id;
            } else if (eatResults.includes(result)) {
              category_id = 4;
              return category_id;
            };
          };
        };

      } else if (searchTerm.length === 1) {
        console.log('one word')
        if (buyResults.includes(results[3]) || buyResults.includes(results[4]) || buyResults.includes(results[5])) {
          category_id = 3;
          return category_id;
        } else if (eatResults.includes(results[3]) || eatResults.includes(results[4]) || eatResults.includes(results[5])) {
          category_id = 4;
          return category_id;
        } else if (results[1] !== undefined || results[2] !== undefined) {
          category_id = 2;
          return category_id;
        } else if (results[0] !== undefined) {
          category_id = 1;
          return category_id;
        };

      };

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
      return yelpBusiness;
    })
    .catch(function(error) {
      console.error("Cannot find Yelp Business");
    });
};

const callGoogleBooks = function(searchTodo) {
  const apiKey = process.env.API_GOOGLE_BOOKS;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTodo}&key=${apiKey}`;

  return axios.get(url)
    .then(function(response) {
      const searchBook = searchTodo.toLowerCase().split(' ');
      const googleBook = response.data.items[0].volumeInfo.title.toLowerCase().split(' ');

      let wordCount = 0;
      for (let word of searchBook) {
        if (googleBook.includes(word)) {
          wordCount++;
        }

        if (searchBook.length === 1 && wordCount === googleBook.length) {
          return googleBook;
        } else if (searchBook.length > 1 && wordCount >= (googleBook.length / 2)) {
          return googleBook.join(" ");
        };
      };

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
      const searchTvShow = searchTodo.toLowerCase().split(' ');
      const name = response.data[0].show.name.toLowerCase().split(' ');

      let wordCount = 0;
      for (let word of searchTvShow) {
        if (name.includes(word)) {
          wordCount++;
        }

        if (searchTvShow.length === 1 && wordCount === name.length) {
          return name;
        } else if (searchTvShow.length > 1 && wordCount >= (name.length / 2)) {
          return name.join(" ");
        }

      };

      return undefined;

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
      const title = response.data.Search[0].Title.toLowerCase().split(' ');

      let wordCount = 0;
      for (let word of searchMovie) {
        if (title.includes(word)) {
          wordCount++;
        }

        if (searchMovie.length === 1 && wordCount === title.length) {
          return title;
        } else if (searchMovie.length > 1 && wordCount >= (title.length / 2)) {
          return title.join(' ');
        }
      }
      return undefined;
    })
    .catch(error => {
      console.log("Cannot find Movie");
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
      console.log(response.data)
      // const results = response.autocomplete_results[0].suggestion;
      // console.log('From Walkmart', { results });
      // return results;
    }).catch(error => {
      console.log(error);
    });
};

module.exports = { apiCalls };
