const routes = require('./task');
const projectRoutes=require('./projects');

const constructorMethod = (app) => {
  app.use('/task', routes);
  app.use('/project',routes);
  // app.use('',)


  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;