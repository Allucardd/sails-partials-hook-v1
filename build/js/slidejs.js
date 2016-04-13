//almacenar slider en una variable
var slider = $('#slider');
//almacenar botones
var siguiente = $('#btn-next');
var anterior = $('#btn-prev');
// mover ultima imagen al primer lugar

$('#slider section:last').insertBefore('#slider section:first');

slideshow.css('margin-left', '-'+100+'%');

function moverD() {
	slider.animate({
	  marginleft:'-'+200+'%' 
	},700, function(){ 
	$('#slider section:first').insertAfter('#slider section:last'); 
	    slideshow.css('margin-left', '-'+100+'%');
});
} 

function moverI() {
	slider.animate({
      marginleft:0 
  },700, function(){ 
	$('#slider section:last').insertBefore('#slider section:first'); 
	    slideshow.css('margin-left', '-'+100+'%');
});
} 

siguiente.on('click', function() { 
 moverD();
 });

anterior.on('click', function() { 
 moverI();
 });