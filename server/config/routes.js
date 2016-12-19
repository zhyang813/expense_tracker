var expenseController = require('../expenses/expenseController.js');
var userController = require('../users/userController.js');
var helpers = require('./helpers.js'); // our custom middleware

module.exports = function (app, express) {
  // app.get('/:code', linksController.navToLink);

  app.post('/api/users/signin', userController.signin);
  app.post('/api/users/signup', userController.signup);
  app.get('/api/users/signedin', userController.checkAuth);
  app.post('/api/users/isadmin', userController.isAdmin);

  app.get('/api/expenses', expenseController.allExpenses);
  app.post('/api/expenses', expenseController.newExpense);
  app.post('/api/expense', expenseController.deleteExpense);
  app.post('/api/editexpense', expenseController.updateExpense);
  app.post('/api/expensesbyuser', expenseController.expenseByUser);

  // If a request is sent somewhere other than the routes above,
  // send it through our custom error handler
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};

