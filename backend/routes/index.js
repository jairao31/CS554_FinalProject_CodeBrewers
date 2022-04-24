const tasks = require('./task');
const users = require('./user');
const skillRoutes = require('./skill');
const projectRoutes=require('./projects');
const messageRoutes = require('./messages')

const constructorMethod = (app) => {
  app.use('/task', tasks);
  app.use('/user', users);
  app.use('/skill', skillRoutes);
  app.use('/project',projectRoutes);
  app.use('/messages', messageRoutes);

  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;