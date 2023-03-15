const axios = require('axios');

const apiCalls = function(searchTodo) {

  return Promise.all([callYelpCategory(searchTodo), callYelpBiz(searchTodo), callGoogleBooks(searchTodo)]).then((results) => {
    console.log(results);
    let category_id = 5;

    // close matching results required
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
        const buyResults = ['fashion', 'shopping', 'sporting goods', 'accessories', 'home cleaning', 'hats']

        // for Eat category
        const eatResults = ['restaurants', 'food', 'gourmet', 'italian', 'vegan', 'mexican', 'burgers']

        if (buyResults.includes(result)) {
          category_id = 3;
        } else if (eatResults.includes(result)) {
          category_id = 4;
        }
      }

    }

    return category_id;
  })
}

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
  .then(function (response) {
    const yelpCategory = response.data.category.parent_aliases[0].toLowerCase();
    console.log(yelpCategory);
    return yelpCategory;
  })
  .catch(function (error) {
    console.error("Cannot find Yelp Category");
  });
}

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
  .then(function (response) {
    const yelpBusiness = response.data.businesses[0].categories[0].title.toLowerCase();
    console.log(yelpBusiness);
    return yelpBusiness;
  })
  .catch(function (error) {
    console.error("Cannot find Yelp Business");
  });
}

const callGoogleBooks = function(searchTodo) {
  const apiKey = process.env.API_GOOGLE_BOOKS;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTodo}&key=${apiKey}`

  return axios.get(url)
  .then(function (response) {
    const searchBook = searchTodo.toLowerCase().split(' ');
    const googleBook = response.data.items[0].volumeInfo.title.toLowerCase().split(' ');

    console.log(searchBook, googleBook);
    let wordCount = 0;
    for (let word of searchBook) {
      if (googleBook.includes(word)) {
        wordCount++
      }

      console.log(wordCount, googleBook.length)
      if (searchBook.length === 1 && wordCount === googleBook.length) {
        return googleBook;
      } else if (searchBook.length > 1 && wordCount >= (googleBook.length/2)) {
        return googleBook;
      }

    }
    return undefined;
  })
  .catch(function(error) {
    console.error(error);
  });
};


module.exports = { apiCalls };
