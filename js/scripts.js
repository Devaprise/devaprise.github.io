
function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if(element_class != '.top-content') {
		element_class += '-container';
		scroll_to = $(element_class).offset().top - nav_height;
	}
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
	}
}


jQuery(document).ready(function() {
	
	/*
	    Navigation
	*/
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		scroll_to($(this), $('nav').outerHeight());
	});
	// toggle "navbar-no-bg" class
	$('.top-content').waypoint(function() {
			$('nav').toggleClass('navbar-no-bg');
		}, {
			offset: function() {
						return -$(this).height() + $('nav').outerHeight();
					}
		});
	
	
    /*
        Background slideshow
    */
    $.backstretch([
                  "images/Header-Background2.png",
                  "images/background.png",
                  "images/Header-Background1.png",
                  "images/one.PNG"
                ], {duration: 3000, fade: 750});
    // pause slideshow
    $.backstretch('pause');
    // change background when screen scrolls
    $('.section-container').waypoint(function(direction) {
    	if(direction === 'down') { $.backstretch('next'); }
    	else if(direction === 'up') { $.backstretch('prev'); }
    }, {
		offset: function() {
			return -$(this).height() + $('nav').outerHeight();
		}
	});
    
    /*
        Wow
    */
    new WOW().init();
});