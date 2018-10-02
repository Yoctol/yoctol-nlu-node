const fetch = require('node-fetch');
const { createHttpLink } = require('apollo-link-http');
const { execute, makePromise } = require('apollo-link');

const GRAPHQL_ENDPOINT = 'https://ynlu.yoctol.com/graphql';

module.exports = function createFetchFromToken(token, opts) {
  const uri = opts && opts.endpoint ? opts.endpoint : GRAPHQL_ENDPOINT;

  const link = createHttpLink({
    uri,
    fetch,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return async function graphql(operation) {
    return makePromise(execute(link, operation));
  };
};
