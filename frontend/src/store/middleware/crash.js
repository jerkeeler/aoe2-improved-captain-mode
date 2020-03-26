const crashReporter = () => (next) => (action) => {
  try {
    return next(action);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default crashReporter;
