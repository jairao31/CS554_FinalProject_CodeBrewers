const routes = require('./user');

const constructorMethod = (app) => {
  app.use('/user', routes);


  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;