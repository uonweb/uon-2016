var is_mobile = $(window).width() < 760;
var mobile_menu_width = $(window).width() - 60;
var slideout;
var container;
var uonLightbox;
var uonAccordion;
var uonTooltip;
var uonTabbedContent;
var uonFilterableDatesCarousel;

/*************************************/
/**  Compress UON header on scroll  **/
/*************************************/

$(window).on('scroll',function(){
	if($(window).scrollTop() > 200) {
		$('body[class!="compressed-header"]').addClass('compressed-header');
	} else {
		$('body.compressed-header').removeClass('compressed-header');
	}
});


/*****************************************/
/**  Move menu to slide-out for mobile  **/
/*****************************************/

function moveMenu() {
	if($(window).width() < 760 && $('#slide-menu > ol').length === 0) {
		$('#slide-menu').append($('#mega-menu > ol').addClass('mm'));
		$('#slide-menu').append($('#header-tools > ol').addClass('ht'));
		$('body[class!="mobile"]').addClass('mobile');

		$('#slide-menu .mm > li, #slide-menu .mm .col > p, #slide-menu li#quick-links').append('<a href="#toggle" class="fa fa-plus toggle"></a>');
		
		$('#slide-menu > ol.mm > li > a.toggle').on('click',function(event){
			event.preventDefault();
			$(this).toggleClass('fa-plus').toggleClass('fa-minus');
			$(this).siblings('.menu-columns').slideToggle();
		});
		$('#slide-menu .menu-columns .col p a.toggle').on('click',function(event){
			event.preventDefault();
			$(this).toggleClass('fa-plus').toggleClass('fa-minus');
			$(this).parent().siblings('ol').slideToggle();
		});
		$('#slide-menu > ol.ht > li#quick-links a.toggle').on('click',function(event){
			event.preventDefault();
			$(this).toggleClass('fa-plus').toggleClass('fa-minus');
			$(this).siblings('ol').slideToggle();
		});

	} else if($(window).width() > 760 && $('#mega-menu > ol').length === 0) {
		$('#slide-menu > ol.mm > li > a.toggle').off('click');
		$('#slide-menu .menu-columns').removeAttr('style');
		$('#slide-menu .menu-columns .col p a.toggle').off('click');
		$('#slide-menu > ol.ht > li#quick-links a.toggle').off('click');
		$('#slide-menu a.toggle').remove();
		$('#mega-menu').append($('#slide-menu > ol.mm'));
		$('#header-tools').append($('#slide-menu > ol.ht'));
		$('body.mobile').removeClass('mobile');
	}
}

function initialiseMenu() {
	if(!slideout && is_mobile) {

		slideout = new Slideout({
			'panel': document.getElementById('panel'),
			'menu': document.getElementById('slide-menu'),
			'padding': mobile_menu_width,
			'tolerance': 70
		});
		$('#menu-toggle-button').on('click', function() {
			slideout.toggle();
		});

	} else if(slideout && !is_mobile) {

		slideout.destroy();

	}
}

$(window).on('resize',function(){
	is_mobile = $(window).width() < 760;
	mobile_menu_width = $(window).width() - 60;
	initialiseMenu();
	moveMenu();
});

(function($){
	$(document).ready(function(){

		/* Mobile menu */

		initialiseMenu();
		moveMenu();

		$('#uon-footer .col h4').on('click',function(){
			if(is_mobile) {
				$(this).toggleClass('open');
				$(this).next('ul').slideToggle();
			}
		});
		

		/******************/
		/**  Search box  **/
		/******************/

		$('#search-select-options li').on('click',function(){
			$('#search-select-options li.active').removeClass('active');
			$('#search-select-label').text($(this).text());
			$(this).addClass('active');
			$('#search-field').focus();
			$('#hidden-search-fields').html('');
			switch ($(this).data('search')) {
				case 'default':
					$('#hidden-search-fields').append('<input type="hidden" name="client" value="default_frontend" />');
					$('#hidden-search-fields').append('<input type="hidden" name="proxystylesheet" value="default_frontend" />');
					$('#hidden-search-fields').append('<input type="hidden" name="tlen" value="90" />');
					break;
				case 'staff':
					$('#hidden-search-fields').append('<input type="hidden" name="client" value="staff_listing" />');
					$('#hidden-search-fields').append('<input type="hidden" name="site" value="staff_directory" />');
					$('#hidden-search-fields').append('<input type="hidden" name="proxystylesheet" value="staff_listing" />');
					$('#hidden-search-fields').append('<input type="hidden" name="num" value="1000" />');
					$('#hidden-search-fields').append('<input type="hidden" name="filter" value="0" />');
					$('#hidden-search-fields').append('<input type="hidden" name="dnavs" value="" />');
					$('#hidden-search-fields').append('<input type="hidden" name="partialfields" value="" />');
					break;
				case 'study':
					$('#hidden-search-fields').append('<input type="hidden" name="client" value="study_search" />');
					$('#hidden-search-fields').append('<input type="hidden" name="site" value="study_collection" />');
					$('#hidden-search-fields').append('<input type="hidden" name="proxystylesheet" value="study_search" />');
					$('#hidden-search-fields').append('<input type="hidden" name="num" value="1000" />');
					$('#hidden-search-fields').append('<input type="hidden" name="filter" value="0" />');
					$('#hidden-search-fields').append('<input type="hidden" name="dnavs" value="" />');
					$('#hidden-search-fields').append('<input type="hidden" name="partialfields" value="" />');
					break;
				case 'policy':
					$('#hidden-search-fields').append('<input type="hidden" name="client" value="policy_search">');
					$('#hidden-search-fields').append('<input type="hidden" name="site" value="policy_collection">');
					$('#hidden-search-fields').append('<input type="hidden" name="proxystylesheet" value="policy_search">');
					$('#hidden-search-fields').append('<input type="hidden" name="num" value="1000">');
					$('#hidden-search-fields').append('<input type="hidden" name="filter" value="0">');
					$('#hidden-search-fields').append('<input type="hidden" name="dnavs" value="" />');
					$('#hidden-search-fields').append('<input type="hidden" name="partialfields" value="" />');
					break;
			}
		});


		/* Mega-menu highlight */
		$('#mega-menu a[href$="'+document.location.pathname+'"]').addClass('highlight');


		/* Content menu toggle */
		$('.menu-toggle').on('click',function(event){
			event.preventDefault();
			$(this).parent().toggleClass('open');
			$(this).next('ol').slideToggle();
		});


        /**  If no sidebar, and using default three-column, then expand to two-column with menu  **/
        if($('#uon-body').hasClass('three-column') && $('.body-sidebar').length == 0) {
            $('#uon-body').addClass('two-column').removeClass('three-column');
        }


		/*************************************/
		/**  Stackable grid initialisation  **/
		/*************************************/

		if($('.stackable-block[data-date]').length > 0) {

			container = $('.stackable-grid').isotope({
				itemSelector: '.stackable-block',
				layoutMode: 'packery',
				packery: {
				  columnWidth: '.stackable-block'
				},
				percentPosition: true,
				getSortData: {
				  date: '[data-date]' // value of attribute
				},
				sortBy: 'date',
				sortAscending: false
			});

		} else {

			container = $('.stackable-grid').isotope({
				itemSelector: '.stackable-block',
				layoutMode: 'packery',
				packery: {
				  columnWidth: '.stackable-block'
				},
				percentPosition: true,
				hiddenStyle: {
					display: 'none'
				  },
				  visibleStyle: {
				    display: 'block'
				  }
			});

		}

		container.imagesLoaded().progress( function() {
		  container.isotope('layout');
		});

		$('#audience-filter a').on('click',function(event){
			event.preventDefault();
			$('#audience-filter a.active').removeClass('active');
			$(this).addClass('active');
			container.isotope({ filter: $(this).data('filter') });

			setCookie('uon-home-filter',$(this).data('filter'),1000);

		});

		var home_filter = getCookie('uon-home-filter');
		if(home_filter != '') {
			$('#audience-filter a[data-filter="'+home_filter+'"]').click();
		}



		$('.timeline').each(function(){

			var first_marker = $(this).find('.marker').first();
			var last_marker = $(this).find('.marker').last().prev();

			// console.log(first_marker.data('time'),last_marker.data('time'));
			
			var timeline_width = last_marker.data('time') - first_marker.data('time');

			var today = new Date();
			$('#today-marker').attr('data-time',Math.round(today.getTime()/1000));

			$(this).find('.marker').each(function(){
				var p = (((($(this).data('time')-first_marker.data('time'))/timeline_width)*90)+5);
				if(p > 0) {
					$(this).css({'left':p+'%'});
				} else {
					$(this).hide();
				}
				if($(this).data('end') > $(this).data('time')) {
					var e = (((($(this).data('end')-first_marker.data('time'))/timeline_width)*90)+5);
					$(this).width((e-p)+'%');
				}
			}).hover(function(){
				$('.dates-list li[data-time="'+$(this).data('time')+'"]').toggleClass('glow');
			});

			$('.dates-list li').hover(function(){
				$('.timeline .marker[data-time="'+$(this).data('time')+'"]').toggleClass('glow');
			});

		});

	});
})(jQuery);


function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
} 

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	}
	return "";
} 


$(function() {

/******************************************************/
/**                                                  **/
/**   UON-LightBox (uon-lightbox.js)                 **/
/**   ============                                   **/
/**   Dean Robinson 24/06/2015                       **/
/**                                                  **/
/**    - 22/09/2015                                  **/
/**      Added cross-domain request capability       **/
/**      Added support for portrait iPad layout      **/
/**    - 22/02/2016                                  **/
/**      Lightbox next/prev navigation updated to    **/
/**      skip over hidden links                      **/
/**    - 29/06/2016                                  **/
/**      Version 2 with grouping functionality       **/
/**      Nav is only applied to grouped sets         **/
/**                                                  **/
/******************************************************/

var	modal_links, modal_links_grouped;
var	modal_links_object = new Object();
var modal_links_object_array;

uonLightbox = function(s) {

	// Remove 'popup-link' class from any PDF links, make them open in new window instead.
	$(s+'[href*=".pdf"]').removeClass('popup-link').attr('target','_blank');

	// Insert lightbox HTML structure into page
	if($('#uon-lightbox').length === 0) {

		$('body').append('<a href="#close-lightbox" name="close-lightbox" id="uon-lightbox-close">Close</a><div id="uon-lightbox-overlay"></div><div id="uon-lightbox"><div id="uon-lightbox-content"></div></div><div id="uon-lightbox-navigation"><div id="uon-lightbox-navigation-previous"></div><div id="uon-lightbox-navigation-next"></div></div><span id="uon-lightbox-loading" class="fa fa-refresh"></span>');

		// Close the lightbox when clicking on the overlay or close button
		$('#uon-lightbox-overlay,#uon-lightbox-close').on('click',function(event){
			event.preventDefault();
			$('#uon-lightbox-loading').removeClass('fa-spin');
			$('#uon-lightbox-navigation').fadeOut();
			$('#uon-lightbox-close').fadeOut();
			$('#uon-lightbox').fadeOut('fast',function(){
				$('#uon-lightbox-overlay').fadeOut('fast',function(){
					$('#uon-lightbox').removeClass('no-padding');
					$('#uon-lightbox-content').html('');
					$('#uon-lightbox-navigation-previous').html('');
					$('#uon-lightbox-navigation-next').html('');
				});
			});
		});

	}


	// iPad portrait and up (desktop)
	if ($(window).width() > 700 && (!navigator.userAgent.match(/Android/i) || !navigator.userAgent.match(/webOS/i) || !navigator.userAgent.match(/iPhone/i) || !navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/))) {

		//
		// Default behaviour, no lightbox navigation
		//
		modal_links = $(s+':not([data-popup-group])');

		if(modal_links.length > 0) {

			modal_links.each(function(i){

				$(this).off('click').on('click',function(event){

					event.preventDefault();

					$('#uon-lightbox-navigation').hide();

					var href = $(this).attr('href');

					$('#uon-lightbox-overlay').fadeIn('fast',function(){
						$('#uon-lightbox').fadeIn('fast',function(){
							$('#uon-lightbox-loading').addClass('fa-spin');
							$('#uon-lightbox-close').fadeIn();
							loadLightboxContent(href);
						});
					});

				});

			});

		}

		//
		// Alternate/opt-in behvaiour, includes grouped lightbox navigation
		//

		modal_links_grouped = $(s+'[data-popup-group]');

		if(modal_links_grouped.length > 0) {

			modal_links_grouped.each(function(){
				var popup_group = $(this).data('popup-group');
				if(modal_links_object[popup_group] === undefined) {
					modal_links_object[popup_group] = new Array(popup_group,new Array());
				}
				modal_links_object[popup_group][1].push($(this));
			});

			modal_links_object_array = $.map(modal_links_object, function(value, index) {
				return [value];
			});

			for(var a = 0; a < modal_links_object_array.length; a++) {

				var ml = modal_links_object_array[a][1];

				$(ml).each(function(i){
					$(this).data('counter',i);
				});	

				$(ml).each(function(i){

					var group = $(this).data('popup-group');

					var prev = ml[i-1];
					var next = ml[i+1];

					$(this).off('click').on('click',function(event){

						event.preventDefault();

						/**  Updates the next and previous navigation to only include visible popup links and those that haven't been excluded using the .popup-skip class (handy for eliminating duplicate links)  **/
						for(var p = i-1;p > 0;p--) {
							if($(modal_links_object[group][1][p]).is(':visible') === false || $(modal_links_object[group][1][p]).hasClass('popup-skip')) {
								continue;
							} else {
								prev = modal_links_object[group][1][p];
								break;
							}
						}

						for(var n = i+1;n < modal_links_object[group][1].length;n++) {
							if($(modal_links_object[group][1][n]).is(':visible') === false || $(modal_links_object[group][1][n]).hasClass('popup-skip')) {
								continue;
							} else {
								next = modal_links_object[group][1][n];
								break;
							}
						}

						if(prev) {
							if($(prev).attr('title') !== undefined) {
								$('#uon-lightbox-navigation-previous').html('<a href="'+$(prev).attr('href')+'" data-counter="'+$(prev).data('counter')+'" data-popup-nav-group="'+group+'">'+$(prev).attr('title')+'</a>');
							} else {
								$('#uon-lightbox-navigation-previous').html('<a href="'+$(prev).attr('href')+'" data-counter="'+$(prev).data('counter')+'" data-popup-nav-group="'+group+'">Previous</a>');
							}
						} else {
							$('#uon-lightbox-navigation-previous').html('');
						}
						if(next) {
							if($(next).attr('title') !== undefined) {
								$('#uon-lightbox-navigation-next').html('<a href="'+$(next).attr('href')+'" data-counter="'+$(next).data('counter')+'" data-popup-nav-group="'+group+'">'+$(next).attr('title')+'</a>');
							} else {
								$('#uon-lightbox-navigation-next').html('<a href="'+$(next).attr('href')+'" data-counter="'+$(next).data('counter')+'" data-popup-nav-group="'+group+'">Next</a>');
							}
						} else {
							$('#uon-lightbox-navigation-next').html('');
						}

						var href = $(this).attr('href');

						$('#uon-lightbox-overlay').fadeIn('fast',function(){
							$('#uon-lightbox').fadeIn('fast',function(){
								$('#uon-lightbox-loading').addClass('fa-spin');
								$('#uon-lightbox-close').fadeIn();
								$('#uon-lightbox-navigation').fadeIn();
								loadLightboxContent(href,true);
							});
						});

					});

				});

			}

		}


	}

}

function loadLightboxContent(href,group) {

	group = group || false;

	if(href.toString().indexOf('shapingfutures.com.au') !== -1 ) {

			$('#uon-lightbox-navigation').hide();
			// $('#uon-lightbox-content').html('<iframe src="'+href+'" width="100%" height="'+($('#uon-lightbox').height()-80)+'px" style="border:0 none transparent;"></iframe>');
			$('#uon-lightbox-content').html('<iframe src="'+href+'" width="100%" height="1200" style="border:0 none transparent;"></iframe>');
			$('#uon-lightbox-loading').removeClass('fa-spin');

	} else if(href.toString().indexOf(document.location.host) !== -1 || href.toString().indexOf('http') === -1) {

		var hash = '';
		if(href.toString().indexOf('#')!==-1) {
			var x = href.toString().indexOf('#');
			hash = href.toString().substr(x,href.toString().length-x);
			href = href.toString().substr(0,x);
		}

		$('#uon-lightbox-content').load(href + (href.toString().indexOf('?')!==-1?'&':'?') + 'SQ_PAINT_LAYOUT_NAME=lightbox&SQ_DESIGN_NAME=lightbox',function(response, status, xhr) {
			// if ( status == "error" ) {
			// 	var msg = "Sorry but there was an error: ";
			// 	$( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
			// }
			// $('#handbook-lightbox .feed-page h1').unwrap();
			$('#uon-lightbox-loading').removeClass('fa-spin');
			if(group) {
				addLightboxNavEvents();
			}
			uonAccordion('#uon-lightbox-content .accordion-title a');
			uonTooltip('#uon-lightbox-content [data-tooltip]');
		});

	} else {

		$('#uon-lightbox-navigation').hide();
		$.ajax({
			url: href + (href.toString().indexOf('?')!==-1?'&':'?') + 'SQ_PAINT_LAYOUT_NAME=jsonp&SQ_DESIGN_NAME=jsonp',
			dataType: 'jsonp',
			jsonpCallback: 'callback',
			success: function(data) {
				$('#uon-lightbox-content').html(data);
				$('#uon-lightbox-loading').removeClass('fa-spin');
				if(group) {
					addLightboxNavEvents();
				}
				uonAccordion('#uon-lightbox-content .accordion-title a');
				uonTooltip('#uon-lightbox-content [data-tooltip]');
			}
		});

	}

}


/******************************************************************************/
/**  Add events to the next/prev buttons, only applicable if nav is enabled  **/
/******************************************************************************/

function addLightboxNavEvents() {

	$('#uon-lightbox-navigation a').on('click',function(event){

		event.preventDefault();

		var href = $(this).attr('href');

		var count = $(this).data('counter');
	
		var group = $(this).data('popup-nav-group');

		$('#uon-lightbox-content').html('');
		$('#uon-lightbox-loading').addClass('fa-spin');

		var prev = modal_links_object[group][1][count-1];
		var next = modal_links_object[group][1][count+1];

		/**  Updates the next and previous navigation to only include visible popup links and those that haven't been excluded using the .popup-skip class (handy for eliminating duplicate links)  **/
		for(var p = count-1;p > 0;p--) {
			if($(modal_links_object[group][1][p]).is(':visible') === false || $(modal_links_object[group][1][p]).hasClass('popup-skip')) {
				continue;
			} else {
				prev = modal_links_object[group][1][p];
				break;
			}
		}

		for(var n = count+1;n < modal_links_object[group][1].length;n++) {
			if($(modal_links_object[group][1][n]).is(':visible') === false || $(modal_links_object[group][1][n]).hasClass('popup-skip')) {
				continue;
			} else {
				next = modal_links_object[group][1][n];
				break;
			}
		}

		if(prev) {
			if($(prev).attr('title') !== undefined) {
				$('#uon-lightbox-navigation-previous').html('<a href="'+$(prev).attr('href')+'" data-counter="'+$(prev).data('counter')+'" data-popup-nav-group="'+$(prev).data('popup-group')+'">'+$(prev).attr('title')+'</a>');
			} else {
				$('#uon-lightbox-navigation-previous').html('<a href="'+$(prev).attr('href')+'" data-counter="'+$(prev).data('counter')+'" data-popup-nav-group="'+$(prev).data('popup-group')+'">Previous</a>');
			}
		} else {
			$('#uon-lightbox-navigation-previous').html('');
		}
		if(next) {
			if($(next).attr('title') !== undefined) {
				$('#uon-lightbox-navigation-next').html('<a href="'+$(next).attr('href')+'" data-counter="'+$(next).data('counter')+'" data-popup-nav-group="'+$(next).data('popup-group')+'">'+$(next).attr('title')+'</a>');
			} else {
				$('#uon-lightbox-navigation-next').html('<a href="'+$(next).attr('href')+'" data-counter="'+$(next).data('counter')+'" data-popup-nav-group="'+$(next).data('popup-group')+'">Next</a>');
			}
		} else {
			$('#uon-lightbox-navigation-next').html('');
		}

		loadLightboxContent(href,true);

	});

}

uonLightbox('.body-content a.popup-link');



/*****************/
/**  Accordion  **/
/*****************/

uonAccordion = function(s) {

	$(s).on('click',function(event){
		event.preventDefault();
		if($(this).parentsUntil('.accordion').parent().hasClass('accordion-multiple')) { // Multiple sections open
			$(this).parentsUntil('.accordion').toggleClass('open').next('.accordion-content').slideToggle(100,function(){
				if(container) {
					container.isotope('layout');
				}
			});
		} else { // Single sectrion open
			if(!$(this).parentsUntil('.accordion').last().hasClass('open')) {
				$(this).parentsUntil('.accordion').last().parent().find('.accordion-panel.open').toggleClass('open').find('.accordion-content').slideToggle(100);
			}
			$(this).parentsUntil('.accordion').last().toggleClass('open');
			$(this).parent().next('.accordion-content').slideToggle(100,function(){
				if(container) {
					container.isotope('layout');
				}
			});
		}
	});

}

uonAccordion('.body-content .accordion-title a');



/****************/
/**  Tooltips  **/
/****************/

uonTooltip = function(s) {
	$(s).each(function(){
		$(this).append('<span class="fa fa-question-circle tooltip-icon"><span class="tooltip">'+$(this).data('tooltip')+'</span></span>');
	});
}

uonTooltip('[data-tooltip]');



/**********************/
/**  Tabbed content  **/
/**********************/

uonTabbedContent = function(s) {

	$(s).each(function(){
		var t = $(this);
		var t_nav = t.find('.tabbed-nav a');
		var t_content = t.find('.tabbed-content');
		t_nav.on('click',function(event){
			event.preventDefault();
			t_content.hide(0,function(){ $(this).addClass('hidden') });;
			t.find($(this).attr('href')).show(0,function(){ $(this).removeClass('hidden'); });
			t_nav.removeClass('selected');
			$(this).addClass('selected');
			if(container) {
				container.isotope('layout');
			}
		});
	});

}

uonTabbedContent('.tabbed-block');



/*************************************/
/**  Filterable Key Dates Carousel  **/
/*************************************/

uonFilterableDatesCarousel = function() {

    if($('.key-date-carousel').length > 0) {

        if(typeof extra_date_filters !== 'undefined' && extra_date_filters.length > 0) {

            for(var i = 0;i < extra_date_filters.length;i++) {
                $('.key-date-carousel-inner').find('li[data-filter~="'+extra_date_filters[i]+'"]').hide();
            }

        }

        var checkHiddenDates = function(){

            $('.key-date-carousel-inner > div.month-box').each(function(){
                var hidden_count = 0;
                $(this).find('li:visible').each(function(){
                    if($(this).position().top > $(this).parent().parent().height()-40) {
                        hidden_count++;
                    }
                });
                var hc = $(this).find('.hidden-count');
                if(hidden_count > 0 && !$(this).hasClass('active-month-box')) {
                    hc.text('+ '+hidden_count+' more').fadeIn();
                } else {
                    hc.fadeOut();
                }
            });

        }

        var checkNextPrev = function(x,full_width){
            var prev = x.siblings('.key-date-carousel-prev');
            var next = x.siblings('.key-date-carousel-next');
            if(parseInt(x.css('left')) == 0) {
                prev.animate({'opacity':0.1});
            } else {
                prev.animate({'opacity':1});
            }
            if(parseInt(x.css('left')) == -parseInt(full_width)) {
                next.animate({'opacity':0.1});
            } else {
                next.animate({'opacity':1});
            }
        }

        $('.key-date-carousel-inner').each(function(){

            var p = $(this);

            var kdc_width = $('.key-date-carousel').width();

            var today = Date.now()/1000;
            var today_date = new Date();
            var today_week = parseInt(today_date.weekNumber());
            p.find('li').each(function(){
                var this_date = new Date($(this).data('date')*1000);
                var this_week = parseInt(this_date.weekNumber());
                if(this_week == today_week) {
                    $(this).addClass('this-week-date').find('strong').append('<span class="this-week">This week!</span>');
                } else if(this_week == today_week+1) {
                    $(this).addClass('next-week-date').find('strong').append('<span class="next-week">Next week!</span>');
                }
            });

            var maxh = 0;
            var maxw = $(window).width() <= 768 ? $(window).width() : (p.width()/2.5 > 500 ? p.width()/2.5 : 500);

            p.attr('data-max-width',maxw);

            $('.key-date-carousel-inner > div.month-box').each(function(){
                $(this).width(maxw);
                if($(this).height() > maxh) maxh = $(this).height();
                $(this).attr('data-full-height',$(this).height());
            }).first().css({marginLeft:(kdc_width-maxw)/2}).addClass('active-month-box').end().find('.month-box-inner').height($('.key-date-carousel-inner > div.active-month-box').data('full-height')-100); // maxh

            var full_width = (($('.key-date-carousel-inner > div').length-1) * maxw);
            p.width(full_width+kdc_width).attr('data-full-width',full_width);

            checkHiddenDates();

            // Previous item
            p.siblings('.key-date-carousel-prev').on('click',function(event){

                event.preventDefault();

                if(parseInt(p.css('left')) == 0) return false;

                p.find('.active-month-box').removeClass('active-month-box').prev().addClass('active-month-box');

                p.animate({'left':'+='+p.attr('data-max-width')},500, function(){
                    checkNextPrev(p,p.attr('data-full-width'));
                });

                $('.key-date-carousel-inner > div.month-box > div').animate({'height':$('.key-date-carousel-inner > div.active-month-box').attr('data-full-height')},500);

                setTimeout(checkHiddenDates,1000);

                if(container) {
                    setTimeout(function(){
                        container.isotope('layout');
                    },1000);
                }

            }).css({'margin-left':-(maxw/2)-40});

            // Next item
            p.siblings('.key-date-carousel-next').on('click',function(event){

                event.preventDefault();
            
                if(parseInt(p.css('left')) == -parseInt(p.attr('data-full-width'))) return false;

                p.find('.active-month-box').removeClass('active-month-box').next().addClass('active-month-box');

                p.animate({'left':'-='+p.attr('data-max-width')},500,function(){
                    checkNextPrev(p,p.attr('data-full-width'));
                });

                $('.key-date-carousel-inner > div.month-box > div').animate({'height':$('.key-date-carousel-inner > div.active-month-box').attr('data-full-height')},500);

                setTimeout(checkHiddenDates,1000);

                if(container) {
                    setTimeout(function(){
                        container.isotope('layout');
                    },1000);
                }

            }).css({'margin-right':-(maxw/2)-40});

            checkNextPrev(p,full_width);

        });

        $('.key-date-carousel-filters a').each(function(){

            if(!$(this).attr('href')) {
                $(this).attr('href','#filter-'+$(this).text().toLowerCase().replace(' ','-'));
            }

        }).on('click',function(event){

            event.preventDefault();

            $(this).siblings('.active').removeClass('active');
            if($(this).attr('href').substr(1) == 'all') {
                $(this).addClass('active').parent().next('.key-date-carousel-inner').find('li').show();
            } else {
                $(this).addClass('active').parent().next('.key-date-carousel-inner').find('li').show().parent().find('li:not([data-filter~="'+$(this).attr('href').substr(1)+'"])').hide();
            }

            if(typeof extra_date_filters !== 'undefined' && extra_date_filters.length > 0) {
                for(var i = 0;i < extra_date_filters.length;i++) {
                   $('.key-date-carousel-inner').find('li[data-filter~="'+extra_date_filters[i]+'"]').hide();
                }
            }

            var maxh = 0;
            var oh = $('.key-date-carousel-inner > div.active-month-box').attr('data-full-height');
            $('.key-date-carousel-inner > div.month-box').each(function(){
                $(this).find('.month-box-inner').css({'height':''});
                if($(this).height() > maxh) maxh = $(this).height();
                $(this).attr('data-full-height',$(this).height());
            }).find('.month-box-inner').css({'height':oh}).animate({'height':$('.key-date-carousel-inner > div.active-month-box').attr('data-full-height')},500);

            if(container) {
                setTimeout(function(){
                    $(window).resize();
                    container.isotope('layout');
                },1000);
            }

        });

        $(window).on('resize',function(){

            var p = $('.key-date-carousel-inner');
            p.width('auto');

            var kdc_width = $('.key-date-carousel').width();

            var maxh = 0;
            var maxw = $(window).width() <= 768 ? $(window).width() : (p.width()/2.5 > 500 ? p.width()/2.5 : 500);

            p.attr('data-max-width',maxw);

            var oh = $('.key-date-carousel-inner > div.active-month-box').attr('data-full-height');
            $('.key-date-carousel-inner > div.month-box').each(function(){
                $(this).width(maxw);
                $(this).find('.month-box-inner').height('auto');
                if($(this).height() > maxh) maxh = $(this).height();
                $(this).attr('data-full-height',$(this).height());
            }).first().css({marginLeft:(kdc_width-maxw)/2}).end().find('.month-box-inner').css({'height':oh}).css({'height':$('.key-date-carousel-inner > div.active-month-box').attr('data-full-height')});

            p.css({'left':-$('div.month-box').index($('div.active-month-box'))*p.attr('data-max-width')});

            var full_width = (($('.key-date-carousel-inner > div').length-1) * maxw);
            p.width(full_width+kdc_width).attr('data-full-width',full_width);

            checkHiddenDates();

            // Previous item
            p.siblings('.key-date-carousel-prev').css({'margin-left':-(maxw/2)-40});

            // Next item
            p.siblings('.key-date-carousel-next').css({'margin-right':-(maxw/2)-40});

            checkNextPrev(p,full_width);

        });

        // Scroll through to next applicable date
        $('.key-date-carousel-inner').each(function(){

            var key_today_date = new Date();

            var key_month = key_today_date.getMonth()+1;
            if(key_month < 10) { key_month = "0"+key_month; }

            var key_day = key_today_date.getDate();
            if(key_day < 10) { key_day = "0"+key_day; }

            var key_today = key_today_date.getFullYear()+""+key_month+""+key_day;

            var p = $(this);
            var parent_index = 0;

            $(this).find('.month-box').each(function(){

                parent_index = $(this).index();
                var ret = true;

                $(this).find('li[data-date]').each(function(){
                    if(key_today < $(this).data('date')) {
                        for(var a = 0;a<parent_index;a++) {
                            p.siblings('.key-date-carousel-next').click();
                        }
                        ret = false;
                    }
                    return ret;
                });

                return ret;

            });

        });

    }

};

uonFilterableDatesCarousel();



});



/*******************************************/
/**  Remove a class based on it's prefix  **/
/*******************************************/

$.fn.removeClassPrefix = function(prefix) {
	this.each(function(i, el) {
		var classes = el.className.split(" ").filter(function(c) {
			return c.lastIndexOf(prefix, 0) !== 0;
		});
		el.className = $.trim(classes.join(" "));
	});
	return this;
};



/*******************************************************************************/
/**  Read a page's GET URL variables and return them as an associative array  **/
/*******************************************************************************/

function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}



/*
(function($){

	$(document).ready(function(){

		var carousel = $('#carousel');
		var number_of_slides = carousel.find('.carousel-slide').length;

		$('#carousel-next').on('click',function(event){

			event.preventDefault();

			var active_slide = carousel.find('.carousel-slide.active');

			if(active_slide.data('position') === number_of_slides) {
				carousel.find('.carousel-slide').first().addClass('active');
			} else {
				active_slide.next().addClass('active');
			}
			active_slide.removeClass('active');

		});

		$('#carousel-previous').on('click',function(event){

			event.preventDefault();

			var active_slide = carousel.find('.carousel-slide.active');

			if(active_slide.data('position') === 1) {
				carousel.find('.carousel-slide').last().addClass('active');
			} else {
				active_slide.prev().addClass('active');
			}
			active_slide.removeClass('active');

		});

	});

})(jQuery);
*/


(function() {

    /* Based on code from: https://github.com/jacwright/date.format */
    Date.prototype.weekNumber = function() {

        var date = this;

        var target = new Date(date.valueOf());
        var dayNr = (date.getDay() + 6) % 7;
        target.setDate(target.getDate() - dayNr + 3);
        var firstThursday = target.valueOf();
        target.setMonth(0, 1);
        if (target.getDay() !== 4) {
            target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
        }
        var retVal = 1 + Math.ceil((firstThursday - target) / 604800000);

        return (retVal < 10 ? '0' + retVal : retVal);

    };

}).call(this);


/**
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler ○ gmail • com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 2.1.3
 */
;(function(f){"use strict";"function"===typeof define&&define.amd?define(["jquery"],f):"undefined"!==typeof module&&module.exports?module.exports=f(require("jquery")):f(jQuery)})(function($){"use strict";function n(a){return!a.nodeName||-1!==$.inArray(a.nodeName.toLowerCase(),["iframe","#document","html","body"])}function h(a){return $.isFunction(a)||$.isPlainObject(a)?a:{top:a,left:a}}var p=$.scrollTo=function(a,d,b){return $(window).scrollTo(a,d,b)};p.defaults={axis:"xy",duration:0,limit:!0};$.fn.scrollTo=function(a,d,b){"object"=== typeof d&&(b=d,d=0);"function"===typeof b&&(b={onAfter:b});"max"===a&&(a=9E9);b=$.extend({},p.defaults,b);d=d||b.duration;var u=b.queue&&1<b.axis.length;u&&(d/=2);b.offset=h(b.offset);b.over=h(b.over);return this.each(function(){function k(a){var k=$.extend({},b,{queue:!0,duration:d,complete:a&&function(){a.call(q,e,b)}});r.animate(f,k)}if(null!==a){var l=n(this),q=l?this.contentWindow||window:this,r=$(q),e=a,f={},t;switch(typeof e){case "number":case "string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)){e= h(e);break}e=l?$(e):$(e,q);case "object":if(e.length===0)return;if(e.is||e.style)t=(e=$(e)).offset()}var v=$.isFunction(b.offset)&&b.offset(q,e)||b.offset;$.each(b.axis.split(""),function(a,c){var d="x"===c?"Left":"Top",m=d.toLowerCase(),g="scroll"+d,h=r[g](),n=p.max(q,c);t?(f[g]=t[m]+(l?0:h-r.offset()[m]),b.margin&&(f[g]-=parseInt(e.css("margin"+d),10)||0,f[g]-=parseInt(e.css("border"+d+"Width"),10)||0),f[g]+=v[m]||0,b.over[m]&&(f[g]+=e["x"===c?"width":"height"]()*b.over[m])):(d=e[m],f[g]=d.slice&& "%"===d.slice(-1)?parseFloat(d)/100*n:d);b.limit&&/^\d+$/.test(f[g])&&(f[g]=0>=f[g]?0:Math.min(f[g],n));!a&&1<b.axis.length&&(h===f[g]?f={}:u&&(k(b.onAfterFirst),f={}))});k(b.onAfter)}})};p.max=function(a,d){var b="x"===d?"Width":"Height",h="scroll"+b;if(!n(a))return a[h]-$(a)[b.toLowerCase()]();var b="client"+b,k=a.ownerDocument||a.document,l=k.documentElement,k=k.body;return Math.max(l[h],k[h])-Math.min(l[b],k[b])};$.Tween.propHooks.scrollLeft=$.Tween.propHooks.scrollTop={get:function(a){return $(a.elem)[a.prop]()}, set:function(a){var d=this.get(a);if(a.options.interrupt&&a._last&&a._last!==d)return $(a.elem).stop();var b=Math.round(a.now);d!==b&&($(a.elem)[a.prop](b),a._last=this.get(a))}};return p});


/* 01/09/16 */
