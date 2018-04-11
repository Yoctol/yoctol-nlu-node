module.exports = function createErrorFromGraphql(errors, where) {
  // 'YNLU error happens!'
  // or
  // 'YNLU error happens in IntentClassifier#method!'
  const defaultMessage = `YNLU error happens${where ? ` in ${where}` : ''}!`;

  const message = [defaultMessage]
    .concat(errors.map(error => error.message))
    .join('\n');

  const error = new Error(message);
  error.errors = errors;

  return error;
};
