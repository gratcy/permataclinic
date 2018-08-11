jQuery(function($) {

	//jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$('.navbar-nav li a').bind('click', function(event) {
			var $anchor = $(this);
			var nav = $($anchor.attr('href'));
			if (nav.length) {
			$('html, body').stop().animate({				
				scrollTop: $($anchor.attr('href')).offset().top				
			}, 1500, 'easeInOutExpo');
			
			event.preventDefault();
			}
		});
						
	});	

	$.getJSON( "/insta.json", function( data ) {
		var items = [];
		var res = ''
		var insta = data.entry_data.ProfilePage[0].user.media.nodes;
		if(window.innerWidth <= 800 && window.innerHeight <= 640) {
			insta = insta.slice(0,4);
		}
		else {
			insta = insta.slice(0,8);
		}
		
		$.each( insta, function( key, val ) {
			res = '<div class="portfolio-item apps col-xs-12 col-sm-4 col-md-3">';
			res += '<div class="recent-work-wrap">';
			res += '<img class="img-responsive" src="'+val.thumbnail_resources[2].src+'" alt="">';
			res += '<div class="overlay">';
			res += '<div class="recent-work-inner">';
			res += '<p>'+(val.caption.length > 200 ? val.caption.substr(0,200) : val.caption)+'...</p>';
			res += '<a class="preview" href="'+val.display_src+'" rel="prettyPhoto"><i class="fa fa-eye"></i> View</a>';
			res += '</div>';
			res += '</div>';
			res += '</div>';
			res += '</div>';
			items.push( res );
		});
		$('.portfolio-items').append(items.join(''));
		
		//Initiat WOW JS
		new WOW().init();

		// portfolio filter
		$(window).load(function(){'use strict';
			var $portfolio_selectors = $('.portfolio-filter >li>a');
			var $portfolio = $('.portfolio-items');
			$portfolio.isotope({
				itemSelector : '.portfolio-item',
				layoutMode : 'fitRows'
			});
			
			$portfolio_selectors.on('click', function(){
				$portfolio_selectors.removeClass('active');
				$(this).addClass('active');
				var selector = $(this).attr('data-filter');
				$portfolio.isotope({ filter: selector });
				return false;
			});
		});


		//Pretty Photo
		$("a[rel^='prettyPhoto']").prettyPhoto({
			social_tools: false
		});	
	});
	
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollup').fadeIn();
			} else {
				$('.scrollup').fadeOut();
			}
		});
		$('.scrollup').click(function(){
			$("html, body").animate({ scrollTop: 0 }, 1000);
				return false;
		});
        
    //Google Map
    var get_latitude = $('#google-map').data('latitude');
    var get_longitude = $('#google-map').data('longitude');

    function initialize_google_map() {
        var myLatlng = new google.maps.LatLng(get_latitude, get_longitude);
        var mapOptions = {
            zoom: 14,
            scrollwheel: false,
            center: myLatlng
        };
        var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map
        });
    }
    google.maps.event.addDomListener(window, 'load', initialize_google_map);
	
	
});
