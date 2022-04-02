const tasks = require('./task');
const users = require('./user');

const constructorMethod = (app) => {
  app.use('/task', tasks);
  app.use('/user', users);


  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;