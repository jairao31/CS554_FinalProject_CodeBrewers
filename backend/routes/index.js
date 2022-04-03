const routes = require('./task');
const skillRoutes = require('./skill');

const constructorMethod = (app) => {
  app.use('/task', routes);

  app.use('/skill', skillRoutes);


  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;