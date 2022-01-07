function authenticate (req, res, next) {
  console.log('Authenticating...');
  next()
};

module.export = authenticate;
