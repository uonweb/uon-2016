var fireVirtualPageView;

var resetToHomeStep;
var resetToUndergraduateStep;
var resetToPostgraduateStep;
var resetToInternationalStep;
var resetToAppliedStep;
var resetToPickDegree;
var resetToPickDiscipline;
var resetToPickGeneral;

var resetGalleries;

var historyStepAction;

var campaignDegreeLinks;
var campaignDisciplineLinks;

/* Post codes of locations within 50km radius of each campus */
var callaghan_radius = new Array(2259,2261,2262,2263,2264,2265,2267,2278,2280,2281,2282,2283,2284,2285,2286,2287,2289,2290,2291,2292,2293,2294,2295,2296,2297,2298,2299,2300,2302,2303,2304,2305,2306,2307,2308,2315,2316,2317,2318,2319,2320,2321,2322,2323,2324,2325,2326,2327,2334,2335,2420,2421,2425,2651);
var ourimbah_radius = new Array(2074,2075,2076,2077,2079,2080,2081,2082,2083,2084,2085,2086,2087,2096,2097,2099,2100,2101,2102,2103,2104,2105,2106,2107,2108,2120,2156,2157,2158,2159,2250,2251,2256,2257,2258,2259,2260,2261,2262,2263,2264,2265,2267,2278,2280,2281,2282,2283,2284,2290,2306,2323,2325,2756,2765,2775);
var portmacquarie_radius = new Array(2427,2429,2430,2439,2440,2441,2443,2444,2445,2446,2730);

(function($){

$(document).ready(function() {

	fireVirtualPageView = function(path,title) {

		var pagePath = path; 
		pagePath = pagePath.replace('http://www.newcastle.edu.au','');
		pagePath = pagePath.replace('https://www.newcastle.edu.au','');
		pagePath = pagePath.replace('study/','study');

		// console.log("GA: ",pagePath,title);

		dataLayer.push({
			'nonInteraction': true,
			'event':'VirtualPageview',
			'virtualPageURL': pagePath,
			'virtualPageTitle' : title
		}); 

	}

	resetToHomeStep = function() {
		$('#page-header').removeClass('minimised-header');
		$('#page-header .page-header-title').html('Study at UON <span class="thin">2017</span>');
		$('#page-header').css('background-image','url(/__data/assets/image/0009/276489/2016-study-bg.jpg),url(/__data/assets/image/0012/233022/mid-year-gs-bg.jpg),url(/__data/assets/image/0018/239004/mid-year-international-bg.jpg)');
		// $('#study-back a').addClass('hidden');
		$('#type-progress-step, #degree-progress-step, #discipline-progress-step').text('').attr('href','');
		$('#degrees-progress-step, #disciplines-progress-step, #applied-progress-step').hide(); // #apply-progress-step,
		$('#apply-progress-step, .stackable-block a.block-link[title="How to apply"]').attr('href','//www.newcastle.edu.au/study/how-to-apply');
		$('#progress-map, #study-undergraduate, #study-postgraduate, #study-international, #study-applied').slideUp();
		$('#student-type-selection').slideDown();
		$('#uon-body, #page-footer').hide();
	}
	
	resetToUndergraduateStep = function(speed) {

		// console.log("SHOW: Undergraduate");
		$('#student-type-selection').slideUp(speed);

		$('#page-header .page-header-title').html('Study at UON <span class="thin">2017</span>');
		$('#page-header').css('background-image','url(/__data/assets/image/0009/276489/2016-study-bg.jpg),url(/__data/assets/image/0012/233022/mid-year-gs-bg.jpg),url(/__data/assets/image/0018/239004/mid-year-international-bg.jpg)');

		$('#progress-map a.current').removeClass('current');
		$('#type-progress-step').text('Undergraduate study').attr('href','?study=undergraduate').addClass('current').show(); //fadeIn(speed);

		// $('#study-back a').addClass('hidden');
		// $('#study-back-type').removeClass('hidden');
		$('#page-header').removeClass('minimised-header');
		$('#degree-progress-step, #discipline-progress-step').text('').attr('href','').hide();
		$('#degrees-progress-step, #disciplines-progress-step, #general-progress-step, #applied-progress-step').hide(); // #apply-progress-step,
		$('#apply-progress-step, .stackable-block a.block-link[title="How to apply"]').attr('href','//www.newcastle.edu.au/study/how-to-apply');
		$('#study-undergraduate-grid').removeClassPrefix('filter-').show();
		$('#study-undergraduate').slideDown(speed);
		$('#progress-map').slideDown(speed);
		$('#uon-body, #page-footer').hide();

	}

	resetToPostgraduateStep = function(speed) {

		// console.log("SHOW: Postgraduate");
		$('#student-type-selection').slideUp(speed);

		$('#page-header .page-header-title').html('Postgraduate programs');
		$('#page-header').css('background-image','url(/__data/assets/image/0012/233022/mid-year-gs-bg.jpg),url(/__data/assets/image/0009/276489/2016-study-bg.jpg),url(/__data/assets/image/0018/239004/mid-year-international-bg.jpg)');

		$('#progress-map a.current').removeClass('current');
		$('#type-progress-step').text('Postgraduate study').attr('href','?study=postgraduate').addClass('current').show(); //fadeIn(speed);

		$('#study-postgraduate').slideDown(speed);
		$('#study-undergraduate-grid').hide();

	}

	resetToInternationalStep = function(speed) {

		// console.log("SHOW: International");
		$('#student-type-selection').slideUp(speed);

		$('#page-header .page-header-title').html('International students');
		$('#page-header').css('background-image','url(/__data/assets/image/0018/239004/mid-year-international-bg.jpg),url(/__data/assets/image/0009/276489/2016-study-bg.jpg),url(/__data/assets/image/0012/233022/mid-year-gs-bg.jpg)');

		$('#progress-map a.current').removeClass('current');
		$('#type-progress-step').text('International Students').attr('href','?study=international').addClass('current').show(); //fadeIn(speed);

		$('#study-international').slideDown(speed);
		$('#study-undergraduate-grid').hide();

	}

	resetToAppliedStep = function(speed) {

		// console.log("SHOW: Applied");
		$('#student-type-selection').slideUp(speed);

		$('#page-header .page-header-title').html('Study at UON <span class="thin">2017</span>');
		$('#page-header').css('background-image','url(/__data/assets/image/0009/276489/2016-study-bg.jpg),url(/__data/assets/image/0012/233022/mid-year-gs-bg.jpg),url(/__data/assets/image/0018/239004/mid-year-international-bg.jpg)');

		$('#page-header').removeClass('minimised-header');

		$('#uon-body, #page-footer').hide();
		$('#progress-map').slideUp(speed);
		$('#progress-map a.current').removeClass('current');
		$('#degree-progress-step, #discipline-progress-step, #degrees-progress-step, #disciplines-progress-step, #general-progress-step, #applied-progress-step').hide();
		$('#type-progress-step').text('Already applied').attr('href','?study=applied').addClass('current').show(); //fadeIn(speed);

		$('#study-applied').slideDown(speed);
		$('#study-undergraduate-grid').show();

	}

	resetToPickDegree = function(speed) {

		// console.log("SHOW: Degree list");
		$('#study-undergraduate').slideUp(speed);
		$('#uon-body, #page-footer').show();
		$('#study-undergraduate-grid').addClass('filter-degrees');
		
		$('#page-header').addClass('minimised-header');
		/*
		$('#study-back').show(function(){
			$('#page-header').addClass('minimised-header');
			$('#study-back a').addClass('hidden');
			$('#study-back-undergraduate').removeClass('hidden');
		});
		*/
		$('#progress-map a.current').removeClass('current');
		$('#type-progress-step').text('Undergraduate study').attr('href','?study=undergraduate').show(); //fadeIn(speed);
		$('#discipline-progress-step, #applied-progress-step').hide(); // #apply-progress-step,
		$('#apply-progress-step, .stackable-block a.block-link[title="How to apply"]').attr('href','//www.newcastle.edu.au/study/how-to-apply');
		$('#degree-progress-step').hide(0,function(){
			$('#degrees-progress-step').text('Degrees').addClass('current').show();
			$('#disciplines-progress-step,#general-progress-step').removeClass('current').hide();
			$(this).text('');
		});
		resetGalleries();
		$(window).resize() // hack to get dates to display
		container.isotope('layout');

	}

	resetToPickDiscipline = function(speed) {

		// console.log("SHOW: Discipline list");
		$('#study-undergraduate').slideUp(speed);
		$('#uon-body, #page-footer').show();
		$('#study-undergraduate-grid').addClass('filter-disciplines');
		$('#page-header').addClass('minimised-header');

		/*
		$('#study-back').show(function(){
			$('#page-header').addClass('minimised-header');
			$('#study-back a').addClass('hidden');
			$('#study-back-undergraduate').removeClass('hidden');
		});
		*/
		$('#progress-map a.current').removeClass('current');
		$('#type-progress-step').text('Undergraduate study').attr('href','?study=undergraduate').show(); //fadeIn(speed);
		$('#apply-progress-step, .stackable-block a.block-link[title="How to apply"]').attr('href','//www.newcastle.edu.au/study/how-to-apply');
		$('#discipline-progress-step').hide(0,function(){
			$('#disciplines-progress-step').text('Areas of study').addClass('current').show();
			$('#degrees-progress-step, #general-progress-step, #applied-progress-step').removeClass('current').hide();
			$(this).text('');
		});
		resetGalleries();
		$(window).resize() // hack to get dates to display
		container.isotope('layout');
	}

	resetToPickGeneral = function(speed) {
		
		// console.log("SHOW: General");
		$('#study-undergraduate').slideUp(speed);
		$('#uon-body, #page-footer').show();
		$('#study-undergraduate-grid').addClass('filter-general');

		$('#page-header').addClass('minimised-header');
		/*
		$('#study-back').show(function(){
			$('#page-header').addClass('minimised-header');
			$('#study-back a').addClass('hidden');
			$('#study-back-undergraduate').removeClass('hidden');
		});
		*/
		$('#progress-map a.current').removeClass('current');
		$('#type-progress-step').text('Undergraduate study').attr('href','?study=undergraduate').show(); //fadeIn(speed);
		$('#apply-progress-step, .stackable-block a.block-link[title="How to apply"]').attr('href','//www.newcastle.edu.au/study/how-to-apply');
		$('#general-progress-step').text('Studying at UON').addClass('current').show();
		$('#discipline-progress-step, #disciplines-progress-step, #degree-progress-step, #degrees-progress-step').hide().text('');
		resetGalleries();
		$(window).resize() // hack to get dates to display
		container.isotope('layout');

	}

	resetGalleries = function() {
		$('.gallery-main .gallery-cell, .carousel-widget .gallery-cell').css('height','');
		if($('.gallery-main').flickity()) {
			$('.gallery-main').flickity("resize");
		}
		if($('.gallery-nav').flickity()) {
			$('.gallery-nav').flickity("resize");
		}
		if($('.carousel-widget').flickity()) {
			$('.carousel-widget').flickity("resize");
		}
		$('.gallery-main .gallery-cell, .carousel-widget .gallery-cell').css('height','100%');
		$('#key-dates .gallery-main .gallery-cell').css('height','300px');
	}


	// Establish Variables
	var	State = History.getState();
	var InitialState = State;

	// Log Initial State
	// console.log('initial:', State.data, State.title, State.url);
	
	// Fire Virtual Pageview on load if starting at the beginning of the process.
	if(window.location.href.indexOf('?') === -1) {
		// historyStepAction(State);
		fireVirtualPageView(State.url,'Study Landing');
	}

	historyStepAction = function(State) {
		
		if(State.data.step == undefined) {

			fireVirtualPageView(State.url,'Study Landing');
			resetToHomeStep();

		} else if(State.data.step == 'study=undergraduate') { // Back from degrees or disciplines

			if(InitialState.data.step === 'pick=degree' || InitialState.data.step === 'pick=discipline' || InitialState.data.step === 'pick=general') {
				// Reset InitialSate so that future events fire for this step.
				InitialState.data = {};
			} else if(InitialState.data.step === 'degree' || InitialState.data.step === 'discipline') {
				// nothing
			} else {
				// fireVirtualPageView(State.url,'Study Undergraduate');
			}
			resetToUndergraduateStep();

		} else if(State.data.step == 'study=postgraduate') {

			// fireVirtualPageView(State.url,'Study Postgraduate');
			resetToPostgraduateStep();

		} else if(State.data.step == 'study=international') {

			// fireVirtualPageView(State.url,'Study International');
			resetToInternationalStep();

		} else if(State.data.step == 'study=applied') {

			// fireVirtualPageView(State.url,'Study Applied');
			resetToAppliedStep();

		} else if(State.data.step == 'pick=degree') { // Back from an individual degree

			if(InitialState.data.step === 'degree') {
				// Reset InitialSate so that future events fire for this step.
				InitialState.data = {};
			} else {
				// fireVirtualPageView(State.url,'Pick Degree');
			}
			resetToPickDegree(State.data.speed);

		} else if(State.data.step == 'pick=discipline') { // Back from an individual discipline

			if(InitialState.data.step === 'discipline') {
				// Reset InitialSate so that future events fire for this step.
				InitialState.data = {};
			} else {
				// fireVirtualPageView(State.url,'Pick Discipline');
			}
			resetToPickDiscipline(State.data.speed);

		} else if(State.data.step == 'pick=general') {

			// fireVirtualPageView(State.url,'Pick General');
			resetToPickGeneral(State.data.speed);

		} else if(State.data.step == 'degree') {

			fireVirtualPageView(State.url,State.title);

		} else if(State.data.step == 'discipline') {

			fireVirtualPageView(State.url,State.title);

		} else if(State.data.step == 'applied-login') {

			fireVirtualPageView(State.url,State.title);

		} else {

			// console.log("Not supported: ", State.data);

		}

	}	

	if(State.data.step === null && State.url.indexOf('?') === -1) {
		historyStepAction(State);
		// fireVirtualPageView(State.url,'Study Landing');
	}
	
	
	// historyStepAction(State);

	// Bind to State Change
	History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate

		// Log the State
		var State = History.getState(); // Note: We are using History.getState() instead of event.state
		// console.log('statechange:', State.data, State.title, State.url);

		historyStepAction(State);

	});
	
	

	$('#uon-body').hide();

	uonLightbox('#progress-map a.popup-link');

	/******************************/
	/**  Student Type Selection  **/
	/**   - Undergraduate        **/
	/**   - Postgraduate         **/
	/**   - International        **/
	/******************************/

	$('#student-type-selection a').on('click',function(event, speed){

		event.preventDefault();

		fireVirtualPageView('/study'+$(this).attr('href'),$(this).data('step'));

		var th = $(this);
		setTimeout(function(){
			History.pushState({step:th.attr('href').substr(1), t: th, speed: speed, refire:false}, th.data('step') + ' / Study at UON 2017 / The University of Newcastle, Australia', th.attr('href'));
		},100);

	});


	/*****************************/
	/**  Undergraduate options  **/
	/**   - Degrees             **/
	/**   - Disciplines         **/
	/**   - General Info        **/
	/*****************************/
	$('#study-undergraduate .grid-content a').on('click',function(event, speed){

		event.preventDefault();

		fireVirtualPageView('/study'+$(this).attr('href'),$(this).data('step'));

		var th = $(this);
		setTimeout(function(){
			History.pushState({step:th.attr('href').substr(1)}, th.data('step') + ' / Study at UON 2017 / The University of Newcastle, Australia', th.attr('href'));
		});

	});


	/***********************/
	/**  Already applied  **/
	/***********************/
	$('#get-started').on('click',function(event, speed){

		event.preventDefault();

		if($('#applied-surname').val() === '' || $('#applied-number').val() === '') {

			if($('#applied-surname').val() === '') {
				$('#applied-surname').addClass('error');
			} else {
				$('#applied-surname').removeClass('error');
			}

			if($('#applied-number').val() === '') {
				$('#applied-number').addClass('error');
			} else {
				$('#applied-number').removeClass('error');
			}

			$('#applied-error').slideDown();

		} else {

			$('#student-type-selection').slideUp(0);
			$('#page-header').removeClass('minimised-header');
			$('#progress-map a.current').removeClass('current');
			$('#discipline-progress-step, #degree-progress-step, #degrees-progress-step, #disciplines-progress-step, #general-progress-step').hide();
			$('#type-progress-step').text('Already applied').attr('href','?study=applied').show(); //fadeIn(speed);
			$('#applied-progress-step').text('Good choice').attr('href','?'+$('#applied-form').serialize()).addClass('current').show();
			$('#apply-progress-step').hide();

			$('#applied-welcome').html('<span class="fa fa-circle-o-notch fa-spin ajax-loading"></span><span class="loading-label">Loading your details&hellip;</span>');
			container.isotope('layout');

			if(is_mobile) {
				$(window).scrollTo(110,200);
			} else {
				$(window).scrollTo(220,200);
			}

			$('#applied-welcome').load('/study/campaign-welcome?'+$('#applied-form').serialize()+'&SQ_PAINT_LAYOUT_NAME=lightbox&SQ_DESIGN_NAME=lightbox',function(){ // +'?'
				if($('#applied-url').val() !== '') { // use original url to retain things like utm tags etc.
					History.pushState({step:'applied-login'}, 'Study at UON 2017 / The University of Newcastle, Australia', $('#applied-url').val());
				} else {
					History.pushState({step:'applied-login'}, 'Study at UON 2017 / The University of Newcastle, Australia', '?'+$('#applied-form').serialize());
				}
				container.imagesLoaded().progress( function() {
					container.isotope('layout');
				});
				uonLightbox('#applied-welcome a.popup-link');
				uonAccordion('#applied-welcome .accordion-title a');
				$('#applied-welcome a.degree-link').on('click',function(event){
					event.preventDefault();
					container.isotope({ filter: $(this).data('filter') });
					campaignDegreeLinks($(this));
				});
				$('#applied-welcome a.discipline-link').on('click',function(event){
					event.preventDefault();
					container.isotope({ filter: $(this).data('filter') });
					campaignDisciplineLinks($(this));
				});
				container.isotope('layout');
				resetGalleries();
			});

			$('#uon-body, #page-footer').show();
			$('#applied-error').hide();
			$('#study-applied').slideUp(speed);
			$('#progress-map').slideDown(speed);
			$('#study-undergraduate-grid').show().addClass($(this).data('filter').substr(1));

			$('#page-header').addClass('minimised-header');
			/*
			$('#study-back').show(0,function(){
				$('#page-header').addClass('minimised-header');
				$('#study-back-applied').removeClass('hidden');
			});
			*/

			$('.stackable-grid').isotope('layout');
			resetGalleries();

		}

	});
	$('#applied-surname').on('change',function(){
		if($('#applied-surname').val() === '') {
			$('#applied-surname').addClass('error');
		} else {
			$('#applied-surname').removeClass('error');
		}
	});
	$('#applied-number').on('change',function(){
		if($('#applied-number').val() === '') {
			$('#applied-number').addClass('error');
		} else {
			$('#applied-number').removeClass('error');
		}
	});


	/*************************************************************/
	/**  Add click events to degree links on initial page load  **/
	/*************************************************************/
	$('a.degree-link.faculty_engineering_built_environment,a.degree-link[href$="bachelor-of-business"],a.degree-link[href$="bachelor-of-science"],a.degree-link[href$="bachelor-of-nursing"],a.degree-link[href$="bachelor-of-teaching-early-childhood-and-primary-honours"]').each(function(){ // a.degree-link:not(.campaign_mid_year_entry),
		$(this).append(' <span class="fa fa-external-link-square"></span>').attr('target','_blank').removeAttr('data-filter');
	});
	$('a.degree-link:not(.faculty_engineering_built_environment)').on('click',function(event){ // .campaign_mid_year_entry
	    if($(this).find('.fa-external-link-square').length > 0) {
	        // Do nothing for externals.
	       // console.log('no: '+$(this).text());
	    } else {
    		event.preventDefault();
    // 		console.log('yes: '+$(this).text());
    		campaignDegreeLinks($(this));
	    }
	});
	

	campaignDegreeLinks = function(t) {

		var slug = t.attr('href').substr(t.attr('href').lastIndexOf('/')+1);

		$('#degree-information').html('<span class="fa fa-circle-o-notch fa-spin ajax-loading"></span><span class="loading-label">Loading '+t.text()+'&hellip;</span>');
		resetGalleries();
		container.isotope('layout');

		if(is_mobile) {
			$(window).scrollTo(110,200);
		} else {
			$(window).scrollTo(220,200);
		}

		$('#degree-information').load(t.attr('href')+'/why-study-with-us?SQ_PAINT_LAYOUT_NAME=snapshot&SQ_DESIGN_NAME=snapshot',function(){
			History.pushState({step:'degree',slug:slug}, t.text() + ' / Study at UON 2017 / The University of Newcastle, Australia', '?degree='+slug);  
			container.imagesLoaded().progress( function() {
				container.isotope('layout');
			});
			container.isotope('layout');
			uonLightbox('#degree-information a.popup-link');
			$('#degree-information a.degree-link:not(.faculty_engineering_built_environment)').on('click',function(event){ // .campaign_mid_year_entry
				event.preventDefault();
				container.isotope({ filter: $(this).data('filter') });
				campaignDegreeLinks($(this));
			});
			$('#degree-information a.degree-link.faculty_engineering_built_environment').each(function(){ // #degree-information a.degree-link:not(.campaign_mid_year_entry),
				$(this).append(' <span class="fa fa-external-link-square"></span>').attr('target','_blank').removeAttr('data-filter');
			});
			$('#degree-information a.discipline-link').on('click',function(event){
				event.preventDefault();
				container.isotope({ filter: $(this).data('filter') });
				campaignDisciplineLinks($(this));
			});
			resetGalleries();
			container.isotope('layout');
			$('#apply-progress-step').attr('href',$('#degree-information a#apply-link').attr('href'));
			$('.stackable-block a.block-link[title="How to apply"]').attr('href',$('#degree-information a#apply-link').attr('href'));
			$('#degree-progress-step').text(t.text()).attr('href','?degree='+slug).addClass('current').show();
			// $('#apply-progress-step').show();
		});

		$('#progress-map a.current').removeClass('current');
		$('#disciplines-progress-step, #discipline-progress-step').hide();
		$('#degrees-progress-step').text('Degrees').show();

		// $('#study-back-applied, #study-back-undergraduate, #study-back-disciplines').addClass('hidden');
		// $('#study-back-degrees').removeClass('hidden');

	}

	/*****************************************************************/
	/**  Add click events to discipline links on initial page load  **/
	/*****************************************************************/
	$('a.discipline-link').on('click',function(event){
		event.preventDefault();
		campaignDisciplineLinks($(this));
	});

	campaignDisciplineLinks = function(t) {

		var slug = t.attr('href').substr(t.attr('href').lastIndexOf('/')+1);

		var loading_label = t.text();
		if(t.data('label')) { loading_label = t.data('label'); }

		$('#discipline-information').html('<span class="fa fa-circle-o-notch fa-spin ajax-loading"></span><span class="loading-label">Loading '+loading_label+'&hellip;</span>');
		resetGalleries();
		container.isotope('layout');

		if(is_mobile) {
			$(window).scrollTo(110,200);
		} else {
			$(window).scrollTo(220,200);
		}

		$('#discipline-information').load(t.attr('href')+'?SQ_PAINT_LAYOUT_NAME=snapshot&SQ_DESIGN_NAME=snapshot',function(){
			History.pushState({step:'discipline',slug:slug}, t.text() + ' / Study at UON 2017 / The University of Newcastle, Australia', '?discipline='+slug);
			container.imagesLoaded().progress( function() {
				container.isotope('layout');
			});
			container.isotope('layout');
			uonLightbox('#discipline-information a.popup-link');
			$('#discipline-information a.degree-link:not(.faculty_engineering_built_environment)').on('click',function(event){ // .campaign_mid_year_entry
				event.preventDefault();
				container.isotope({ filter: $(this).data('filter') });
				campaignDegreeLinks($(this));
			});
			$('#discipline-information a.degree-link.faculty_engineering_built_environment').each(function(){ // #discipline-information a.degree-link:not(.campaign_mid_year_entry),
				$(this).append(' <span class="fa fa-external-link-square"></span>').attr('target','_blank').removeAttr('data-filter');
			});
			resetGalleries();
			container.isotope('layout');
		});

		$('#progress-map a.current').removeClass('current');
		$('#degrees-progress-step, #degree-progress-step, #general-progress-step').hide();
		$('#apply-progress-step, .stackable-block a.block-link[title="How to apply"]').attr('href','//www.newcastle.edu.au/study/how-to-apply');
		$('#disciplines-progress-step').text('Areas of Study').show(0,function(){
			$('#discipline-progress-step').text(loading_label).attr('href','?discipline='+slug).addClass('current').show(0,function(){
				$(this).parent().removeClass('hidden');
			});
		});
		// $('#apply-progress-step').hide();

		// $('#study-back-applied, #study-back-undergraduate, #study-back-degrees').addClass('hidden');
		// $('#study-back-disciplines').removeClass('hidden');

	}


	/**********************************************************************************************/
	/**  Back buttons for Postgraduate, International and Applied Study options		- p.go-back    **/
	/**  Back buttons for degrees, degree, disciplines, discipline etc. steps			- #study-back  **/
	/**********************************************************************************************/

	$('p.go-back a').on('click',function(event){
		event.preventDefault();
		History.pushState({step:null}, 'Study at UON 2017 / The University of Newcastle, Australia', '/study');
	});

	/*
	$('#study-back a').on('click',function(event){
		event.preventDefault();
		
		if($(this).attr('id') == 'study-back-type') {
			History.pushState({step:null}, 'mid-year entry 2016 / The University of Newcastle, Australia', '/study');
		} else if($(this).attr('id') == 'study-back-undergraduate') {
			History.pushState({step:'study=undergraduate', t: $(this)}, 'Undergraduate study / mid-year entry 2016 / The University of Newcastle, Australia', '?study=undergraduate');
		} else if($(this).attr('id') == 'study-back-degrees') {
			History.pushState({step:'pick=degree'}, 'Degrees / mid-year entry 2016 / The University of Newcastle, Australia', '?pick=degree');
		} else if($(this).attr('id') == 'study-back-disciplines') {
			History.pushState({step:'pick=discipline'}, 'Areas of Study / mid-year entry 2016 / The University of Newcastle, Australia', '?pick=discipline');
		} else if($(this).attr('id') == 'study-back-applied') {
			History.pushState({step:'study=applied', t: $(this)}, 'I have already applied / mid-year entry 2016 / The University of Newcastle, Australia', '?study=applied');
		}
	});
	*/

	$('#progress-map li a[data-filter]').on('click',function(){

		if($(this).attr('id') == 'initial-progress-step') {
			History.pushState({step:null}, 'Study at UON 2017 / The University of Newcastle, Australia', '/study');
		} else if($(this).attr('id') == 'type-progress-step') {
			if($(this).attr('href') == '?study=undergraduate') {
				History.pushState({step:'study=undergraduate', t: $(this)}, 'Undergraduate study / Study at UON 2017 / The University of Newcastle, Australia', '?study=undergraduate');
			} else if($(this).attr('href') == '?study=postgraduate') {
				History.pushState({step:'study=postgraduate', t: $(this)}, 'Postgraduate study / Study at UON 2017 / The University of Newcastle, Australia', '?study=postgraduate');
			} else if($(this).attr('href') == '?study=international') {
				History.pushState({step:'study=international', t: $(this)}, 'International student / Study at UON 2017 / The University of Newcastle, Australia', '?study=international');
			} else if($(this).attr('href') == '?study=applied') {
				History.pushState({step:'study=applied', t: $(this)}, 'I have already applied / Study at UON 2017 / The University of Newcastle, Australia', '?study=applied');
			}
		} else if($(this).attr('id') == 'degrees-progress-step') {
			History.pushState({step:'pick=degree'}, 'Degrees / Study at UON 2017 / The University of Newcastle, Australia', '?pick=degree');
		} else if($(this).attr('id') == 'disciplines-progress-step') {
			History.pushState({step:'pick=discipline'}, 'Areas of Study / Study at UON 2017 / The University of Newcastle, Australia', '?pick=discipline');
		} else if($(this).attr('id') == 'discipline-progress-step') {
			// back to individual discipline
		} else if($(this).attr('id') == 'degree-progress-step') {
			// back to individual degree
		}

	});


	$('#jump-to-key-dates').on('click',function(event){
		event.preventDefault();
		$.scrollTo($('#key-dates'),500,{offset:{top:-250}});
	})

	$('a.inline-decision-block-link[data-filter]').on('click',function(event){
		event.preventDefault();
		if(is_mobile) {
			$(window).scrollTo(110,200);
		} else {
			$(window).scrollTo(220,200);
		}
		if($(this).attr('href') == '?pick=degree') {
			History.pushState({step:'pick=degree'}, 'Degrees / Study at UON 2017 / The University of Newcastle, Australia', '?pick=degree');
		} else if($(this).attr('href') == '?pick=discipline') {
			History.pushState({step:'pick=discipline'}, 'Areas of Study / Study at UON 2017 / The University of Newcastle, Australia', '?pick=discipline');
		}
	});



	/*******************************************/
	/**  Page header filters - eg. campaigns  **/
	/*******************************************/
	if($('.filter-default').length > 0) {
		container.isotope({ filter: '.filter-default' });
		$('a[data-filter], button[data-filter]').on('click',function(event){
			event.preventDefault();
			container.isotope({ filter: $(this).data('filter') });
			// setCookie('uon-mid-year-filter',$(this).data('filter'),1000);
			// console.log("set: "+getCookie('uon-mid-year-filter'));
		});
	}



	/*******************************************/
	/**  Location filters for degree listing  **/
	/*******************************************/

	$('.inline-filter button').on('click',function(event){

		event.preventDefault();

		var p = $(this).parent().data('filter-target');
		var t = $(this).data('inline-filter');

		$(this).parent().find('.selected').removeClass('selected');
		$(this).addClass('selected');

// 		if(t === 'location_callaghan' || t === 'location_central_coast' || t === 'location_port_macquarie') {
// 			t = t + '.campaign_mid_year_entry';
// 		}

		if(t === 'all') {
			$(p+' li').show().addClass('on');
		} else {
			$(p+' li').hide().removeClass('on');
			$(p+' a.'+t).parent().show().addClass('on');
		}

		$(p+' ol').each(function(){

			var on = $(this).find('li.on');

			if(on.length > 0) {
				$(this).show();
			} else {
				$(this).hide();
			}

		});

		container.isotope('layout');

	});

	$('.inline-filter button[data-inline-filter="all"]').click();



	if($('#key-dates')) {

		$('#key-dates .gallery-main').flickity({ "wrapAround": false, "pageDots": false, "imagesLoaded": true, "contain": false }); // "asNavFor": ".gallery-nav", 
		$('#key-dates .gallery-nav').flickity({ "asNavFor": "#key-dates .gallery-main", "wrapAround": false, "contain": false, "pageDots": false, "prevNextButtons": false });
		$('#key-dates .gallery-main .gallery-cell').css('height','300px');

		var key_today_date = new Date();
		var key_month = key_today_date.getMonth()+1;
		if(key_month < 10) { key_month = "0"+key_month; }
		var key_day = key_today_date.getDate();
		if(key_day < 10) { key_day = "0"+key_day; }
		var key_today = key_today_date.getFullYear()+""+key_month+""+key_day;

		$('#key-dates .gallery-nav .gallery-cell').each(function(){
		  if(key_today > $(this).data('date')) {
		    return true;
		  } else {
		    $('#key-dates .gallery-nav, #key-dates .gallery-main').flickity( 'select', $(this).index() );
		    return false;
		  }
		});
		
	}



	if($('#up-next-dates')) {

		var up_next_key_today_date = new Date();
		var up_next_key_month = up_next_key_today_date.getMonth()+1;
		if(up_next_key_month < 10) { up_next_key_month = "0"+up_next_key_month; }
		var up_next_key_day = up_next_key_today_date.getDate();
		if(up_next_key_day < 10) { up_next_key_day = "0"+up_next_key_day; }
		var up_next_key_today = up_next_key_today_date.getFullYear()+""+up_next_key_month+""+up_next_key_day;
		var up_next_counter = 0;

		$('#up-next-dates .up-next-date').each(function(){
			if(up_next_key_today > $(this).data('date')) {
				$(this).remove();
			} else {
				if(up_next_counter > 1) { // only show the next two dates
					$(this).hide();
				}
				up_next_counter++;
			}
		});

	}


	if(State.url.indexOf('?') !== -1) {

		/******************************/
		/**  Re-filter on page load  **/
		/******************************/

		var queue = []

		/**  Surname and ID supplied - goto applied step  **/

		var preselect_surname = getUrlVars()["surname"];
		var preselect_id = getUrlVars()["id"];
		var preselect_url = window.location.href.slice(window.location.href.indexOf('?'));

		if(preselect_surname != '' && preselect_surname != undefined && preselect_id != '' && preselect_id != undefined) {
			// $('#applied-surname').val(preselect_surname);
			// $('#applied-number').val(preselect_id);
			queue = [
				// $('a.button[href="?study=applied"]').triggerHandler('click',[0]),
				//History.pushState({step:'study=applied', t: $(this)}, 'I have already applied / mid-year entry 2016 / The University of Newcastle, Australia', '?study=applied'),
				$('#applied-surname').val(preselect_surname),
				$('#applied-number').val(preselect_id),
				$('#applied-url').val(preselect_url),
				$('#get-started').click(), //triggerHandler('click',[0]),
				$(window).scrollTo(0,0)
			];
		}

		/**  Study option selected - goto study step ug/pg/int/app  **/

		var preselect_study = getUrlVars()['study'];
		if(preselect_study === 'undergraduate') {
			queue = [
				fireVirtualPageView('/study?study=undergraduate','Undergraduate study'),
				History.pushState({step:'study=undergraduate', t: $(this)}, 'Undergraduate study / Study at UON 2017 / The University of Newcastle, Australia', '?study=undergraduate'),
				// $('a.decision-block-link[href="?study=undergraduate"]').triggerHandler('click',[0]),
				$(window).scrollTo(0,0)
			];
		} else if(preselect_study === 'postgraduate') {
			queue = [
				fireVirtualPageView('/study?study=postgraduate','Postgraduate study'),
				History.pushState({step:'study=postgraduate', t: $(this)}, 'Postgraduate study / Study at UON 2017 / The University of Newcastle, Australia', '?study=postgraduate'),
				// $('a.decision-block-link[href="?study=postgraduate"]').triggerHandler('click',[0]),
				$(window).scrollTo(0,0)
			];
		} else if(preselect_study === 'international') {
			queue = [
				fireVirtualPageView('/study?study=international','International student'),
				History.pushState({step:'study=international', t: $(this)}, 'International student / Study at UON 2017 / The University of Newcastle, Australia', '?study=international'),
				// $('a.decision-block-link[href="?study=international"]').triggerHandler('click',[0]),
				$(window).scrollTo(0,0)
			];
		} else if(preselect_study === 'applied') {
			queue = [
				fireVirtualPageView('?study=applied','I have already applied'),
				History.pushState({step:'study=applied', t: $(this)}, 'I have already applied / Study at UON 2017 / The University of Newcastle, Australia', '?study=applied'),
				// $('a.decision-block-link[href="?study=applied"]').triggerHandler('click',[0]),
				$(window).scrollTo(0,0)
			];
		}

		/**  Undergrad option selected - goto UG step degree/discipline/general  **/

		var preselect_pick = getUrlVars()['pick'];
		var preselect_filter = getUrlVars()['filter'];
		if(preselect_pick === 'degree') {

        	if(preselect_filter === 'type_combined') { // !== '' && preselect_filter !== undefined

    			queue = [
    				resetToUndergraduateStep(0),
    				fireVirtualPageView('/study?pick=degree&filter='+preselect_filter,'Degrees'),
    				History.pushState({step:'pick=degree',speed:0}, 'Degrees / Study at UON 2017 / The University of Newcastle, Australia', '?pick=degree&filter='+preselect_filter),
    				// $('a.decision-block-link[href="?study=undergraduate"]').triggerHandler('click',[0]),
    				// $('a.decision-block-link[href="?pick=degree"]').triggerHandler('click',[0]),
    				container.isotope({ filter: '.filter-degrees' }),
    				$('.inline-filter button[data-inline-filter="'+preselect_filter+'"]').click(),
    				$(window).scrollTo(0,0)
    			];

	        } else {

    			queue = [
    				resetToUndergraduateStep(0),
    				fireVirtualPageView('/study?pick=degree','Degrees'),
    				History.pushState({step:'pick=degree',speed:0}, 'Degrees / Study at UON 2017 / The University of Newcastle, Australia', '?pick=degree'),
    				// $('a.decision-block-link[href="?study=undergraduate"]').triggerHandler('click',[0]),
    				// $('a.decision-block-link[href="?pick=degree"]').triggerHandler('click',[0]),
    				container.isotope({ filter: '.filter-degrees' }),
    				$(window).scrollTo(0,0)
    			];

	        }

		} else if(preselect_pick === 'discipline') {
			queue = [
				resetToUndergraduateStep(0),
				fireVirtualPageView('/study?pick=discipline','Areas of study'),
				History.pushState({step:'pick=discipline',speed:0}, 'Areas of study / Study at UON 2017 / The University of Newcastle, Australia', '?pick=discipline'),
				// $('a.decision-block-link[href="?study=undergraduate"]').triggerHandler('click',[0]),
				// $('a.decision-block-link[href="?pick=discipline"]').triggerHandler('click',[0]),
				container.isotope({ filter: '.filter-disciplines' }),
				$(window).scrollTo(0,0)
			];
		} else if(preselect_pick === 'general') {
			queue = [
				resetToUndergraduateStep(0),
				fireVirtualPageView('/study?pick=general','Studying at UON'),
				History.pushState({step:'pick=general',speed:0}, 'Studying at UON / Study at UON 2017 / The University of Newcastle, Australia', '?pick=general'),
				// $('a.decision-block-link[href="?study=undergraduate"]').triggerHandler('click',[0]),
				// $('a.decision-block-link[href="?pick=general"]').triggerHandler('click',[0]),
				container.isotope({ filter: '.filter-general' }),
				$(window).scrollTo(0,0)
			];
		}

		/**  Degree selected - goto individual degree  **/

		var preselect_degree = getUrlVars()["degree"];
		if(preselect_degree != '' && preselect_degree != undefined) {
			queue = [
				resetToUndergraduateStep(0),
				resetToPickDegree(0),
				// $('a.decision-block-link[href="?study=undergraduate"]').triggerHandler('click',[0]),
				// $('a.decision-block-link[href="?pick=degree"]').triggerHandler('click',[0]),
				$('#campaign-degree-listing a.degree-link[href$="degrees/'+preselect_degree+'"]').triggerHandler('click'),
				container.isotope('layout'),
				$(window).scrollTo(0,0)
			];
		}


		/* For degree testing */
		var preselect_test_degree = getUrlVars()["test_degree"];
		if(preselect_test_degree != '' && preselect_test_degree != undefined) {
			
			$('a.degree-link[href$="degrees/'+preselect_test_degree+'"]').on('click',function(event){
				event.preventDefault();
				campaignDegreeLinks($(this));
			});
			
			queue = [
				resetToUndergraduateStep(0),
				resetToPickDegree(0),
				container.isotope({ filter: '.filter-degree' }),
				$('#campaign-degree-listing a.degree-link[href$="degrees/'+preselect_test_degree+'"]').triggerHandler('click'),
				container.isotope('layout'),
				$(window).scrollTo(0,0)
			];
		}

		/**  Discipline selected - goto individual discipline  **/

		var preselect_discipline = getUrlVars()["discipline"];
		if(preselect_discipline != '' && preselect_discipline != undefined) {
			queue = [
				resetToUndergraduateStep(0),
				resetToPickDiscipline(0),
				// $('a.decision-block-link[href="?study=undergraduate"]').triggerHandler('click',[0]),
				// $('a.decision-block-link[href="?pick=discipline"]').triggerHandler('click',[0]),
				$('#campaign-discipline-listing a.discipline-link[href$="area-of-study/'+preselect_discipline+'"]').triggerHandler('click'),
				container.isotope('layout'),
				$(window).scrollTo(0,0)
			];
		}

		/**  Run queued actions  **/

		var res = queue.reduce(function(prev,cur){ // chain to res later to hook on done
			return prev.then(cur);
		}, $.Deferred().resolve());


	} //if ? -1


});

})(jQuery);
