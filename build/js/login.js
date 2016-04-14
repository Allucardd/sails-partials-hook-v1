angular
	.module("Login",[])
	.controller({
		LoginController:function($scope) {
			_.extend($scope,{
				request_login:function(username,password) {
					console.log(username,"username");
					console.log(password,"password");
				}//end request_login
			})

		}//end LoginController
	})
	.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
  });
