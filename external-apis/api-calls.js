const axios = require('axios');

const apiCalls = function(searchTodo) {

  return Promise.all([callYelpCategory(searchTodo), callYelpBiz(searchTodo)]).then((results) => {
    console.log(results);
    let category_id = 5;

    // logic for Yelp Categories
    for (let result of results) {
      if (result === 'undefined') {
        continue;
      }

      if (result === 'fashion' || result === 'sporting goods' || result === 'accessories') {
        category_id = 4;

      } else if (result === 'restaurant' || result === 'gourmet' || result === 'italian' || result === 'vegan' || result === 'mexican') {
        category_id = 3;
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

module.exports = { apiCalls };
