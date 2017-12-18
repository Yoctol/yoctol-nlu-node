const { createApolloFetch } = require('apollo-fetch');

const GRAPHQL_ENDPOINT = 'https://ynlu.yoctol.com/graphql';

module.exports = function createFetchFromToken(token) {
  const apolloFetch = createApolloFetch({ uri: GRAPHQL_ENDPOINT });

  apolloFetch.use(({ options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers.authorization = `Bearer ${token}`;

    next();
  });

  return apolloFetch;
};
