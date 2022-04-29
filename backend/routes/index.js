const tasks = require('./task');
const users = require('./user');
const skillRoutes = require('./skill');
const projectRoutes=require('./projects');
const mediaRoutes = require("./media");
const messageRoutes = require('./messages')
const meetRoutes = require('./meet')

const constructorMethod = (app) => {
  app.use('/task', tasks);
  app.use('/meet', meetRoutes);
  app.use('/user', users);
  app.use('/skill', skillRoutes);
  app.use('/project',projectRoutes);
  app.use("/media", mediaRoutes);
  app.use('/messages', messageRoutes);
  
  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;