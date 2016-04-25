angular.module("Foro",[])
	.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol("{[{");
    $interpolateProvider.endSymbol("}]}");
  })
	.controller("ForoController",function ($scope,$http) {
		$scope.request_program = function() {
			alert("fewfw");
		}
	$scope.posts = [];
    $scope.newpost = {};
    $scope.n_post = [];
    var limit_post = 5;
		$(document).ready(function() {
			var $slick = $(".wrap-grid-programs__ul")
			$slick.slick({
				infinite: false,
				slidesToShow: 4,
				slidesToScroll: 4,
				arrows:true,
				speed:200,
				centerPadding: '60px',
				responsive: [{
		      breakpoint: 1062,
		      settings: {
		        slidesToShow: 3,
		        slidesToScroll: 3
		      }
		    },{
		      breakpoint: 570,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2
		      }
		    },{
		      breakpoint: 460,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }]
			});

			$(".slick-prev").addClass("hide");
			$(".slick-next").addClass("hide");

			$('.left').click(function(){
				$(".slick-prev").trigger("click");
			})

			$('.right').click(function(){
				$(".slick-next").trigger("click");
			})
		})
		//end slick-functions

$scope.addpost = function(){
		alert("heeeeeeeehy");
            $scope.validate_description = document.getElementById("text_description").value
            $scope.validate_title = document.getElementById("text_title").value
            $http.post("https://uniclaretiana.herokuapp.com/v1/post",{
						withCredentials: true,
						headers:{'Content-Type': 'application/json; charset=utf-8'},
            title:  $scope.newpost.title,
            description:  $scope.newpost.description,
            owner_username : $scope.newpost.owner_username,
            category : $scope.newpost.category,
            userId: 1
        })

            .success(function(data,status,headers,config){
           		if (/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test($scope.validate_body) && /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test($scope.validate_title)) {
                    $scope.posts.unshift($scope.newpost);
                    $scope.n_post.unshift($scope.newpost);
                    $scope.newpost = {};
                    limit_post ++
                    console.log($scope.newpost.category)

                }else{
                    alert("Debes llenar los campos titulo y mensaje para poder realizar tu post ")
                };

            })
            .error(function(error,dta,status,headers,config){
                console.log(error)
            })
    }
    //end addpost function

    $http.get("https://uniclaretiana.herokuapp.com/v1/post",{withCredentials: true,headers:{'Content-Type': 'application/json; charset=utf-8'}})
        .success(function(data){
            $scope.posts = data.slice(0,limit_post)
            $scope.n_post = data
            console.log("exito")
            })
            .error(function(err){
                console.log("error",err)

            });
            //end asignation function
            $scope.view = function(){
            limit_post += 5
            $scope.posts = $scope.n_post.slice(0,limit_post)

                };
            // end show_post function

    $scope.filter_category = function  (){
		$scope.filter_mod = document.getElementById("filter_category").value
		$http.get("https://uniclaretiana.herokuapp.com/v1/post?category="+$scope.filter_mod,{withCredentials: true,headers:{'Content-Type': 'application/json; charset=utf-8'}})
        	.success(function(data){
        	limit_post = 5
            $scope.n_post = data
            $scope.posts = data.slice(0,limit_post)
        	console.log(data.length)
            console.log("exito")
            })
            .error(function(err){
                console.log("error",err)

            });
	};//end filter and update category

	$scope.view_answers = function (self) {
	  	self.show_answer++;
	}// end show answers




});//end all script
//http://localhost:1337/v1/post?category=psicologia

//https://uniclaretiana.herokuapp.com/v1/post?category=psicologia


