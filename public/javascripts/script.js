/**
 * @file Main JavaScript file
 * Applying effects on the user interface
 */

$(document).ready(function() {

	/** Smooth scrolling effect */
	$('a[href^="#"]').on('click', function(e) {
		e.preventDefault();

		var target = this.hash;
		var $target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 500, 'swing', function() {
			window.location.hash = target;
		});
	});
});