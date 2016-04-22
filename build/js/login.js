angular
	.module("Login",[])
	.controller("LoginController",["$scope","$http",function($scope,$http) {
			_.extend($scope,{
				username:"",
				password:"",
				firstTime:false,
				formValid:false,
				validateForm:function() {
					var name = $scope.nameValid;
					var pass = $scope.passValid;
					if(name && pass) {
						$scope.formValid = true;
					} else {
						$scope.formValid = false;
					}
				},
				testPassword:function() {
					var password = $scope.password;
					var valid = $scope.passValid = /^\S[a-zA-Z0-9]{3,}(\S*$)/g.test(password);
					$scope.validateForm();
				},
				testUsername:function() {
					$scope.username = $scope.username.toLowerCase();
					var username = $scope.username;
					var valid = $scope.nameValid = /^\S[a-z0-9]{3,}(\S*$)/g.test(username);
					$scope.validateForm();
				},
				resetPassword:function(oldPassword,newPassword) {
					var request = $http({
						method:"PUT",
						url:"/v1/user",
						data:{
							"newPassword":newPassword,
							"oldPassword":oldPassword
						}
					})
					.then(function(data) {
						window.location.href = "/home";
					})
					.catch(function(error) {
						if(error.status === 500) {
							swal({title:"Ooops!!",text:"Error interno del servidor intenta mas tarde.",type:"error"})
						} else if(error.status === 400 || error.status === 404) {
							swal({title:"Ooops!!",text:"Error tenemos problemas para actualizar la contraseña por favor intenta desde la <a href='/profile'>configuracion de cuenta</a>",type:"error"})
						}
					})
				},
				request_login:function() {
					var formValid = $scope.formValid;
					var username = $scope.username;
					var password = $scope.password;

					if(formValid) {
						console.log(username,password)
						var message = {showConfirmButton: false,title:"Procesando",imageUrl: "imagenes/loader.gif"};
						swal(message);

						var request = $http({
							method:"POST",
							url:"/login",
							data:{
								"username":username.toUpperCase(),
								"password":password
							}
						})
						.then(function success(response) {
							if(response.data.login_once) {
								swal({
									title:"<h1> Bienvenido </h1> <h3 class='wrap-username'>"+response.data.username+"</h3>" ,
									text: "<h4 class='wrap-welcome-copy'>Como es la primera vez que ingresas, te sugerimos que cambies tu contraseña.</h4>",
									type: "input",
									showCancelButton: true,
									confirmButtonColor: "#EFAD4D",
									confirmButtonText: "Cambiar",
									inputPlaceholder:"Completa este campo",
									closeOnConfirm: false,
									html: true,
									inputType:"password",
									cancelButtonText:"Omitir"
								}, function(newPassword) {
									var oldPass = document.getElementById("password").value;
									var isValid = /^\S[a-zA-Z0-9]{3,}(\S*$)/g.test(newPassword);
									if(isValid) {
										$scope.resetPassword(oldPass,newPassword);
									} else {
										swal.showInputError("Escribe una contraseña con minimo 4 caracteres sin espacios.");
									}
								});
							} else {
								window.location.href = "/home";
							}
						},function error (response) {
							console.log("response",response);
							if(response.status === 400) {
								if( response.data.message === "Bad password" ) {
									var message = {title:"",text:"Contraseña errada",type:"error"};
									swal(message);
								}
							} else if(response.status === 404) {
								if( response.data.message === "User not found" ) {
									var message = {title:"",text:"Usuario no encontrado",type:"error"};
									swal(message);
								} else if( response.data.message === "Cedula no encontrada") {
									var message = {title:"",text:"Documento de identidad no encontrado",type:"info"};
									swal(message);
								}
 							} else if(response.status === 403) {
								if( response.data.message === "Is already login") {
									var message = {title:"",text:"Ya hay una session activa",type:"info"};
									swal(message);
								}
							} else if(response.status === 500) {
								var message = {title:"Ooops!!",text:"ocurrio un error interno en el servidor, intenta inciar session mas tarde",type:"error"};
								swal(message);
							}
						})
					} else {
						var message = {title:"",text:"Debes completar los campos requeridos correctamente",type:"error",confirmButtonText:"Ok"};
						swal(message);
					}
				}//end request_login
			})
	}])
	.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
  });
