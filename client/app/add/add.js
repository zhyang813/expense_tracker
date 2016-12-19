angular.module('expense.add', [])

.controller('AddController', function ($scope, $window, $location, Expenses) {

  $scope.data = {};
  $scope.addedExp = [];
  $scope.data.username = $window.localStorage.getItem('username');
  
  // Function for adding expense record
  $scope.addExpense = function () {
    Expenses.addOne($scope.data)
    .then(function () {
      $scope.addedExp.push($scope.data);
      $scope.data = {};
      $location.path('/add');
    })
    .catch(function (error) {
      console.log(error);
    });
  };


});
