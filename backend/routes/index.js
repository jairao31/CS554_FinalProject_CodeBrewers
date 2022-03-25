const routes = require('./task');

const constructorMethod = (app) => {
  app.use('/task', routes);


  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;