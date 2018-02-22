const errorFormat = (err, cb) => {
  if (cb) {
    return cb(err) || err;
  }
  if (err.source) {
    const errorMessages = err.source.errors && err.source.errors.map(error => {
      const { message, originalMessage } = error;
      return `${message} ${originalMessage}`;
    });
    err.message = errorMessages && errorMessages.join('\n\r');
    return err;
  }
  if (err.message) {
    return err;
  }
  return err;
};

const errorHandle = (error, cb, formateFn) => {
  const _error = errorFormat(error, formateFn);
  if (_error && _error.message && cb) {
    console.log(_error.message);
    return cb(_error) || _error;
  }
  return _error;
};

const errorsHandle = (errors, cb, formatFn) => {
  if (errors && errors.length) {
    return errors.map(error => errorHandle(error, cb, formatFn));
  }
  return errors;
};

export { errorFormat, errorsHandle, errorHandle };