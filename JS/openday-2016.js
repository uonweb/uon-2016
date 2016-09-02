var fireVirtualPageView;

var resetToHomeStep;
var resetToNewcastleStep;
var resetToPortMacquarieStep;

var resetGalleries;

var historyStepAction;


/* Post codes of locations within 50km radius of each campus */
var callaghan_radius = new Array(2259,2261,2262,2263,2264,2265,2267,2278,2280,2281,2282,2283,2284,2285,2286,2287,2289,2290,2291,2292,2293,2294,2295,2296,2297,2298,2299,2300,2302,2303,2304,2305,2306,2307,2308,2315,2316,2317,2318,2319,2320,2321,2322,2323,2324,2325,2326,2327,2334,2335,2420,2421,2425,2651);
var ourimbah_radius = new Array(2074,2075,2076,2077,2079,2080,2081,2082,2083,2084,2085,2086,2087,2096,2097,2099,2100,2101,2102,2103,2104,2105,2106,2107,2108,2120,2156,2157,2158,2159,2250,2251,2256,2257,2258,2259,2260,2261,2262,2263,2264,2265,2267,2278,2280,2281,2282,2283,2284,2290,2306,2323,2325,2756,2765,2775);
var portmacquarie_radius = new Array(2427,2429,2430,2439,2440,2441,2443,2444,2445,2446,2730);


(function($){

$(document).ready(function() {

	// function to get URL parameters

	var getUrlParameter = function getUrlParameter(sParam) {
	    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
	    }
	};

	// utm_source=Port+Macquarie+News&utm_medium=Print&utm_campaign=Open+Day
	var utm_source = getUrlParameter('utm_source');
	var utm_medium = getUrlParameter('utm_medium');
	var utm_campaign = getUrlParameter('utm_campaign');
	var utm_string = '';
	if(utm_source !== '' && utm_source !== undefined && utm_medium !== '' && utm_medium !== undefined && utm_campaign !== '' && utm_campaign !== undefined) {
	    utm_string = '&utm_source='+utm_source+'&utm_medium='+utm_medium+'&utm_campaign='+utm_campaign;
	}

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
		// $('#page-header .page-header-title').html('open day <span class="thin">2016</span>');
		$('#page-header .page-header-title.newcastle').hide();
		$('#page-header .page-header-title.portmac').hide();
		
		$('#page-header #uon-badge-sml').hide();
		$('#page-header #uon-badge').show();

		$('#page-header .page-header-title.landing').show();

		$('#page-header').css('background-image','none');
		$('#page-header .header-tint').css('background','linear-gradient(60deg,rgba(255,165,0,0),rgba(255,165,0,0) 0%);');

		$('#page-header').css('background-image','url(/__data/assets/image/0007/267991/header-bg-landing.jpg)');

		// $('#study-back a').addClass('hidden');
		// $('#type-progress-step, #degree-progress-step, #discipline-progress-step').text('').attr('href','');
		// $('#degrees-progress-step, #disciplines-progress-step, #applied-progress-step').hide(); // #apply-progress-step,
		// $('#apply-progress-step, .stackable-block a.block-link[title="How to apply"]').attr('href','//www.newcastle.edu.au/study/how-to-apply');
		$('#progress-map, #study-undergraduate, #study-postgraduate, #study-international, #study-newcastle').slideUp();
		$('#location-type-selection').slideDown();
		$('#select-event-txt').slideDown();
		
		$('#uon-body, #page-footer').hide();
	}

	resetToNewcastleStep = function(speed) {

		// Add Newcastle landing tracking pixel
		$('#page-header').prepend("<img src='http://bcp.crwdcntrl.net/5/c=6679/b=32144988' width='1' height='1'/>");

		// console.log("SHOW: Applied");
		$('#location-type-selection').hide(speed);
		$('#select-event-txt').hide(speed);

		$('#page-header #uon-badge').hide(speed);
		$('#page-header #uon-badge-sml').show(speed);
		$('#uon-badge-sml img').css({'margin-top':'30px'});

		$('#study-uon').html('Newcastle Open Day <span id="year-thin">Saturday 20 August</span>');

		$('.button-rego').hide(speed);

		// $('#page-header .page-header-title').html('Newcastle Open Day<br><div class="thin">Saturday 20 August<br>10am - 4pm</div>');

		$('#page-header .page-header-title.portmac').hide(speed);
		$('#page-header .page-header-title.landing').hide(speed);
		$('#page-header .page-header-title.newcastle').show(speed);

		$('#page-header').css('background-image','url(/__data/assets/image/0007/268603/header-bg-newcastle.jpg)');
		// $('#page-header .header-tint').css('background','linear-gradient(60deg,rgba(0,0,0,0.75),rgba(0,0,0,0) 60%)');

		$('#page-header').removeClass('minimised-header');
		$('#page-header').addClass('location-header');

		$('#uon-body, #page-footer').hide();
		// $('#progress-map').slideUp(speed);
		// $('#progress-map a.current').removeClass('current');
		// $('#degree-progress-step, #discipline-progress-step, #degrees-progress-step, #disciplines-progress-step, #general-progress-step, #applied-progress-step').hide();
		// $('#type-progress-step').text('Already applied').attr('href','?location=Newcastle').addClass('current').show(); //fadeIn(speed);

		$('#study-newcastle').slideDown(speed);
		$('#info-grid').show();
		$('#study-undergraduate-grid').show();

		if($('#form_email_260505').length > 0) {
        	$('#form_email_260505').attr('action','http://www.newcastle.edu.au/future-students/2016-open-day?location=Newcastle');
    	}
	}

	resetToPortMacquarieStep = function(speed) {

		$('#location-type-selection').hide(speed);
		$('#select-event-txt').hide(speed);

		// $('#page-header .page-header-title').html('Port Macquarie<br>Info Session<br><div class="thin">Thursday 4 August<br>4pm - 7pm</div>');
		
		$('#page-header .page-header-title.landing').hide(speed);
		$('#page-header .page-header-title.newcastle').hide(speed);
		$('#page-header .page-header-title.portmac').show(speed);

		$('#page-header #uon-badge').hide(speed);
		$('#page-header #uon-badge-sml').show(speed);

		$('#study-uon').html('Port Macquarie Info Session <span id="year-thin">Thursday 4 August</span>');

		$('#page-header').css('background-image','url(/__data/assets/image/0004/263056/header-bg-portmac.jpg)');
		// $('#page-header .header-tint').css('background','linear-gradient(60deg,rgba(0,0,0,0.75),rgba(0,0,0,0) 60%)');

		$('#page-header').removeClass('minimised-header');

		container.isotope('layout');

		/*
		if(is_mobile) {
			$(window).scrollTo(110,200);
		} else {
			$(window).scrollTo(220,200);
		}
		*/

		$('#uon-body, #page-footer').show();
		$('#study-newcastle').slideUp(speed);

		$('#info-grid').hide();

		$('#study-undergraduate-grid').show();

		// $('#page-header').addClass('minimised-header');
		$('#page-header').addClass('location-header');

		// Check if rego-thanks id exists. If so, scroll to thankyou message
		if ($('#rego-thanks').length) {
			/* rego-thanks exists */
			setTimeout(function(){
				// Scroll to Registration thank you message
			    $(window).scrollTo($('#rego-thanks').offset().top-190,500);
			},200)
		 	
		}
		else {
		 	/* rego-thanks doesn't exist */
		 	// Check Port Macquarie on Rego form
			$("#q260505_q14_2").prop("checked", true)	
		}

		if($('#form_email_260505').length > 0) {
        	$('#form_email_260505').attr('action','http://www.newcastle.edu.au/future-students/2016-open-day?location=Port-Macquarie');
    	}

		resetGalleries();

		$('.stackable-grid').isotope('layout');
		
	}

	returnToNewcastleStep = function(speed) {

		// Add Newcastle landing tracking pixel
		$('#page-header').prepend("<img src='http://bcp.crwdcntrl.net/5/c=6679/b=32144988' width='1' height='1'/>");

		cookieFirstName = getCookie('first-name');
		cookieStudyType = getCookie('study-type');
		cookieStudyArea = getCookie('study-area');

		console.log('Cookie - First name = ' + cookieFirstName);
		console.log('Cookie - Study type = ' + cookieStudyType);
		console.log('Cookie - Study area = ' + cookieStudyArea);

		// console.log("SHOW: Applied");
		$('#location-type-selection').hide(speed);
		$('#select-event-txt').hide(speed);

		$('.button-rego').hide(speed);

		$('#page-header #uon-badge').hide(speed);
		$('#page-header #uon-badge-sml').show(speed);
		$('#uon-badge-sml img').css({'margin-top':'30px'});

		$('#study-uon').html('Newcastle Open Day <span id="year-thin">Saturday 20 August</span>');

		// $('#studentname span#firstname').html(cookieFirstName);


		var namelength = cookieFirstName.length;
		var testname = /[a-z]{1,15}/.test(cookieFirstName);
		console.log('First name validation: ' + testname);
		if ((namelength<16)&&(testname="true")) {
			$('#studentname span#firstname').html(cookieFirstName);
		}

		$('#studentname span#firstname').show(speed);

		$('#page-header .page-header-title.portmac').hide(speed);
		$('#page-header .page-header-title.landing').hide(speed);
		$('#page-header .page-header-title.newcastle').show(speed);

		$('#page-header').css('background-image','url(/__data/assets/image/0007/268603/header-bg-newcastle.jpg)');

		$('#study-undergraduate-grid').show();

		$('#page-header').removeClass('minimised-header');
		$('#page-header').addClass('location-header');

		container.isotope({filter:'.filter-newcastle'});
		// console.log($('.filter-newcastle'));


		// $('#applied-welcome').html('<span class="fa fa-circle-o-notch fa-spin ajax-loading"></span><span class="loading-label">Loading your details&hellip;</span>');
		container.isotope('layout');

		$('#uon-body, #page-footer').show();
		$('#newcastle-error').hide();
		$('#study-newcastle').slideUp(speed);
		$('#info-grid').show();
		$('#progress-map').slideDown(speed);
		$('#study-undergraduate-grid').show().addClass('filter-newcastle');

		if (cookieStudyArea.length>0) {

			$("#study-section").show();
						
			$('#discipline-information').html('<span class="fa fa-circle-o-notch fa-spin ajax-loading"></span><span class="loading-label">Loading study area&hellip;</span>');
container.isotope('layout');

			$('#discipline-information').load('/area-of-study/'+cookieStudyArea+'?SQ_PAINT_LAYOUT_NAME=shortsnapshot&SQ_DESIGN_NAME=shortsnapshot',function(){
			
			$('#discipline-information a.degree-link:not(.faculty_engineering_built_environment)').each(function(){
			    var h = $(this).attr('href').replace('degrees/','study?degree=');
			    $(this).attr('href',h).attr('target','_blank');
			});
	    	$('#discipline-information a.degree-link.faculty_engineering_built_environment').each(function(){
		    	$(this).attr('target','_blank');
		    });
			container.isotope('layout');
		
			});
		} else {
			$("#study-section").hide();
		}

		// Set link for big yellow Call To Action button based on study type selected
		if (cookieStudyType.length>0) {
				if (cookieStudyType == "Undergraduate") {
					console.log('Selected Undergraduate');
					$("a#learn-more-study").attr("href", "http://www.newcastle.edu.au/study/?study=undergraduate");
				} else if (cookieStudyType == "Postgraduate") {
					console.log('Selected Postgraduate');
					$("a#learn-more-study").attr("href", "http://www.gradschool.edu.au");

					// Show relevant study area information
					$("#study-section").show();
					$('#discipline-information').html('<span class="fa fa-circle-o-notch fa-spin ajax-loading"></span><span class="loading-label">Loading study area&hellip;</span>');
					container.isotope('layout');
					$('#discipline-information').load('/future-students/2016-open-day/study-area-postgraduate?SQ_PAINT_LAYOUT_NAME=lightbox&SQ_DESIGN_NAME=lightbox',function(){
						container.isotope('layout');
					});

				} else if (cookieStudyType == "Research Higher Degree") {
					console.log('Selected Research Higher Degree');
					$("a#learn-more-study").attr("href", "http://www.newcastle.edu.au/research-and-innovation/graduate-research/phd-and-research-degrees/why-a-research-degree");
					// Show relevant study area information
					$("#study-section").show();
					$('#discipline-information').html('<span class="fa fa-circle-o-notch fa-spin ajax-loading"></span><span class="loading-label">Loading study area&hellip;</span>');
					container.isotope('layout');
					$('#discipline-information').load('/future-students/2016-open-day/study-area-research?SQ_PAINT_LAYOUT_NAME=lightbox&SQ_DESIGN_NAME=lightbox',function(){
						container.isotope('layout');
					});
				} else if (cookieStudyType == "Enabling") {
					console.log('Selected Enabling');
					$("a#learn-more-study").attr("href", "http://www.newcastle.edu.au/study/?pick=general");

					// Show relevant study area information
					$("#study-section").show();
					$('#discipline-information').html('<span class="fa fa-circle-o-notch fa-spin ajax-loading"></span><span class="loading-label">Loading study area&hellip;</span>');
					container.isotope('layout');
					$('#discipline-information').load('/future-students/2016-open-day/study-area-elfs?SQ_PAINT_LAYOUT_NAME=lightbox&SQ_DESIGN_NAME=lightbox',function(){
						container.isotope('layout');
					});

				} else {
					// console.log('Default');
					$("a#learn-more-study").attr("href", "http://www.newcastle.edu.au/study");
				}
			}

		// Check if rego-thanks id exists. If so, scroll to thankyou message
		if ($('#rego-thanks').length) {
			setTimeout(function(){
				// Scroll to Registration thank you message
			    $(window).scrollTo($('#rego-thanks').offset().top-190,500);
			},200)	
		}
		else {
		 	/* rego-thanks doesn't exist */
		 	// Check Newcastle on Rego form
			$("#q260505_q14_0").prop("checked", true)
			// Insert First name into name field	
			$("#q260505_q1").val(cookieFirstName);
			// Set study area in Area of Study drop down
			$('#q260505_q17 option').filter(function() { 
			    return ($(this).val() == cookieStudyArea); //To select cookieStudyArea
			}).prop('selected', true);

			$('.button-rego').show();
		}

		$(".button-rego").click(function(event) {
			event.preventDefault();
			$(window).scrollTo($('#regoheader').offset().top-150,500);
		});

		if($('#form_email_260505').length > 0) {
        	$('#form_email_260505').attr('action','http://www.newcastle.edu.au/future-students/2016-open-day?location=Newcastle');
    	}

		resetGalleries();

		$('.stackable-grid').isotope('layout');
		// location.reload();
		
	}

	$( "#cookieclear" ).click(function(event) {
		event.preventDefault();
		setCookie('first-name','',90);
		setCookie('study-type','',90);
		setCookie('study-area','',90);
		console.log('Cookie cleared!');
		window.location.href = "http://www.newcastle.edu.au/openday";
	});

    $(".mini-button-rego").click(function(event) {
		event.preventDefault();
		$(window).scrollTo($('#regoheader').offset().top-150,500);
	});

	// Filter discipline area for open day planner

	$("#studyfilter").change(function(){
        $(this).find("option:selected").each(function(){
            if($(this).attr("value")=="architecture-and-construction"){
                $("#planner-newcastle-open-day-2016 table tr").not(".discipline_architecture_construction").hide();
                $(".discipline_architecture_construction").show();
                $("#planner-newcastle-open-day-2016 table tr td").css("background-color","#fff");
                $(".discipline_architecture_construction td").css("background-color","#F0F8FF");
            }
            else if($(this).attr("value")=="art-and-design"){
                $("#planner-newcastle-open-day-2016 table tr").not(".discipline_creative_industries").hide();
                $(".discipline_creative_industries").show();
                $("#planner-newcastle-open-day-2016 table tr td").css("background-color","#fff");
                $(".discipline_creative_industries td").css("background-color","#F0F8FF");
            }
            else if($(this).attr("value")=="business-communication-and-marketing"){
            	$("#planner-newcastle-open-day-2016 table tr").not(".discipline_business_communication_marketing").hide();
                $(".discipline_business_communication_marketing").show();
                $("#planner-newcastle-open-day-2016 table tr td").css("background-color","#fff");
                $(".discipline_business_communication_marketing td").css("background-color","#F0F8FF");
            }
            else if($(this).attr("value")=="commerce-and-accounting"){
            	$("#planner-newcastle-open-day-2016 table tr").not(".discipline_commerce_accounting").hide();
                $(".discipline_commerce_accounting").show();
                $("#planner-newcastle-open-day-2016 table tr td").css("background-color","#fff");
                $(".discipline_commerce-and-accounting td").css("background-color","#F0F8FF");
            }
            else if($(this).attr("value")=="community-services"){
            	$("#planner-newcastle-open-day-2016 table tr").not(".discipline_community_services").hide();
                $(".discipline_community_services").show();
                $("#planner-newcastle-open-day-2016 table tr td").css("background-color","#fff");
                $(".discipline_community_services td").css("background-color","#F0F8FF");
            }
            else if($(this).attr("value")=="education"){
            	$("#planner-newcastle-open-day-2016 table tr").not(".discipline_education").hide();
                $(".discipline_education").show();
                $("#planner-newcastle-open-day-2016 table tr td").css("background-color","#fff");
                $(".discipline_education td").css("background-color","#F0F8FF");
            }
            else if($(this).attr("value")=="engineering"){
            	$("#planner-newcastle-open-day-2016 table tr").not(".discipline_engineering").hide();
                $(".discipline_engineering").show();
                $("#planner-newcastle-open-day-2016 table tr td").css("background-color","#fff");
                $(".discipline_engineering td").css("background-color","#F0F8FF");
            }
            else if($(this).attr("value")=="health-and-medical-services"){
            	$("#planner-newcastle-open-day-2016 table tr").not(".discipline_health_medical_services").hide();
                $(".discipline_health_medicine").show();
                $("#planner-newcastle-open-day-2016 table tr td").css("background-color","#fff");
                $(".discipline_health_medicine td").css("background-color","#F0F8FF");
            }
            else if($(this).attr("value")=="humanities-and-social-sciences"){
            	$("#planner-newcastle-open-day-2016 table tr").not(".discipline_humanities_social_sciences").hide();
                $(".discipline_humanities_social_sciences").show();
                $("#planner-newcastle-open-day-2016 table tr td").css("background-color","#fff");
                $(".discipline_humanities_social_sciences td").css("background-color","#F0F8FF");
            }
            else if($(this).attr("value")=="law"){
            	$("#planner-newcastle-open-day-2016 table tr").not(".discipline_law").hide();
                $(".discipline_law").show();
                $("#planner-newcastle-open-day-2016 table tr td").css("background-color","#fff");
                $(".discipline_law td").css("background-color","#F0F8FF");
            }
            else if($(this).attr("value")=="maths-technology-and-computing"){
            	$("#planner-newcastle-open-day-2016 table tr").not(".discipline_maths_technology_computing").hide();
                $(".discipline_maths_technology_computing").show();
                $("#planner-newcastle-open-day-2016 table tr td").css("background-color","#fff");
                $(".discipline_maths_technology_computing td").css("background-color","#F0F8FF");
            }
            else if($(this).attr("value")=="music"){
            	$("#planner-newcastle-open-day-2016 table tr").not(".discipline_music").hide();
                $(".discipline_music").show();
                $("#planner-newcastle-open-day-2016 table tr td").css("background-color","#fff");
                $(".discipline_music td").css("background-color","#F0F8FF");
            }
            else if($(this).attr("value")=="science-and-the-environment"){
            	$("#planner-newcastle-open-day-2016 table tr").not(".discipline_science_environment").hide();
                $(".discipline_science_environment").show();
                $("#planner-newcastle-open-day-2016 table tr td").css("background-color","#fff");
                $(".discipline_science_environment td").css("background-color","#F0F8FF");
            }
            else{
                $("#planner-newcastle-open-day-2016 table tr").show();
                $("#planner-newcastle-open-day-2016 table tr td").css("background-color","#fff");
            }
            $("#planner-newcastle-open-day-2016 table tr:first-child").show();
            $("#planner-newcastle-open-day-2016 table tr.all").show();
            $('.stackable-grid').isotope('layout');
        });
    }).change();

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
	console.log('initial:', State.data, State.title, State.url);
	
	// Fire Virtual Pageview on load if starting at the beginning of the process.
	if(window.location.href.indexOf('?') === -1) {
		// historyStepAction(State);
		fireVirtualPageView(State.url,'Open Day Landing');
	}

	console.log('State.data.step: ', State.data.step);

	historyStepAction = function(State) {
		
		if(State.data.step == undefined) {

			// Check cookie contents, if returning Newcastle visitor, take them back 
			cookieFirstName = getCookie('first-name');
			cookieStudyType = getCookie('study-type');

			if ((cookieFirstName != null && cookieFirstName !='') && (cookieStudyType != null && cookieStudyType !='')) {
				returnToNewcastleStep();
				console.log('Cookie values detected - return to Newcastle');
			} else {
				fireVirtualPageView(State.url,'Open Day Landing');
				resetToHomeStep();
				console.log('Reset to Landing');
			}


		} else if(State.data.step == 'location=Newcastle') {

			// window.location.href = "http://www.newcastle.edu.au/future-students/2016-open-day-newcastle";
			if ($('#rego-thanks').length) {
				returnToNewcastleStep();
				console.log('Return to Newcastle');
			} else {
				resetToNewcastleStep();
				console.log('Reset to Newcastle');
			}

		} else if(State.data.step == 'location=Central-Coast') {

			window.location.href = "http://www.newcastle.edu.au/future-students/2016-open-day-central-coast";
			console.log('Reset to Central Coast');

		} else if(State.data.step == 'location=Port-Macquarie') {

			resetToPortMacquarieStep();
			console.log('Reset to Port Macquarie');

		} else if(State.data.step == 'applied-login') {

			fireVirtualPageView(State.url,State.title);

		} else {

			// console.log("Not supported: ", State.data);

		}

	}	


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


	$('#uon-body').hide();

	uonLightbox('#progress-map a.popup-link');


	// Check cookie contents, if returning Newcastle visitor, take them back 
	cookieFirstName = getCookie('first-name');
	cookieStudyType = getCookie('study-type');

	var location = getUrlParameter('location');
	console.log('Location variable is: ' + location);

	if (location ==='Port-Macquarie') {
		resetToPortMacquarieStep();
		console.log('URL parameter recognised - reset to Port Macquarie');
	} else if (location ==='Newcastle') {
		
		if ($('#rego-thanks').length) {
			returnToNewcastleStep();
			console.log('Return to Newcastle');
		} else {
			resetToNewcastleStep();
			console.log('Reset to Newcastle');
		}
		
		// window.location.href = "http://www.newcastle.edu.au/future-students/2016-open-day-newcastle";
		console.log('URL parameter recognised - reset to Newcastle');
	} else {

    	if((State.data.step === undefined || State.data.step === null) && (State.url.indexOf('?') === -1 || utm_string !== '')) {
    		historyStepAction(State);
    		// fireVirtualPageView(State.url,'Study Landing');
    		console.log('Fired historyStepAction(State)');
    	} else if ((cookieFirstName != null && cookieFirstName !='') && (cookieStudyType != null && cookieStudyType !='')) {
    			returnToNewcastleStep();
    			console.log('Cookie values detected - return to Newcastle');
    	}
	
	}
	
	// historyStepAction(State);

	// Bind to State Change
	History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate

		// Log the State
		var State = History.getState(); // Note: We are using History.getState() instead of event.state
		// console.log('statechange:', State.data, State.title, State.url);

		historyStepAction(State);

	});
	
	


	/******************************/
	/**  Student Type Selection  **/
	/**   - Undergraduate        **/
	/**   - Postgraduate         **/
	/**   - International        **/
	/******************************/

	$('#location-type-selection a[href*="?location"]').on('click',function(event, speed){

		event.preventDefault();

		fireVirtualPageView('/study'+$(this).attr('href'),$(this).data('step'));

		var th = $(this);
		setTimeout(function(){
			History.pushState({step:th.attr('href').substr(1), t: th, speed: speed, refire:false}, th.data('step') + ' / open day 2016 / The University of Newcastle, Australia', th.attr('href'));
		},100);

	});

	/**************************/
	/**  Newcastle selected  **/
	/**************************/
	$('#get-started').on('click',function(event, speed){

		event.preventDefault();

		if($('#firstname').val() === '' || $('#studytype').val() === '') {

			if($('#firstname').val() === '') {
				$('#firstname').addClass('error');
			} else {
				$('#firstname').removeClass('error');
			}

			if($('#studytype option:selected').val() === '') {
				$('#studytype').addClass('error');
			} else {
				$('#studytype').removeClass('error');
			}

			$('#newcastle-error').slideDown();

		} else if ($('#studytype option:selected').val() ==='Undergraduate' && $('#studyarea option:selected').val() === '') {

			$('#studyarea').addClass('error');
			$('#newcastle-error').slideUp();
			$('#newcastle-error2').slideDown();

		} else {

			var firstName = $('#firstname').val();
			var studyType = $('#studytype').val();
			var studyArea = $('#studyarea option:selected').val();

			console.log('First name = ' + firstName);
			console.log('Study type = ' + studyType);
			console.log('Study area = ' + studyArea);

			setCookie('first-name',firstName,90);
			setCookie('study-type',studyType,90);
			setCookie('study-area',studyArea,90);

			cookieFirstName = getCookie('first-name');
			cookieStudyType = getCookie('study-type');
			cookieStudyArea = getCookie('study-area');

			console.log('Cookie - First name = ' + cookieFirstName);
			console.log('Cookie - Study type = ' + cookieStudyType);
			console.log('Cookie - Study area = ' + cookieStudyArea);

			$('#location-type-selection').slideUp(0);
			$('#select-event-txt').slideUp(0);
			$('#page-header').removeClass('minimised-header');
			$('#page-header').addClass('location-header');


			// $('#applied-welcome').html('<span class="fa fa-circle-o-notch fa-spin ajax-loading"></span><span class="loading-label">Loading your details&hellip;</span>');
			container.isotope('layout');

			/*
			if(is_mobile) {
				$(window).scrollTo(110,200);
			} else {
				$(window).scrollTo(220,200);
			}
			*/
			var namelength = cookieFirstName.length;
			var testname = /[a-z]{1,15}/.test(cookieFirstName);
			console.log('First name validation: ' + testname);
			if ((namelength<16)&&(testname="true")) {
				$('#studentname span#firstname').html(cookieFirstName);
			}
			
			// document.getElementById("studentname").innerHTML = firstName;

			$('#uon-body, #page-footer').show();
			$('#newcastle-error').hide();
			$('#study-newcastle').slideUp(speed);
			$('#progress-map').slideDown(speed);
			$('#study-undergraduate-grid').show().addClass($(this).data('filter').substr(1));

			
			// $('#page-header').addClass('minimised-header');

			// Show study area based on selected discipline area
			if (cookieStudyArea.length>0) {

				$("#study-section").show();
							
				$('#discipline-information').html('<span class="fa fa-circle-o-notch fa-spin ajax-loading"></span><span class="loading-label">Loading study area&hellip;</span>');
	container.isotope('layout');

				$('#discipline-information').load('/area-of-study/'+cookieStudyArea+'?SQ_PAINT_LAYOUT_NAME=shortsnapshot&SQ_DESIGN_NAME=shortsnapshot',function(){
				
					$('#discipline-information a.degree-link:not(.faculty_engineering_built_environment)').each(function(){
					    var h = $(this).attr('href').replace('degrees/','study?degree=');
					    $(this).attr('href',h).attr('target','_blank');
					});
			    	$('#discipline-information a.degree-link.faculty_engineering_built_environment').each(function(){
				    	$(this).attr('target','_blank');
				    });
					container.isotope('layout');
			
				});
			} else {
				$("#study-section").hide();
			}

			// Set link for big yellow Call To Action button based on study type selected
			if (cookieStudyType.length>0) {
				if (cookieStudyType == "Undergraduate") {
					console.log('Selected Undergraduate');
					$("a#learn-more-study").attr("href", "http://www.newcastle.edu.au/study/?study=undergraduate");
				} else if (cookieStudyType == "Postgraduate") {
					console.log('Selected Postgraduate');
					$("a#learn-more-study").attr("href", "http://www.gradschool.edu.au");

					// Show relevant study area information
					$("#study-section").show();
					$('#discipline-information').html('<span class="fa fa-circle-o-notch fa-spin ajax-loading"></span><span class="loading-label">Loading study area&hellip;</span>');
					container.isotope('layout');
					$('#discipline-information').load('/future-students/2016-open-day/study-area-postgraduate?SQ_PAINT_LAYOUT_NAME=lightbox&SQ_DESIGN_NAME=lightbox',function(){
						container.isotope('layout');
					});

				} else if (cookieStudyType == "Research Higher Degree") {
					console.log('Selected Research Higher Degree');
					$("a#learn-more-study").attr("href", "http://www.newcastle.edu.au/research-and-innovation/graduate-research/phd-and-research-degrees/why-a-research-degree");
					// Show relevant study area information
					$("#study-section").show();
					$('#discipline-information').html('<span class="fa fa-circle-o-notch fa-spin ajax-loading"></span><span class="loading-label">Loading study area&hellip;</span>');
					container.isotope('layout');
					$('#discipline-information').load('/future-students/2016-open-day/study-area-research?SQ_PAINT_LAYOUT_NAME=lightbox&SQ_DESIGN_NAME=lightbox',function(){
						container.isotope('layout');
					});
				} else if (cookieStudyType == "Enabling") {
					console.log('Selected Enabling');
					$("a#learn-more-study").attr("href", "http://www.newcastle.edu.au/study/?pick=general");

					// Show relevant study area information
					$("#study-section").show();
					$('#discipline-information').html('<span class="fa fa-circle-o-notch fa-spin ajax-loading"></span><span class="loading-label">Loading study area&hellip;</span>');
					container.isotope('layout');
					$('#discipline-information').load('/future-students/2016-open-day/study-area-elfs?SQ_PAINT_LAYOUT_NAME=lightbox&SQ_DESIGN_NAME=lightbox',function(){
						container.isotope('layout');
					});

				} else {
					// console.log('Default');
					$("a#learn-more-study").attr("href", "http://www.newcastle.edu.au/study");
				}
			}

			// Check if rego-thanks id exists. If so, scroll to thankyou message
			if ($('#rego-thanks').length) {
				setTimeout(function(){
					// Scroll to Registration thank you message
				    $(window).scrollTo($('#rego-thanks').offset().top-190,500);
				},200)	
			}
			else {
			 	/* rego-thanks doesn't exist */
			 	// Check Newcastle on Rego form
				$("#q260505_q14_0").prop("checked", true)
				// Insert First name into name field	
				$("#q260505_q1").val(cookieFirstName);
				// Set study area in Area of Study drop down
				$('#q260505_q17 option').filter(function() { 
				    return ($(this).val() == cookieStudyArea); //To select cookieStudyArea
				}).prop('selected', true);

				$('.button-rego').show();
			}

			/* Check if change-study-area id exists. If so, enable user to make change
			if ($("#change-study-area").length) {
				$("#change-study").on('change',function(){
				    alert("The study area has been changed.");
				});
			}
			*/

			$(".button-rego").click(function(event) {
				event.preventDefault();
				$(window).scrollTo($('#regoheader').offset().top-150,500);
			});

			if($('#form_email_260505').length > 0) {
	        	$('#form_email_260505').attr('action','http://www.newcastle.edu.au/future-students/2016-open-day?location=Newcastle');
	    	}

			resetGalleries();

			$('.stackable-grid').isotope('layout');

		}

	});
	$('#firstname').on('change',function(){
		if($('#firstname').val() === '') {
			$('#firstname').addClass('error');
		} else {
			$('#firstname').removeClass('error');
		}
	});
	$('#studytype').on('change',function(){
		if($('#studytype').val() === '') {
			$('#studytype').addClass('error');
		} else {
			$('#studytype').removeClass('error');
		}
	});


	/****************************************************************************/
	/**  Show Study Area drop-down if undergraduate is selected for Study Type **/
	/****************************************************************************/

	var studytype = $('#studytype');
	// var select = this.value;
	studytype.change(function () {
	    if ($(this).val() == 'Undergraduate') {
	        $('#studyareacontainer').show();
	        if($('#firstname').val() !== '') { 		// If firstname not null, remove error message
	        	$('#newcastle-error').slideUp();
	        }
	    }
	    else $('#studyareacontainer').hide(); 		// hide div if value is not "Undergraduate"
	});



	/**********************************************************************************************/
	/**  Back buttons for Postgraduate, International and Applied Study options		- p.go-back    **/
	/**  Back buttons for degrees, degree, disciplines, discipline etc. steps			- #study-back  **/
	/**********************************************************************************************/

	$('p.go-back a').on('click',function(event){
		event.preventDefault();
		History.pushState({step:null}, 'open day 2016 / The University of Newcastle, Australia', '/future-students/2016-open-day/');
		$('#page-header').removeClass('location-header');
	});

	/*
	$('#study-back a').on('click',function(event){
		event.preventDefault();
		
		if($(this).attr('id') == 'study-back-type') {
			History.pushState({step:null}, 'open day 2016 / The University of Newcastle, Australia', '/study');
		} else if($(this).attr('id') == 'study-back-undergraduate') {
			History.pushState({step:'study=undergraduate', t: $(this)}, 'Undergraduate study / open day 2016 / The University of Newcastle, Australia', '?study=undergraduate');
		} else if($(this).attr('id') == 'study-back-degrees') {
			History.pushState({step:'pick=degree'}, 'Degrees / open day 2016 / The University of Newcastle, Australia', '?pick=degree');
		} else if($(this).attr('id') == 'study-back-disciplines') {
			History.pushState({step:'pick=discipline'}, 'Areas of Study / open day 2016 / The University of Newcastle, Australia', '?pick=discipline');
		} else if($(this).attr('id') == 'study-back-applied') {
			History.pushState({step:'study=applied', t: $(this)}, 'I have already applied / open day 2016 / The University of Newcastle, Australia', '?study=applied');
		}
	});
	*/

	// Close the lightbox when clicking on the overlay or close button

	$('body').on('click', 'a.goto-planner', function(event) {
		// console.log('You clicked the planner button');
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
		$(window).scrollTo($('#open-day-planner').offset().top-90,500);
	});

	// Closes lightbox window and opens campus map window

	$('body').on('click', 'a.goto-map', function(event) {
	  	event.preventDefault();
		$('a[href^="http://www.newcastle.edu.au/future-students/2016-open-day/campus-maps"]').trigger('click');
	});


	if(State.url.indexOf('?') !== -1) {

		/******************************/
		/**  Re-filter on page load  **/
		/******************************/

		var queue = []

		/**  First name and ID supplied - goto applied step  **/

		var preselect_firstname = getUrlVars()["firstname"];
		var preselect_studytype = getUrlVars()["studytype"];
		var preselect_url = window.location.href.slice(window.location.href.indexOf('?'));

		if(preselect_firstname != '' && preselect_firstname != undefined && preselect_studytype != '' && preselect_studytype != undefined) {
			// $('#firstname').val(preselect_firstname);
			// $('#studytype').val(preselect_studytype);
			queue = [
				// $('a.button[href="?study=applied"]').triggerHandler('click',[0]),
				//History.pushState({step:'study=applied', t: $(this)}, 'I have already applied / mstudytype-year entry 2016 / The University of Newcastle, Australia', '?study=applied'),
				$('#firstname').val(preselect_firstname),
				$('#studytype').val(preselect_studytype),
				$('#applied-url').val(preselect_url),
				$('#get-started').click(), //triggerHandler('click',[0]),
				$(window).scrollTo(0,0)
			];
		}

		/**  Study option selected - goto study step ug/pg/int/app  **/

		var preselect_location = getUrlVars()['location'];
		if(preselect_location === 'Newcastle') {
			queue = [
				fireVirtualPageView('/location?location=Newcastle'+utm_string,'Newcastle location'),
				History.pushState({step:'location=Newcastle'+utm_string, t: $(this)}, 'Newcastle / Open Day 2016 / The University of Newcastle, Australia', '?location=Newcastle'+utm_string),
				// $('a.decision-block-link[href="?location=undergraduate"]').triggerHandler('click',[0]),
				$(window).scrollTo(0,0)
			];
		} else if(preselect_location === 'Port-Macquarie') {
			queue = [
				fireVirtualPageView('/location?location=Port-Macquarie'+utm_string,'Port-Macquarie location'),
				History.pushState({step:'location=Port-Macquarie'+utm_string, t: $(this)}, 'Port Macquarie / Info Session 2016 / The University of Newcastle, Australia', '?location=Port-Macquarie'+utm_string),
				// $('a.decision-block-link[href="?location=postgraduate"]').triggerHandler('click',[0]),
				container.isotope({ filter: '.filter-port-macquarie' }),
    			resetGalleries(),
				$(window).scrollTo(0,0)
			];
		} 
		/*
		else if(preselect_location === 'international') {
			queue = [
				fireVirtualPageView('/location?location=international','International student'),
				History.pushState({step:'location=international', t: $(this)}, 'International student / open day 2016 / The University of Newcastle, Australia', '?location=international'),
				// $('a.decision-block-link[href="?location=international"]').triggerHandler('click',[0]),
				$(window).scrollTo(0,0)
			];
		} else if(preselect_location === 'applied') {
			queue = [
				fireVirtualPageView('?location=applied','I have already applied'),
				History.pushState({step:'location=applied', t: $(this)}, 'I have already applied / open day 2016 / The University of Newcastle, Australia', '?location=applied'),
				// $('a.decision-block-link[href="?location=applied"]').triggerHandler('click',[0]),
				$(window).scrollTo(0,0)
			];
		}
		*/

		/**  Run queued actions  **/

		var res = queue.reduce(function(prev,cur){ // chain to res later to hook on done
			return prev.then(cur);
		}, $.Deferred().resolve());


	} //if ? -1


// 	// function to get URL parameters

// 	var getUrlParameter = function getUrlParameter(sParam) {
// 	    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
// 	        sURLVariables = sPageURL.split('&'),
// 	        sParameterName,
// 	        i;

// 	    for (i = 0; i < sURLVariables.length; i++) {
// 	        sParameterName = sURLVariables[i].split('=');

// 	        if (sParameterName[0] === sParam) {
// 	            return sParameterName[1] === undefined ? true : sParameterName[1];
// 	        }
// 	    }
// 	};

// 	var location = getUrlParameter('location');
// 	console.log('Location variable is: ' + location);

// 	if (location ==='Port-Macquarie') {
// 		resetToPortMacquarieStep();
// 		console.log('URL parameter recognised - reset to Port Macquarie');
// 	} else if (location ==='Newcastle') {
// 		// resetToNewcastleStep();
// 		window.location.href = "http://www.newcastle.edu.au/future-students/2016-open-day-newcastle";
// 		console.log('URL parameter recognised - reset to Newcastle');
// 	} 


});

})(jQuery);
