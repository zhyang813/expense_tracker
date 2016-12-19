var mongoose = require('mongoose');
var crypto = require('crypto');

var ExpenseSchema = new mongoose.Schema({
 username: String,
 datetime: Date,
 amount: Number,
 description: String,
 },
 {
  timestamps: true
});

module.exports = mongoose.model('Expense', ExpenseSchema);
