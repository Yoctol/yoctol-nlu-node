const axios = require('axios');

const GRAPHQL_ENDPOINT = 'http://139.59.123.66:3000/graphql';

module.exports = async function graphql(query, variables) {
  const body = { query, variables };
  try {
    const { data } = await axios.post(GRAPHQL_ENDPOINT, body);
    return data;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.errors) {
      console.log(JSON.stringify(err.response.data.errors), null, 2);
    } else {
      throw err;
    }
  }
};
