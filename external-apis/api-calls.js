const axios = require('axios');

const apiCalls = function(searchTodo) {

  return Promise.all([callYelpCategory(searchTodo)]).then((results) => {
    console.log(results);
  // need to add logic to decide category # being returned as 'result'
    const result = 1;
    return result;
  })
}


// const callYelpBiz = function(searchTodo) {
//   const options = {
//   method: 'GET',
//   url: 'https://api.yelp.com/v3/businesses/search',
//   params: {location: 'canada', term: `restaurant%${searchTodo}`, sort_by: 'best_match', limit: '10'},
//   headers: {
//     accept: 'application/json',
//     Authorization: `Bearer ${process.env.API_YELP}`
//   }
// };

// return axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data.businesses[0].categories);
//     return response.data;
//   })
//   .catch(function (error) {
//     console.error(error);
//   });
// }

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
      const businessCategory = response.data.category.parent_aliases[0]
      console.log(businessCategory);
      return businessCategory;
    })
    .catch(function (error) {
      console.error(error);
    });
}



module.exports = { apiCalls };
