angular.module('expense.own', [])

.controller('OwnController', function ($scope, $window, $location, Expenses) {

  $scope.data = {};
  $scope.newData = {};
  $scope.data.username = $window.localStorage.getItem('username');
  $scope.newData.username = $window.localStorage.getItem('username');
  $scope.idToUpdate = '';
  
  // Initialization function
  $scope.init = function () {
    Expenses.getMine($scope.data).then(function (expenses) {
     $scope.data.expenses = expenses;
    });
  };

  // Delete function for 'delete' button
  $scope.delete = function (id) {
    var index = 0;
    $scope.data.expenses.forEach( function(exp, index) {
      if (exp._id === id) index = index;
    })
    $scope.data.expenses.splice(index,1);
    Expenses.deleteOne({id: id}).then(function (expense) {
      console.log("sucessfully deleted");
    });
  };
  
  // Called when edit button is clicked
  $scope.openSideNav = function (exp) {
    document.getElementById("mySidenav").style.width = "450px";
    console.log(exp)
    $scope.idToUpdate = exp._id;
  };
  
  // Function to close side bar
  $scope.closeSideNav = function () {
    document.getElementById("mySidenav").style.width = "0";
    $scope.idToUpdate = '';
  };
  
  // Update function for 'edit' button
  $scope.update = function () {
    document.getElementById("mySidenav").style.width = "0";
    var index = 0;
    $scope.data.expenses.forEach( function(exp, index) {
      if (exp._id === $scope.idToUpdate) index = index;
    })
    $scope.newData._id = $scope.idToUpdate;
    $scope.data.expenses[index] = $scope.newData;
    Expenses.updateOne($scope.newData).then(function (expense) {
      console.log("sucessfully updated");
    });
    $scope.newData = {};
    $scope.newData.username = $window.localStorage.getItem('username');
    $scope.idToUpdate = '';
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
    return excelDateString
  }
  

  // On page load, query the data first
  $scope.init();


});
