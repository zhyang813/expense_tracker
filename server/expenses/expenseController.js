var Expense = require('./expenseModel.js');
    Q = require('q');


// Promisify a few mongoose methods with the `q` promise library
var findExpense = Q.nbind(Expense.findOne, Expense);
var createExpense = Q.nbind(Expense.create, Expense);
var findAllExpense = Q.nbind(Expense.find, Expense);
var removeExpense = Q.nbind(Expense.remove, Expense);
var updateExpense = Q.nbind(Expense.update, Expense);

module.exports = {

  allExpenses: function (req, res, next) {
    findAllExpense({})
      .then(function (expenses) {
        res.json(expenses);
      })
      .fail(function (error) {
        next(error);
      });
  },

  newExpense : function(req, res, next) {
    var newExp = {
      username: req.body.username,
      datetime: req.body.datetime,
      amount: req.body.amount,
      description: req.body.description
    };

    createExpense(newExp).then(function (expense) {
      console.log("New expense created", expense);
      res.json(expense);
    })
    .fail(function (error) {
      next(error);
    });
  },
  
  expenseByUser: function (req, res, next) {
    findAllExpense({username: req.body.username})
      .then(function (expenses) {
        if (!expenses) {
          return next(new Error('Expense not existed yet'));
        } else {
          return res.json(expenses);
        }
      })
      .fail(function (error) {
        next(error);
      })
  },

  deleteExpense: function (req, res, next) {
    removeExpense({_id: req.body.id})
      .then(function (expense) {
        if (!expense) {
          return next(new Error('Expense not existed yet'));
        } else {
          return res.json(expense);
        }
      })
      .fail(function (error) {
        next(error);
      })

    
  },

  updateExpense: function (req, res, next) {
    console.log(req.body);
    Expense.findOneAndUpdate({_id: req.body._id}, {
      datetime: req.body.datetime,
      amount: req.body.amount,
      description: req.body.description
      }, (function (error, expense) {
        if (!expense) {
          return next(new Error('Expense not existed yet'));
        } else {
          return res.json(expense);
        }
    }));
  }

};
