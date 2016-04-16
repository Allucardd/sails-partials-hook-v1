angular.module("Foro",[])
	.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol("{[{");
    $interpolateProvider.endSymbol("}]}");
  })
	.controller("ForoController",function ($scope) {
		/*
		$scope.programs = [{
			name:"Trabajo Social",
			image:"/imagenes/icon_trabajo_social.png"
		},{
			name:"Teologia",
			image:"/imagenes/icon_teologia.png"
		},{
			name:"Ingenieria de Sistemas",
			image:"/imagenes/icon_sistema.png"
		},{
			name:"Ingenieria Civil",
			image:"/imagenes/icon_ingenieria_civil.png"
		},{
			name:"Antropologia",
			image:"/imagenes/icon_antropologia.png"
		}]
		*/
		$(document).ready(function() {
			var $slick = $(".wrap-grid-programs__ul")
			$slick.slick({
				infinite: false,
				slidesToShow: 4,
				slidesToScroll: 4,
				arrows:true,
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



	})
