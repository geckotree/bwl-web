(function() {

	// toggle class helper
	var toggle = function(el, className) {
		var $target = $('.' + className);

	    if(el.hasClass(className + '--open')) {
			el.removeClass(className + '--open');
			$target.attr('aria-hidden','true');
	    } else {
			el.addClass(className + '--open');
			$target.attr('aria-hidden','false');
	    }
	}

	//data toggle click handler
	$('[data-toggle]').on( "click", function() {
		var $className = $( this ).data("toggle");
		toggle($('html'), $className);
	});

	//scroll to
	$('a[href^="#"]').on('click', function(event) {
	   var target = $( $(this).attr('href') );
	   if( target.length ) {
	       event.preventDefault();
	       $('html, body').animate({
	           scrollTop: target.offset().top
	       }, 800);
	   }
	});

	// svg fallback to png
	if(!Modernizr.svg) {
	    $('img[src*="svg"]').attr('src', function() {
	        return $(this).attr('src').replace('.svg', '.png');
	    });
	}

	/* ===========================================================
		$ INIT
	=========================================================== */


})();