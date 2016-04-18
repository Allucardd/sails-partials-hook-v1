angular
	.module("Login",[])
	.controller({
		LoginController:function($scope) {
			_.extend($scope,{
				username:"",
				password:"",
				firstTime:false,
				testPassword:function() {
					var password = $scope.password;
					var valid = $scope.passValid = /^\S[a-zA-Z0-9]{3,}(\S*$)/g.test(password)
				},
				testUsername:function() {
					$scope.username = $scope.username.toLowerCase();
					var username = $scope.username;

					var valid = $scope.nameValid = /^\S[a-z0-9]{3,}(\S*$)/g.test(username)
				},
				request_login:function(data) {
					console.log("data",data);
				}//end request_login
			})

		}//end LoginController
	})
	.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
  });

function test(e) {
	var self = document.formLogin.entryLogin;
	var d = /[a-zA-Z0-9]{3,}(\S*$)/.test(self.value);
	console.log(d);
}

// /^\S[a-zA-Z0-9]{3,}(\S*$)/g
