
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
                  "images/one.png"
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
    
    /*
	    Image popup
	*/
	$('.screenshot-box span').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: 'The image could not be loaded.',
			titleSrc: function(item) {
				return item.el.data('img-title');
			}
		},
		callbacks: {
			elementParse: function(item) {
				item.src = item.el.data('img-src');
			}
		}
	});
	
	
	/*
	    Subscription form
	*/
	$('.success-message').hide();
	$('.error-message').hide();
	
	$('.subscribe form').submit(function(e) {
		e.preventDefault();
	    var postdata = $('.subscribe form').serialize();
	    $.ajax({
	        type: 'POST',
	        url: 'assets/subscribe.php',
	        data: postdata,
	        dataType: 'json',
	        success: function(json) {
	            if(json.valid == 0) {
	                $('.success-message').hide();
	                $('.error-message').hide();
	                $('.error-message').html(json.message);
	                $('.error-message').fadeIn('fast', function(){
	                	$('.subscribe form').addClass('animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	            			$(this).removeClass('animated shake');
	            		});
	                });
	            }
	            else {
	                $('.error-message').hide();
	                $('.success-message').hide();
	                $('.subscribe form').hide();
	                $('.success-message').html(json.message);
	                $('.success-message').fadeIn();
	            }
	        }
	    });
	});
	
	/*
	    Contact form
	*/
	$('.contact-form form input[type="text"], .contact-form form textarea').on('focus', function() {
		$('.contact-form form input[type="text"], .contact-form form textarea').removeClass('contact-error');
	});
	$('.contact-form form').submit(function(e) {
		e.preventDefault();
	    $('.contact-form form input[type="text"], .contact-form form textarea').removeClass('contact-error');
	    var postdata = $('.contact-form form').serialize();
	    $.ajax({
	        type: 'POST',
	        url: 'assets/contact.php',
	        data: postdata,
	        dataType: 'json',
	        success: function(json) {
	            if(json.emailMessage != '') {
	                $('.contact-form form .contact-email').addClass('contact-error animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            			$(this).removeClass('animated shake');
            		});
	            }
	            if(json.subjectMessage != '') {
	                $('.contact-form form .contact-subject').addClass('contact-error animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            			$(this).removeClass('animated shake');
            		});
	            }
	            if(json.messageMessage != '') {
	                $('.contact-form form textarea').addClass('contact-error animated shake').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            			$(this).removeClass('animated shake');
            		});
	            }
	            if(json.emailMessage == '' && json.subjectMessage == '' && json.messageMessage == '') {
	                $('.contact-form form').fadeOut('fast', function() {
	                    $('.contact-form').append('<p>Thanks for contacting us! We will get back to you very soon.</p>');
	                });
	            }
	        }
	    });
	});
    
});


jQuery(window).load(function() {
	
	/*
		Loader
	*/
	$(".loader-img").fadeOut();
	$(".loader").delay(1000).fadeOut("slow");
	
	/*
		Modal images
	*/
	$(".modal-body img").attr("style", "width: 100% !important; height: auto !important;");
	
});
