// Make all iframes responsive
// Handle video embeds with aspect ratio
// Input: void
// Return: void
// Dependencies: jQuery
// Call responsiveIframes() in $( document ).ready() or $( window ).load after any DOM manipulation
function responsiveIframes () {
	
	// Handle iframes
	if( $('iframe').length ) {
		
		// 4:3 Video Aspect Ratio = 0.75
		// 16:9 Video Aspect Ratio = 0.5625
		var aspectRatio = 0.5625;
		
		$('iframe').each(function(item) {
			
			// Get frame source attribute
			var frameSource = $(this).attr('src');
			
			// Set iframe width to 100%
			$(this).attr('width', '100%');
			
			// Hide overflowed content
			$(this).attr('style', 'overflow: hidden;');
			
			// Handle embedded video if the source includes a video domain
			if( -1 !== frameSource.indexOf('wistia') ||
			  	-1 !== frameSource.indexOf('vimeo') ||
			  	-1 !== frameSource.indexOf('youtube') ) {
				
				// Set fixed height using appropriate aspect ratio
				$(this).attr('height', $(this).innerWidth() * aspectRatio );	
			}
		});
	}
}