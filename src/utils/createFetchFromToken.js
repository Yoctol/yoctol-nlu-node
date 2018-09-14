const { createApolloFetch } = require('apollo-fetch');

const GRAPHQL_ENDPOINT = 'https://ynlu.yoctol.com/graphql';

module.exports = function createFetchFromToken(token, opts) {
  const uri = opts && opts.endpoint ? opts.endpoint : GRAPHQL_ENDPOINT;
  const apolloFetch = createApolloFetch({ uri });

  apolloFetch.use(({ options }, next) => {
    if (!options.headers) {
      options.headers = {}; // Create the headers object if needed.
    }
    options.headers.authorization = `Bearer ${token}`;

    next();
  });

  return apolloFetch;
};
