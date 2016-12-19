angular.module('expense.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};
  $scope.user.admin = true;
  
  // Signin function
  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('expenseTracker', token);
        $window.localStorage.setItem('username', $scope.user.username);
        $location.path('/add');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  
  // Signup function
  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('expenseTracker', token);
        $window.localStorage.setItem('username', $scope.user.username);
        $location.path('/add');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
