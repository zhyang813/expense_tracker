angular.module('expense.all', [])

.controller('AllController', function ($scope, $location, $window, Expenses, Auth) {

  $scope.data = {};
  $scope.data.username = $window.localStorage.getItem('username');
  $scope.data.expenses = [];

  // Initialization function
  $scope.init = function () {
    // Check the user for admin access, otherwise, alert the user
    Auth.isAdmin({username: $scope.data.username}).then(function (admin) {
      if (admin) {
        Expenses.getAll().then(function (expenses) {
          $scope.data.expenses = expenses;
        });
      } else {
        alert("You have to be admin to view this page!");
      }
    });
  };

  // Function for coverting datetime string into readable date and time
  $scope.convertDatetime = function (datetime) {
    var date = new Date(datetime);
    var yr = date.getFullYear();
    var mo = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var hr = hours < 10 ? '0' + hours : hours;
    var minutes = date.getMinutes();
    var min = (minutes < 10) ? '0' + minutes : minutes;
    var seconds = date.getSeconds();
    var sec = (seconds < 10) ? '0' + seconds : seconds;
    var newDateString = yr + '-' + mo  + '-' + day;
    var newTimeString = hr + ':' + min + ':' + sec;
    var excelDateString = newDateString + ' ' + newTimeString;
    return excelDateString;
  }
  
  // On page load, query the data first
    $scope.init();

});
