angular.module('expense.services', [])

.factory('Expenses', function ($http) {
  
  // Get all the expense records
  var getAll = function () {
    return $http({
      method: 'GET',
      url: '/api/expenses'
    })
    .then(function (resp) {
      return resp.data;
    });
  };
  
  // Get all the records belong to the current user
  var getMine = function (data) {
    return $http({
      method: 'POST',
      url: '/api/expensesbyuser',
      data: data
    })
    .then(function (resp) {
      return resp.data;
    });
  };
  
  // Add one record
  var addOne = function (data) {
    return $http({
      method: 'POST',
      url: '/api/expenses',
      data: data
    });
  };
  

  // Delete one expense record here
  // Somehow DELETE method does not allow to send data, 
  // use POST instead as workaround
  var deleteOne = function (data) {
    console.log("service", data);
    return $http({
      method: 'POST',
      url: '/api/expense',
      data: data
    });
  }
  
  // Update one record
  var updateOne = function (data) {
    // console.log(data);
    return $http({
      method: 'POST',
      url: '/api/editexpense',
      data: data
    });
  }

  return {
    getAll: getAll,
    getMine: getMine,
    addOne: addOne,
    deleteOne: deleteOne,
    updateOne: updateOne
  };
})
.factory('Auth', function ($http, $location, $window) {
  // Auth service is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'expenseTracker'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('expenseTracker');
  };
  
  // Check if the user is an admin
  var isAdmin = function (data) {
    return $http({
      method: 'POST',
      url: '/api/users/isadmin',
      data: data
    })
    .then(function (resp) {
      return resp.data;
    });
  };
    
  var signout = function () {
    $window.localStorage.removeItem('expenseTracker');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    isAdmin: isAdmin,
    signout: signout
  };
});
