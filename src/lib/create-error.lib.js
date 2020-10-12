module.exports = (message, props = { status: 500 }) => {
  const err = new Error(message);
  Object.keys(props).forEach((key) => {
    err[key] = props[key];
  });
  return err;
};
