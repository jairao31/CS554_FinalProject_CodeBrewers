const tasks = require('./task');
const users = require('./user');
const skillRoutes = require('./skill');

const constructorMethod = (app) => {
  app.use('/task', tasks);
  app.use('/user', users);
  app.use('/skill', skillRoutes);


  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;