(function($){

    $(document).ready(function(){

        $('a[href*="#top"]').on('click',function(event){
            event.preventDefault();
            $.scrollTo(0,1000);
        });

        /**********************************/
        /**  Fast facts (Campus) toggle  **/
        /**********************************/

        $('.fast-fact-toggle a').on('click',function(event){
            event.preventDefault();
            $('.fast-fact-toggle a.active').removeClass('active');
            $('.fast-fact-toggle a[href="'+$(this).attr('href')+'"]').addClass('active');
            $('[data-location]').hide();
            var loc = $(this).attr('href').substr(1);
            $('[data-location="'+loc+'"]').show().addClass('pulse');
            setCookie('degree-location-selection',loc,1000);
        });


        /*****************************************/
        /**  Region (Australian/International)  **/
        /*****************************************/

        $('.region-toggle a').on('click',function(event){
            event.preventDefault();
            $('[data-region]').hide();
            var reg = $(this).attr('href').substr(1);
            $('[data-region="'+reg+'"]').show();
            $('.region-toggle a.active').removeClass('active');
            $('.region-toggle a[href="'+$(this).attr('href')+'"]').addClass('active');
            setCookie('degree-region-selection',reg,1000);
        });


        /*************************************************************************/
        /**  Re-selection of last campus/region based on cookie or geolocation  **/
        /*************************************************************************/

        var degree_location = getCookie('degree-location-selection');
        var degree_region = getCookie('degree-region-selection');

        if(degree_location === '' && degree_region === '') { // If no cookies, then get geolocation data

            getGeoDegreeLocationRegion();

        } else { // Else use retrieved cookie values to set location and regionn

            if($('.fast-fact-toggle a[href="#'+degree_location+'"]').length > 0) {
                // console.log("location by cookie: "+degree_location);
                $('.fast-fact-toggle a[href="#'+degree_location+'"]').click();
            } else {
                $('.fast-fact-toggle a:first-child').click();
            }

            if($('.region-toggle a[href="#'+degree_region+'"]').length > 0) {
                // console.log("region by cookie: "+degree_region);
                $('.region-toggle a[href="#'+degree_region+'"]').click();
            } else {
                $('.region-toggle span:first-child a[href="#'+degree_region+'"]').click();
            }

        }


        /*******************************************************************/
        /**  Stretch main gallery/showcase out to edge of browser window  **/
        /*******************************************************************/

        if($('.body-content > .image-gallery').length > 0) {
            var pad = ($(window).width() - $('.body-content').width())/2;
            if(pad > 0) {
                $('.body-content > .image-gallery').css({'margin-left':'-'+pad+'px','margin-right':'-'+pad+'px'});
            }
            $(window).on('resize',function(){
                var pad = ($(window).width() - $('.body-content').width())/2;
                if(pad > 0) {
                    $('.body-content > .image-gallery').css({'margin-left':'-'+pad+'px','margin-right':'-'+pad+'px'});
                }
            });
        }


        /**************************************/
        /**  Tabbed section on degree pages  **/
        /**************************************/

        $('#degree-tabs a').on('click',function(event){
            event.preventDefault();
            if(!$(this).hasClass('active')) {
                $('.tab').slideUp();
                $('#degree-tabs a.active').removeClass('active');
                $(this).addClass('active');
                $($(this).attr('href')).slideDown(function(){
                    container.isotope('layout');
                    $(this).find('.gallery').flickity('resize');
                });
            }
        });

        $('#about-menu li a, .about-tab .button').on('click',function(event){
            event.preventDefault();
            if(!$('#about-menu li a[href='+$(this).attr('href')+']').hasClass('active')) {
                $('.about-tab').slideUp();
                $($(this).attr('href')).slideDown(function(){
                    $.scrollTo($(this).offset().top-100,1000);
                });
                $('#about-menu li a.active').removeClass('active');
                $('#about-menu li a[href='+$(this).attr('href')+']').addClass('active');
            }
        });


        /************************************************************************************************************/
        /**  Add lightbox action to links in fast facts (outside of main body, so doesn't get them automatically)  **/
        /************************************************************************************************************/

        uonLightbox('.fast-facts a.popup-link');


        /************************************************/
        /**  International entry requirement selector  **/
        /************************************************/

        $('.country-selector').on('change',function(){

            $('.equivalence-message').hide();

            var cty = $(this).val();

            if(cty == '') {
                $('.country-list').hide();
            } else {
                $('.country-list').show();
            }

            $('.country-list *[class*="country"]').hide();
            $('.country-list .country-'+cty).show();
            $('.equivalence-message.country-'+cty).show();

            if($('.country-list .country-'+cty).find('.fa-asterisk').length > 0) {
                $('.ier-nic').show();
            } else {
                $('.ier-nic').hide();
            }
            if($('.country-list .country-'+cty).find('.fa-plus-circle').length > 0) {
                $('.ier-aer').show();
                $('.equivalence-message').show();
            } else {
                $('.ier-aer').hide();
            }

            $('.country-selector').val(cty);

            setCookie('degree-country-selection',cty,1000);

        });


        /***************************************************/
        /**  Re-select country from previous interaction  **/
        /***************************************************/

        var degree_country = getCookie('degree-country-selection');
        if(degree_country !== '') {
            $('.country-selector').val(degree_country).change(); // a[href="#'+degree_region+'"]').click();
        }


        /********************************************************************************/
        /**  Smooth scroll for hash links - includes tab actiovation for #degree-tabs  **/
        /********************************************************************************/

        $('a[href^="#"]').on('click',function(event){ // #tab-
            var t = $(this).attr('href');
            if($(t).length === 1 && $(this).parent().attr('id') !== 'degree-tabs' && $(this).parent().parent().attr('id') !== 'about-menu' && $(this).parent().parent().parent().attr('id') !== 'about-tabs') {
                event.preventDefault();
                if(t.indexOf('#tab-') !== -1) {
                    if(!$('#degree-tabs a[href="'+t+'"]').hasClass('active')) {
                        $('#degree-tabs a[href="'+t+'"]').click();
                    }
                    $.scrollTo($('#degree-tabs').offset().top-100,1000);
                } else {
                    $.scrollTo($(t).offset().top-100,1000);
                }
            }
        });


        /*************************************************/
        /**  Select default tab as defined in metadata  **/
        /*************************************************/

        if($('.tab-content').length > 0) {

            var degree_tabs = $('#degree-tabs a');
            var tab_active = $('.tab-content').data('activetab');
            /** TODO put this back, work out why its throwing erros **/
            if(tab_active != '' && ((tab_active-1) < degree_tabs.length) ) {
                if(!$(degree_tabs[tab_active-1]).hasClass('active')) {
                    $(degree_tabs[tab_active-1]).click();
                }
            }

        }


        /******************************************************************************************************/
        /**  Re-select tab (from #degree-tabs) based on window.location (ie. apply link from handbook page)  **/
        /******************************************************************************************************/

        if(window.location.hash.indexOf('tab') > -1) {
            $('a[href="'+window.location.hash+'"]').click();
        }


        /****************************************/
        /**  Collapsible sections on Handbook  **/
        /****************************************/

        $('h3.collapsible, h4.collapsible').on('click',function(event){
            event.preventDefault();
            $(this).toggleClass('collapsed');
            $('#section-'+$(this).attr('id')).slideToggle();
        });


        /************************************************************/
        /**  Grouped combined degrees for related degree listings  **/
        /************************************************************/

        $('ol.degree-listing:has(li[data-component])').each(function(){

            var single_degrees = new Array();
            var combined_degrees = new Array();
            var displayed_degrees = new Array();

            $(this).children('li[data-component!=""]').each(function(){

                var degree_components = $(this).data('component').split(',');

                for(var dc = 0;dc < degree_components.length;dc++) {
                    if(!combined_degrees['degree-'+degree_components[dc]]) {
                        combined_degrees['degree-'+degree_components[dc]] = new Array();
                    }
                    combined_degrees['degree-'+degree_components[dc]].push($(this).clone());
                }

            });

            $(this).children('li[data-component=""]').each(function(i){

                if(!single_degrees['degree-'+$(this).data('id')]) {
                    single_degrees['degree-'+$(this).data('id')] = new Array();
                }
                single_degrees['degree-'+$(this).data('id')].push($(this).clone());
                displayed_degrees.push($(this).data('id'));

                if(combined_degrees['degree-'+$(this).data('id')] !== undefined) {
                    var ul = $(this).addClass('combined-parent').append(' <a href="#toggle-combined-'+$(this).data('id')+'" name="toggle-combined-'+$(this).data('id')+'" class="combined-toggle"><span class="fa fa-plus-circle"></span>'+combined_degrees['degree-'+$(this).data('id')].length+' combined degrees</a><ul class="combined-options hidden"></ul>').find('ul.combined-options')
                    for(cd in combined_degrees['degree-'+$(this).data('id')]) {
                        ul.append(combined_degrees['degree-'+$(this).data('id')][cd]);
                        displayed_degrees.push(combined_degrees['degree-'+$(this).data('id')][cd].data('id'));
                    }
                }

            });

            $(this).children('li[data-component!=""]').each(function(){

                if($(this).text(),displayed_degrees.indexOf($(this).data('id')) > -1) {
                    $(this).remove();
                }

            });

            $(this).find('li.combined-parent a.combined-toggle').each(function(){

                var degree_name = $(this).parent().find('.degree-link').text();
                var degree_components = degree_name.split(' / ');

                $(this).on('click',function(event){
                    event.preventDefault();
                    var c = $(this).parent().attr('id');
                    $(this).find('.fa').toggleClass('fa-plus-circle').toggleClass('fa-minus-circle');
                    $(this).parent().find('.combined-options').slideToggle(function(){
                        container.isotope('layout');
                    });
                }).parent().find('.combined-options').append(combined_degrees[degree_components[0]]);

            });

            var c_len = $(this).children('li').length;
            if($(this).hasClass('related-degree-listing') && c_len > 5) {
                $(this).children('li:gt(4)').hide();
                $(this).append('<li style="padding-left:20px;"><a href="#" class="button very-small-button"><span class="fa fa-plus-circle"></span><span class="a">Show</span> '+(c_len-5)+' more related degree'+((c_len-5)>1?'s':'')+'</a></li>');
                $(this).find('li .very-small-button').on('click',function(event){
                    event.preventDefault();
                    var c = $(this).find('.a').text();
                    if(c === 'Show') {
                        $(this).find('.a').text('Hide');
                        $(this).find('.fa').addClass('fa-minus-circle').removeClass('fa-plus-circle');
                        $(this).parent().siblings('li').show();
                    } else {
                        $(this).find('.a').text('Show');
                        $(this).find('.fa').addClass('fa-plus-circle').removeClass('fa-minus-circle');
                        $(this).parent().siblings('li:gt(4)').hide();
                    }
                });
            }

        });


        /*********************************************/
        /**  YouTube API interactions for tracking  **/
        /*********************************************/

        var gtmYTListeners = []; // support multiple players on the same page

        // Attach YT listener once the API is loaded
        function onYouTubeIframeAPIReady() {
            for (var e = document.getElementsByTagName("iframe"), x = e.length; x--;) {
                if (/youtube.com\/embed/.test(e[x].src)) {
                    gtmYTListeners.push(new YT.Player(e[x], {
                        events: {
                            onStateChange: onPlayerStateChange,
                            onError: onPlayerError
                        }
                    }));
                    YT.gtmLastAction = "p";
                }
            }
        }
        function onYouTubeSingleIframeAPIReady(x) {
            var e = $('#'+x);
            if (/youtube.com\/embed/.test(e.attr('src'))) {
                gtmYTListeners.push(new YT.Player(e[0], {
                    events: {
                        onStateChange: onPlayerStateChange,
                        onError: onPlayerError
                    }
                }));
                YT.gtmLastAction = "p";
            }
        }

        // Listen for play/pause, other states such as rewind and end could also be added
        // Also report % played every second
        function onPlayerStateChange(e) {
            e["data"] == YT.PlayerState.PLAYING && setTimeout(onPlayerPercent, 1000, e["target"]);
            var video_data = e.target["getVideoData"](),
                label = video_data.video_id+':'+video_data.title;
            if (e["data"] == YT.PlayerState.PLAYING && YT.gtmLastAction == "p") {
                dataLayer.push({
                    event: "youtube",
                    action: "play",
                    label: label
                });
                YT.gtmLastAction = "";
            }
            if (e["data"] == YT.PlayerState.PAUSED) {
                dataLayer.push({
                    event: "youtube",
                    action: "pause",
                    label: label
                });
                YT.gtmLastAction = "p";
            }
        }

        // Catch all to report errors through the GTM data layer
        // Once the error is exposed to GTM, it can be tracked in UA as an event!
        function onPlayerError(e) {
            dataLayer.push({
                event: "error",
                action: "GTM",
                label: "youtube:" + e["target"]["src"] + "-" + e["data"]
            });
        }

        // Report the % played if it matches 0%, 25%, 50%, 75% or completed
        function onPlayerPercent(e) {
            if (e["getPlayerState"]() == YT.PlayerState.PLAYING) {
                var t = e["getDuration"]() - e["getCurrentTime"]() <= 1.5 ? 1 : (Math.floor(e["getCurrentTime"]() / e["getDuration"]() * 4) / 4).toFixed(2);
                if (!e["lastP"] || t > e["lastP"]) {
                    var video_data = e["getVideoData"](),
                        label = video_data.video_id+':'+video_data.title;
                    e["lastP"] = t;
                    dataLayer.push({
                        event: "youtube",
                        action: t * 100 + "%",
                        label: label
                    });
                }
                e["lastP"] != 1 && setTimeout(onPlayerPercent, 1000, e);
            }
        }

        if($('.youtube-replace').length = 0 || $('iframe[src*="youtube.com/embed"]').length > 0) {
            // Load the Youtube JS api and get going
            var j = document.createElement("script");
            var f = document.getElementsByTagName("script")[0];
            j.src = "//www.youtube.com/iframe_api";
            j.async = true;
            j.id = "YoutubeIframeAPI";
            f.parentNode.insertBefore(j, f);
        }


        /******************************************************************/
        /**  Replace default YouTube embeds in content with placeholder  **/
        /**  Works in the reverse of the youtube-replace scipt below     **/
        /******************************************************************/

        $('iframe[src*="youtube.com/embed"]').each(function(){

            var src = $(this).attr('src');
            $(this).attr('src','about:blank');

            var video_id = '';
            var list_id = '';
            if(src.indexOf('?list=') !== -1) {
                video_id = src.substr(src.indexOf('/embed/')+7,src.indexOf('?list=')-src.indexOf('/embed/')-7);
                list_id = src.substr(src.indexOf('?list=')+6);
            } else {
                video_id = src.substr(src.indexOf('/embed/')+7).replace('?enablejsapi=1','');
            }

            var customimage = $(this).data('customimage');

            var video_title = $(this).attr('title');
            var video_class = $(this).attr('class');

            $(this).after('<figure class="video-figure'+(video_class!=''&&video_class!==undefined?' '+video_class:'')+'"><div data-listid="'+list_id+'" data-videoid="'+video_id+'" id="youtube-'+video_id+'" data-title="'+(video_title!=''&&video_title!==undefined?video_title:'Youtube video')+'" class="youtube-replace" style="background-image: url('+(customimage !== undefined && customimage !== ""?customimage:'//i.ytimg.com/vi/'+video_id+'/sddefault.jpg')+');" data-customimage="'+(customimage !== undefined && customimage !== ""?customimage:'')+'"><div class="fa fa-play-circle"></div></div>'+(video_title!=''?'<figcaption><span class="fa fa-caret-up"></span> <strong>Video:</strong> '+(video_title!=''&&video_title!==undefined?video_title:'Youtube video')+'</figcaption>':'')+'</figure>').remove();

        });


        /************************************************************************************************************/
        /**  Alternate YouTube embeds, primarily used in paint layout controlled components - gallery, grid, etc.  **/
        /**  https://www.sitepoint.com/faster-youtube-embeds-javascript/                                           **/
        /************************************************************************************************************/

        $(".youtube-replace").each(function() {
            var videoid = $(this).data('videoid');
            var listid = $(this).data('listid');
            var customimage = $(this).data('customimage');
            if(customimage !== undefined && customimage !== '') {
                // Use a custom image, if specified
                $(this).css('background-image', 'url(' + customimage + ')');
            } else {
                // Based on the YouTube ID, we can easily find the thumbnail image
                $(this).css('background-image', 'url(//i.ytimg.com/vi/' + videoid + '/sddefault.jpg)');
            }

            $(document).delegate('#'+this.id, 'click', function() {

                // Create an iFrame with autoplay set to true
                var iframe_url = "//www.youtube.com/embed/" + videoid + "?autoplay=1&rel=0&enablejsapi=1&autohide=1" + ( listid ? "&list=" + listid : '' );
                if ($(this).data('params')) iframe_url+='&'+$(this).data('params');

                // The height and width of the iFrame should be the same as parent
                var iframe = $('<iframe />', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height(), 'title': $(this).data('title'), 'id': 'iframe-'+this.id, 'allowfullscreen':true })

                // Replace the YouTube thumbnail with YouTube HTML5 Player
                $(this).replaceWith(iframe);

                onYouTubeSingleIframeAPIReady('iframe-'+this.id);

            });
        });


        /***************************************/
        /**  Key dates on 'How to apply' tab  **/
        /***************************************/

        if($('#hta-key-dates')) {

            var up_next_key_today_date = new Date();
            var up_next_key_month = up_next_key_today_date.getMonth()+1;
            if(up_next_key_month < 10) { up_next_key_month = "0"+up_next_key_month; }
            var up_next_key_day = up_next_key_today_date.getDate();
            if(up_next_key_day < 10) { up_next_key_day = "0"+up_next_key_day; }
            var up_next_key_today = up_next_key_today_date.getFullYear()+""+up_next_key_month+""+up_next_key_day;
            var up_next_counter = 0;

            $('#hta-key-dates li').each(function(){
                if(up_next_key_today > $(this).data('date')) {
                    $(this).remove();
                } else {
                    if(up_next_counter > 7) {
                        $(this).remove();
                    }
                    up_next_counter++;
                }
            });

            $('#hta-key-dates ol.grouped-dates-list').each(function(){
                if($(this).find('li').length === 0) {
                    $(this).prev('h4').remove();
                    $(this).remove();
                }
            });

        }


        /*********************************/
        /**  Floating menu on handbook  **/
        /*********************************/

        if($('#handbook-side-menu').length > 0) {

            if($('h3#program-plans').length == 0) {
                $('#handbook-side-menu a[href="#program-plans"]').parent().remove();
            }
            if($('h3#additional-documents').length == 0) {
                $('#handbook-side-menu a[href="#additional-documents"]').parent().remove();
            }

            function handbookSideMenuPosition() {

                if($('#handbook-side-menu').outerHeight() + 80 > $(window).height()) {

                    $('#handbook-side-menu').removeClass('fixed-position').css({'top':'','bottom':''});

                } else {

                    var menu_pos = $('#handbook-side-menu').parent().offset().top;
                    var scroll_pos = $(window).scrollTop();
                    if(scroll_pos >= (menu_pos-63)) {
                        $('#handbook-side-menu').addClass('fixed-position').width($('#handbook-side-menu').parent().width()-63);
                    } else {
                        $('#handbook-side-menu').removeClass('fixed-position');
                    }

                    var ws = $(window).scrollTop();
                    $('#handbook-side-menu > li > a').each(function(){
                        if($('#degree-details h3'+$(this).attr('href')).length > 0) {
                            if($('#degree-details h3'+$(this).attr('href')).offset().top - ws > 0 && $('#degree-details h3'+$(this).attr('href')).offset().top - ws < 150) {
                                $('#handbook-side-menu a.active').removeClass('active'); //.next('ol').hide();
                                $(this).addClass('active');
                                return false;
                            }
                        }
                    });

                    var footer_pos = $('#page-footer').offset().top;
                    var footer_height = $('#page-footer').outerHeight() + $('#uon-footer').outerHeight();
                    var menu_height = $('#handbook-side-menu').outerHeight();
                    var window_height = $(window).height();
                    var document_height = $(document).height();

                    if(footer_pos-ws-130 < (menu_height)) {
                        var pp = scroll_pos-(document_height-footer_height-window_height)+70;
                        $('#handbook-side-menu').css({'top':'auto','bottom':pp});
                    } else {
                        $('#handbook-side-menu').css({'top':'','bottom':''});
                    }

                }

            }

            $(window).on('scroll',function(){
                handbookSideMenuPosition();
            });

            handbookSideMenuPosition();

        }


        /******************************************/
        /**  Course filter on program handbooks  **/
        /******************************************/

        function filtron_structure() {

            $('#section-program-structure .handbook-course-listing').show();
            $('#section-program-structure .handbook-course-listing tbody tr.hidethis, td.availability ul li.hidethis').show(0,function(){
                $(this).removeClass('hidethis');
            });

            var total_courses = $('#section-program-structure .handbook-course-listing tbody tr').length;

            var filters = [];
            var filter_array = ['location','term','subject','level'];

            for(x in filter_array) {

                filters[filter_array[x]] = $('#structure-filters input[name="filter-'+filter_array[x]+'"]:checked').map(function(_, el) { return '.'+$(el).val(); }).get();

                if(filters[filter_array[x]].length > 0) {
                    $('#section-program-structure .handbook-course-listing tbody tr:not('+filters[filter_array[x]].join(',')+')').addClass('hidethis');

                    if(filter_array[x] == 'location') {
                        $('td.availability ul li:not('+filters[filter_array[x]].join(',')+')').addClass('hidethis');
                    }

                }

            }

            $('#section-program-structure .handbook-course-listing tbody tr.hidethis, td.availability ul li.hidethis').hide();

            var hidden_courses = $('#section-program-structure .handbook-course-listing tbody tr.hidethis').length;

            $('#filter-result-count').text(total_courses-hidden_courses);

            filtron_structure_counts();

            $('#section-program-structure .handbook-course-listing tbody').each(function(){
                $(this).siblings('tfoot').remove();
                var group_rows = $(this).find('tr').length;
                var hidden_rows = $(this).find('tr.hidethis').length;
                $(this).parent().append('<tfoot><tr><td colspan="4" style="background:#F6F0F6;padding:5px 10px;border-radius:3px;"><span class="fa fa-info-circle" style="color:#606;margin-right:10px;"></span><em>Showing <strong style="color:#606;">'+(group_rows-hidden_rows)+' of '+group_rows+'</strong> courses in this section based on your current filters.'+(hidden_rows>0?' <a href="#">Show all</a>':'')+'</em></td></tr></tfoot>');
            });

            $('#section-program-structure .handbook-course-listing tfoot a').on('click',function(event){
                event.preventDefault();
                var pl = $(this).parentsUntil('table');
                $(pl[pl.length-1]).parent().find('.hidethis').show().removeClass('hidethis');
                $(pl[pl.length-1]).remove();
            });

            $('#section-program-structure > div').each(function(){
                var group_rows = $(this).find('tbody tr').length;
                var hidden_rows = $(this).find('tbody tr.hidethis').length;
                var h4 = $(this).find('h4');
                if(group_rows == hidden_rows) {
                    h4.addClass('collapsed');
                    $('#section-'+h4.attr('id')).hide();
                } else {
                    h4.removeClass('collapsed');
                    $('#section-'+h4.attr('id')).show();
                }
            });

            $('#advanced-filter .fa-circle-o-notch').fadeOut(function(){
                $(this).remove();
            });

        }

        /*******************************************/
        /**  Update counts for the course filter  **/
        /*******************************************/

        function filtron_structure_counts() {

            $('#structure-filters input[type="checkbox"]').each(function(){
                var count = $('#section-program-structure .handbook-course-listing tbody tr.'+$(this).val()+':not(.hidethis)').length;
                var c = $(this).siblings('.count');
                c.text(count);
                if(count > 0) {
                    $(this).parent().animate({opacity:1});
                    c.show();
                } else {
                    $(this).parent().animate({opacity:0.5});
                    c.hide();
                }
            });

        }

        if($('#structure-filters').length > 0) {

            $('#structure-filters input[name="filter-term"][value!="term_unavailable"]').attr('checked','checked');

            $('#structure-filters input[type="checkbox"]').on('click',function(){
                $('#advanced-filter').append('<span class="fa fa-circle-o-notch fa-spin"></span>');
                setTimeout(function() { filtron_structure(); },100);
            });

            filtron_structure();

        }



        /*****************************/
        /**  Degree listing search  **/
        /*****************************/

        $('#back-to-az').on('click',function(event){
            event.preventDefault();
            $("#degree-search-results").hide();
            $('#degree-az-listing').show();
            $('#degree-cta-row').slideDown();
            $('#degree-search-field').val('');
            if(history.pushState) {
                var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                window.history.pushState({path:newurl},'',newurl);
            }
        });


        $('#degree-search-submit').on('click',function(event){

            event.preventDefault();

            if($('#degree-search-field').val() !== '') {

                $('#degree-search-submit .fa').toggleClass('fa-search fa-spin fa-circle-o-notch');

                $('#degree-az-listing').hide();

                $('#degree-cta-row').slideUp();

                $('#degree-search-results > .clearfix').hide();

                $('#degree-search-results #undergraduate-results').hide();
                $('#degree-search-results #postgraduate-results').hide();
                $('#degree-search-results #course-results').hide();
                $('#back-to-az').parent().hide();

                $("#degree-search-results tbody").html('');

                $("#degree-search-results").append('<div id="search-loading"><span class="ajax-loading fa fa-circle-o-notch fa-spin"></span><span class="loading-label">Searching...</span></div>').show();

                var search_url = '//www.newcastle.edu.au/designs/uon-2016/gsa-search/study-search?query='+$('#degree-search-field').val();

                if(history.pushState) {
                    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?q='+$('#degree-search-field').val();
                    window.history.pushState({path:newurl},'',newurl);
                }

                $.ajax({
                    type: 'GET',
                    url: search_url,
                    async: false,
                    jsonpCallback: 'jsonCallback',
                    contentType: 'application/json',
                    dataType: 'jsonp',
                    success: function(json) {
                        if(json.results) {
    
                            var undergraduate_results = [];
                            var postgraduate_results = [];
                            var research_results = [];
                            var course_results = [];
                            var degree_handbooks = [];
    
                            $.each( json.results, function( i, item ) {
    
                                $.each(item.meta_tags,function(j,m) {
                                    if(m.name == "UON.Degree.Name") {
                                        item.degree_name = m.value;
                                    } else if(m.name == "uon-degree-title" && item.degree_name == '') {
                                        item.degree_name = m.value;
                                    } else if(m.name == "UON.Degree.ID") {
                                        item.degree_id = m.value;
                                    } else if(m.name == "uon-degree-code" && item.degree_id == '') {
                                        item.degree_id = m.value;
                                    } else if(m.name == "UON.Degree.Faculty") {
                                        item.degree_faculty = m.value;
                                    } else if(m.name == "UON.Degree.Intake") {
                                        item.degree_intake = m.value;
                                    } else if(m.name == "description") {
                                        item.degree_description = m.value;
                                    } else if(m.name == "uon-item-type") {
                                        item.item_type = m.value;
                                    } else if(m.name == "uon-course-name") {
                                        item.course_name = m.value;
                                    } else if(m.name == "uon-course-code") {
                                        item.course_code = m.value;
                                    } else if(m.name == "uon-course-units") {
                                        item.course_units = m.value;
                                    } else if(m.name == "uon-course-faculty") {
                                        if(m.value == 'Faculty of Business and Law') {
                                            item.course_faculty = 'faculty_business_law';
                                        } else if(m.value == 'Faculty of Education and Arts') {
                                            item.course_faculty = 'faculty_education_arts';
                                        } else if(m.value == 'Faculty of Engineering and Built Environment') {
                                            item.course_faculty = 'faculty_engineering_built_environment';
                                        } else if(m.value == 'Faculty of Health and Medicine') {
                                            item.course_faculty = 'faculty_health_medicine';
                                        } else if(m.value == 'Faculty of Science and Information Technology') {
                                            item.course_faculty = 'faculty_science_it';
                                        }
                                    }
                                });
    
                                if(item.item_type == 'Degree' && item.degree_name != '' && item.ranking >= 4 && item.url.indexOf('/handbook') === -1) {
                                    undergraduate_results.push(item);
                                }
    
                                if(item.url.indexOf('gradschool') !== -1) {
    
                                    if(item.title.indexOf(' - ') !== -1) {
                                        item.degree_name = item.title.substr(0,item.title.indexOf(' - ')).replace(/(<([^>]+)>)/ig,"");
                                    } else {
                                        item.degree_name = item.title.replace(/(<([^>]+)>)/ig,"");
                                    }
    
    
                                    var iu = item.url.replace(/[a-z-\/\:\.]*/ig,""); // console.log(iu);
                                    
                                    var gs_fbusl = ['11003','11040','11041','11198','11372','11702','12187','12333','12334','12374','12379','12384','12385','12386','12397','12398','12399','12400','12403','12406','40020','40022','40033','40034','40067','40068'];
                                    var gs_fedua = ['11255','11256','11714','11715','12211','12276','12351','12365','12376','40012','40013','40014','40015','40018'];
                                    var gs_fenbe = ['11277','11521','11522','12060','12407','12408','12410','12411','12412','40019','40021','40049','40050','40051','40060','40062','40063','40065'];
                                    var gs_fheam = ['10135','10200','10300','10973','11249','11383','11682','11686','11687','11716','12197','12244','12263','12273','12275','12277','12392','40023','40030'];
                                    var gs_fscit = ['11700','12323','12325','12326','12327','12363','12377','12378','12380','12381','12382','12387','12388','12394','12396','40024','40025','40026'];
                                    var gs_other = ['40031','40032'];
                                    if(gs_fbusl.indexOf(iu) !== -1) {
                                        item.degree_faculty = 'faculty_business_law';
                                    } else if(gs_fedua.indexOf(iu) !== -1) {
                                        item.degree_faculty = 'faculty_education_arts';
                                    } else if(gs_fenbe.indexOf(iu) !== -1) {
                                        item.degree_faculty = 'faculty_engineering_built_environment';
                                    } else if(gs_fheam.indexOf(iu) !== -1) {
                                        item.degree_faculty = 'faculty_health_medicine';
                                    } else if(gs_fscit.indexOf(iu) !== -1) {
                                        item.degree_faculty = 'faculty_science_it';
                                    } else if(gs_other.indexOf(iu) !== -1) {
                                        item.degree_faculty = 'faculty_other';
                                    }
    
                                    postgraduate_results.push(item);
    
                                }
    
                                if(item.url.indexOf('research') !== -1) {
    
                                    if(item.title.indexOf(' / ') !== -1) {
                                        var r_title = item.title.replace(/(<([^>]+)>)/ig,"").replace('PhD and Research Masters / ','');
                                        var first_index = r_title.indexOf(' / ');
                                        var second_index = r_title.substr(first_index+3,r_title.length-first_index+3).indexOf(' / ');
                                        // console.log(first_index,second_index);
                                        item.degree_name = r_title.substr(0,first_index+second_index+3);
                                    } else {
                                        item.degree_name = item.title.replace(/(<([^>]+)>)/ig,"");
                                    }
    
                                    if(item.url.indexOf('faculty-of-business-and-law') > 0) {
                                        item.degree_faculty = 'faculty_business_law';
                                    } else if(item.url.indexOf('faculty-of-education-and-arts') > 0) {
                                        item.degree_faculty = 'faculty_education_arts';
                                    } else if(item.url.indexOf('faculty-of-engineering-and-built-environment') > 0) {
                                        item.degree_faculty = 'faculty_engineering_built_environment';
                                    } else if(item.url.indexOf('faculty-of-health-and-medicine') > 0) {
                                        item.degree_faculty = 'faculty_health_medicine';
                                    } else if(item.url.indexOf('faculty-of-science-and-information-technology') > 0) {
                                        item.degree_faculty = 'faculty_science_it';
                                    }
    
                                    research_results.push(item);
                                }
    
                                if(item.item_type == 'Course' && item.course_name != '' && item.ranking >= 4) {
                                    course_results.push(item);
                                }
    
                            });
    
                            /*************************************/
                            /**  Display Undergraduate results  **/
                            /*************************************/
                            if(undergraduate_results.length > 0) {
                                for(d in undergraduate_results) {
                                    var intake_class = '';
                                    if(undergraduate_results[d].degree_intake) {
                                        intake_class = undergraduate_results[d].degree_intake.replace(';','');
                                    }
                                    $('<tr class="'+undergraduate_results[d].degree_faculty+' '+intake_class+'"><td class="title"><a class="degree-link" href="'+undergraduate_results[d].url+'">'+undergraduate_results[d].degree_name+'</a></td></tr>').appendTo( "#degree-search-results #undergraduate-results tbody" );
                                    // <td class="promo-icon"></td><td class="handbook">'+(undergraduate_results["'"+undergraduate_results[d].degree_id+"'"]?'<a href="'+undergraduate_results["'"+undergraduate_results[d].degree_id+"'"].url+'" class="button very-small-button next-button">Handbook</a>':'')+'</td>
                                }
                                var undergraduate_result_description = 'Undergraduate degree'+(undergraduate_results.length>1?'s':'');
                                $("#degree-search-results #search-undergraduate h2").text('Found '+undergraduate_results.length+' '+undergraduate_result_description);
                                $('#degree-search-results ul#about-menu li a[href="#search-undergraduate"] .count').text(undergraduate_results.length).parent().click().parent().show();
                            } else {
                                $('#degree-search-results #search-undergraduate').hide();
                                $('#degree-search-results ul#about-menu li a[href="#search-undergraduate"]').parent().hide()
                                $("#degree-search-results #search-undergraduate h2").text('Found 0 undergraduate degrees');
                                $('<tr><td colspan="3"><em>Sorry, no matches were found for "'+$('#degree-search-field').val()+'".</em></td></tr>').appendTo( "#degree-search-results #undergraduate-results tbody" );
                            }
    
                            /************************************/
                            /**  Display Postgraduate results  **/
                            /************************************/
                            if(postgraduate_results.length > 0) {
                                for(d in postgraduate_results) {
                                    var intake_class = '';
                                    if(postgraduate_results[d].degree_intake) {
                                        intake_class = postgraduate_results[d].degree_intake.replace(';','');
                                    }
                                    $('<tr class="'+postgraduate_results[d].degree_faculty+' '+intake_class+'"><td class="title"><a class="degree-link" href="'+postgraduate_results[d].url.replace("http:","")+'">'+postgraduate_results[d].degree_name+'</a></td></tr>').appendTo( "#degree-search-results #postgraduate-results tbody" );
                                    // <td class="promo-icon"></td><td class="handbook">'+(postgraduate_results["'"+postgraduate_results[d].degree_id+"'"]?'<a href="'+postgraduate_results["'"+postgraduate_results[d].degree_id+"'"].url.replace("http:","")+'" class="button very-small-button next-button">Handbook</a>':'')+'</td>
                                }
                                var postgraduate_result_description = 'Postgraduate degree'+(postgraduate_results.length>1?'s':'');
                                $("#degree-search-results #search-postgraduate h2").text('Found '+postgraduate_results.length+' '+postgraduate_result_description);
                                $('#degree-search-results ul#about-menu li a[href="#search-postgraduate"] .count').text(postgraduate_results.length).parent().parent().show();
                                if(undergraduate_results.length == 0) {
                                    $('#degree-search-results ul#about-menu li a[href="#search-postgraduate"]').click();
                                }
                            } else {
                                $('#degree-search-results #search-postgraduate').hide();
                                $('#degree-search-results ul#about-menu li a[href="#search-postgraduate"]').parent().hide();
                                $("#degree-search-results #search-postgraduate h2").text('Found 0 postgraduate degrees');
                                $('<tr><td colspan="3"><em>Sorry, no matches were found for "'+$('#degree-search-field').val()+'".</em></td></tr>').appendTo( "#degree-search-results #postgraduate-results tbody" );
                            }
    
                            /********************************/
                            /**  Display Research results  **/
                            /********************************/
                            if(research_results.length > 0) {
                                for(d in research_results) {
                                    var intake_class = '';
                                    if(research_results[d].degree_intake) {
                                        intake_class = research_results[d].degree_intake.replace(';','');
                                    }
                                    $('<tr class="'+research_results[d].degree_faculty+' '+intake_class+'"><td class="title"><strong><a class="degree-link" href="'+research_results[d].url.replace("http:","")+'">'+research_results[d].degree_name+'</a></strong><p style="text-align:left;margin:0 0 0 20px;">'+research_results[d].summary.replace(/(<([^>]+)>)/ig,"")+'<br/><a href="'+research_results[d].url.replace("http:","")+'">Find out more.</a></p></td></tr>').appendTo( "#degree-search-results #research-results tbody" );
                                }
                                var research_result_description = 'Research area'+(research_results.length>1?'s':'');
                                $("#degree-search-results #search-research h2").text('Found '+research_results.length+' '+research_result_description);
                                $('#degree-search-results ul#about-menu li a[href="#search-research"] .count').text(research_results.length).parent().parent().show();
                                if(undergraduate_results.length == 0 && postgraduate_results.length == 0) {
                                    $('#degree-search-results ul#about-menu li a[href="#search-research"]').click();
                                }
                            } else {
                                $('#degree-search-results #search-research').hide();
                                $('#degree-search-results ul#about-menu li a[href="#search-research"]').parent().hide();
                                $("#degree-search-results #search-research h2").text('Found 0 research areas');
                                $('<tr><td colspan="3"><em>Sorry, no matches were found for "'+$('#degree-search-field').val()+'".</em></td></tr>').appendTo( "#degree-search-results #research-results tbody" );
                            }
    
                            /******************************/
                            /**  Display Course results  **/
                            /******************************/
                            if(course_results.length > 0) {
                                for(c in course_results) {
                                    $('<tr class="'+course_results[c].course_faculty+'"><td class="course-code"><a href="'+course_results[c].url.replace("http:","")+'" class="popup-link">'+course_results[c].course_code+'</a></td><td class="title"><a href="'+course_results[c].url.replace("http:","")+'" class="popup-link">'+course_results[c].course_name+'</a></td><td class="units">'+course_results[c].course_units+' units</td></tr>').appendTo( "#degree-search-results #course-results tbody" );
                                }
                                var course_result_description = 'Individual course'+(course_results.length>1?'s':'');
                                $("#degree-search-results #search-courses h2").text('Found '+course_results.length+' '+course_result_description);
                                $('#degree-search-results ul#about-menu li a[href="#search-courses"] .count').text(course_results.length).parent().parent().show();
                                if(undergraduate_results.length == 0 && postgraduate_results.length == 0 && research_results.length == 0) {
                                    $('#degree-search-results ul#about-menu li a[href="#search-courses"]').click();
                                }
                            } else {
                                $('#degree-search-results #search-courses').hide();
                                $('#degree-search-results ul#about-menu li a[href="#search-courses"]').parent().hide();
                                $("#degree-search-results #search-courses h2").text('Found 0 courses');
                                $('<tr><td colspan="3"><em>Sorry, no matches were found for "'+$('#degree-search-field').val()+'".</em></td></tr>').appendTo( "#degree-search-results #course-results tbody" );
                            }
    
                            $('#degree-search-submit .fa').toggleClass('fa-search fa-spin fa-circle-o-notch');
                            $('#degree-search-results #search-loading').remove();
                            $('#degree-search-results #undergraduate-results').show();
                            $('#degree-search-results #postgraduate-results').show();
                            $('#degree-search-results #research-results').show();
                            $('#degree-search-results #course-results').show();
                            $('#degree-search-results > .clearfix').show();
                            $('#back-to-az').parent().show();
                            
                            uonLightbox('#course-results .popup-link');
    
                        } else {
    
                            $('<tr><td class="title">Sorry, no results found.</td><td class="promo-icon"></td></tr>').appendTo( "#degree-search-results tbody" );
                            $('#degree-search-submit .fa').toggleClass('fa-search fa-spin fa-circle-o-notch');
                            $('#degree-search-results #search-loading').remove();
                            $('#degree-search-results #undergraduate-results').show();
                            $('#degree-search-results #postgraduate-results').show();
                            $('#degree-search-results #research-results').show();
                            $('#degree-search-results #course-results').show();
                            $('#degree-search-results > .clearfix').show();
                            $('#back-to-az').parent().show();
    
                        }
    
                    },
                    error: function(e) {
                        console.log(e.message);
                    }
                });

            }

        });



        /******************************/
        /**  Degree listing filters  **/
        /******************************/

        function filtron_degrees() {

            $('.handbook-degree-listing').show();
            $('.handbook-degree-listing tbody tr.hidethis').show(0,function(){
                $(this).removeClass('hidethis');
            });

            var total_degrees = $('.handbook-degree-listing tbody tr').length;
            var filters = [];
            var filter_array = ['promotion','level','intake','location','faculty','discipline','type'];

            for(x in filter_array) {
                filters[filter_array[x]] = $('#handbook-filters input[name="filter-'+filter_array[x]+'"]:checked').map(function(_, el) { return '.'+$(el).val(); }).get();
                if(filters[filter_array[x]].length > 0) {
                    $('.handbook-degree-listing tbody tr:not('+filters[filter_array[x]].join(',')+')').addClass('hidethis');
                }
            }

            $('.handbook-alert').hide().removeClass('show-alert').removeClass('first');

            for(x in filter_array) {
                for(y in filters[filter_array[x]]) {
                    if( $('.alert-'+filters[filter_array[x]][y].substr(1)).length > 0 ) {
                        $('.alert-'+filters[filter_array[x]][y].substr(1)).show().addClass('show-alert');
                    }
                }
            }

            if($('input[name="filter-atar"]:checked').length > 0) {
                $('.filter-category .atar-label').text('Select your ATAR below');
                $('.alert-has_atar').show().addClass('show-alert');
            } else {
                $('.filter-category .atar-label').text('Filter by ATAR');
            }

            if($('.show-alert').length > 0) {
                $('#handbook-alert').show();
            } else {
                $('#handbook-alert').hide();
            }
            $('#handbook-alert .show-alert:first').addClass('first');

            if($('#handbook-filters input[name="filter-atar"]:checked').length == 1) {
                var current_atar = $('#atar-range').val();
                $('.handbook-degree-listing tbody tr.has_atar').filter(function() {
                    if(parseFloat($(this).attr('data-atar')) >= parseFloat(current_atar)+0.01 || $(this).attr('data-atar') == '0') {
                        $(this).addClass('hidethis');
                    }
                    return true;
                });
            }

            if($('#handbook-filters input[value="level_research"]:checked').length == 0) {
                $('.handbook-degree-listing tr.level_research').addClass('hidethis');
            }

            $('.handbook-degree-listing tbody tr.hidethis').hide();

            var hidden_degrees = $('.handbook-degree-listing tbody tr.hidethis').length;

            $('.handbook-degree-listing tbody').each(function(){
                var group_rows = $(this).find('tr').length;
                var hidden_rows = $(this).find('tr.hidethis').length;
                if(hidden_rows == group_rows) {
                    $(this).parent().hide();
                }
            });

            filtron_degrees_counts();

            if($(window).scrollTop() > $('.handbook-degree-listing:visible').last().offset().top) {
                $.scrollTo($('#uon-body').offset().top-100,500);
            }

            var selected_filters = $('#handbook-filters input:checked').map(function(_, el) { return $(el).val(); }).get().join(',');

            if(selected_filters != '') {
                window.location.hash = 'filter='+selected_filters;
            } else {
                removeHash();
            }

            $('#handbook-filters legend .fa-circle-o-notch').fadeOut(function(){
                $(this).remove();
            });

        }

        // http://stackoverflow.com/questions/1397329/how-to-remove-the-hash-from-window-location-with-javascript-without-page-refresh
        function removeHash () { 
            var scrollV, scrollH, loc = window.location;
            if ("pushState" in history) {
                history.pushState("", document.title, loc.pathname + loc.search);
            } else {
                // Prevent scrolling by storing the page's current scroll offset
                scrollV = document.body.scrollTop;
                scrollH = document.body.scrollLeft;

                loc.hash = "";

                // Restore the scroll offset, should be flicker free
                document.body.scrollTop = scrollV;
                document.body.scrollLeft = scrollH;
            }
        }


        /*******************************************/
        /**  Update counts for the degree filter  **/
        /*******************************************/

        function filtron_degrees_counts() {

            $('#handbook-filters input[type="checkbox"]').each(function(){
                var count = $('.handbook-degree-listing tbody tr.'+$(this).val()+':not(.hidethis)').length;
                var c = $(this).siblings('.count');
                c.text(count);
                if($(this).attr('name') !== "filter-atar") {
                    if(count > 0) {
                        $(this).parent().animate({opacity:1});
                        c.show();
                    } else {
                        $(this).parent().animate({opacity:0.5});
                        c.hide();
                    }
                }
            });


            $('#filter-anchors li a').each(function(){
                var table = $('table'+$(this).attr('href')+'.handbook-degree-listing');

                if(table.length > 0) {

                    var group_rows = table.find('tbody tr').length;
                    var hidden_rows = table.find('tbody tr.hidethis').length;

                    if(hidden_rows == group_rows) {
                        $('#filter-anchors li a[href="'+$(this).attr('href')+'"]').addClass('inactive');
                    } else {
                        $('#filter-anchors li a[href="'+$(this).attr('href')+'"]').removeClass('inactive');
                    }

                } else {
                    $('#filter-anchors li a[href="'+$(this).attr('href')+'"]').addClass('inactive');
                }

            });

            if($('table.handbook-degree-listing tbody tr').length == $('table.handbook-degree-listing tbody tr.hidethis').length) {
                $('#handbook-no-results').show();
            } else {
                $('#handbook-no-results').hide();
            }

        }


        /*************************************************/
        /**  Only run these on the main degree listing  **/
        /*************************************************/
        if($('#handbook-filters').length > 0) {

            // Hide research degrees on initial load.
            $('.handbook-degree-listing tr.level_research').hide().addClass('hidethis');

            // Collapse groups that only had research degrees on initial load
            var hidden_degrees = $('.handbook-degree-listing tbody tr.hidethis').length;

            $('.handbook-degree-listing tbody').each(function(){
                var group_rows = $(this).find('tr').length;
                var hidden_rows = $(this).find('tr.hidethis').length;
                if(hidden_rows == group_rows) {
                    $(this).parent().hide();
                }
            });

            /*************************************************/
            /**  Set filters that have been passed via URL  **/
            /*************************************************/

            if(window.location.hash.indexOf('filter=') !== -1) {
                $(window.location.hash.substr(window.location.hash.indexOf('filter=')+7).split(',')).each(function(i,e){
                    $('#handbook-filters input[value="'+e+'"][type="checkbox"]').attr('checked','checked');
                    
                    if(e == 'has_atar') {
                        $('#atar-selector, input[name="filter-atar"] + .count').toggle();
                        $('#atar-range').trigger('input').trigger('change');
                    }
                });
                filtron_degrees();
            }

            if(window.location.search.indexOf('q=') !== -1) {
                $('#degree-search-field').val(decodeURI(window.location.search.substr(window.location.search.indexOf('q=')+2)));
                $('#degree-search-submit').trigger('click');
            }

            /*******************************************/
            /** Click event for each filter checkbox  **/
            /*******************************************/

            $('#handbook-filters input[type="checkbox"]').on('click',function(){

                if($(this).attr('name') == 'filter-atar') {
                    $('#atar-selector, input[name="filter-atar"] + .count').toggle();
                    $('#atar-range').trigger('input').trigger('change');
                }

                $(this).parent().parent().parent().prev('legend').append('<span class="fa fa-circle-o-notch fa-spin"></span>');
                setTimeout(function() { filtron_degrees(); },100);
                // filtron_degrees();

            });


            /******************************************/
            /** Update filter counts on initial load **/
            /******************************************/

            filtron_degrees_counts();


            /***********************************************************/
            /**  ATAR Filter - retrive JSON feed of ATAR information  **/
            /***********************************************************/

            $.getJSON('/__data/assets/js_file/0003/262605/uon-atars.js',function(data){

                var atar_list = new Array();
                var avg_atar = 75;

                $('.handbook-degree-listing tbody tr').each(function(){
                    if(data[$(this).data('degreeid')] != '' && data[$(this).data('degreeid')] != 0 && data[$(this).data('degreeid')] != undefined) {
                        var a = jQuery.parseJSON(data[$(this).data('degreeid')]);
                        var atars = new Array();
                        if((a.CALLA || a.CCSTC) && $(this).find('td.new-degree').length > 0) {
                            $(this).append('<td class="degree-atar atar-calla"></td><td class="degree-atar atar-ccstc"></td>');
                            $(this).find('td.new-degree').remove();
                        }
                        if(a.CALLA) {
                            $(this).find('td.degree-atar.atar-calla').text(a.CALLA);
                            atars.push(parseFloat(a.CALLA))
                        } else {
                            $(this).find('td.degree-atar.atar-calla').html('<span class="empty">–</span>');
                        }
                        if(a.CCSTC) {
                            $(this).find('td.degree-atar.atar-ccstc').text(a.CCSTC);
                            atars.push(parseFloat(a.CCSTC))
                        } else {
                            $(this).find('td.degree-atar.atar-ccstc').html('<span class="empty">–</span>');
                        }
                        // console.log(atars,Math.max.apply(null,atars));
                        var maxAtar = Math.max.apply(null,atars);
                        if(!isNaN(maxAtar)) {
                            $(this).addClass('has_atar').attr('data-atar',maxAtar);
                        } else {
                            $(this).addClass('has_atar').attr('data-atar',0);
                        }
                    } else if($(this).hasClass('level_enabling')) {
                        $(this).addClass('has_atar').attr('data-atar',60);
                    } else {
                        $(this).find('td.degree-atar').html('<span class="empty">–</span>');
                        $(this).addClass('has_atar').attr('data-atar',0);
                    }
                });

                for(d in data) {
                    if(data[d] != '') {
                        atar_list.push(data[d]);
                    }
                }

                var sum_atar = atar_list.reduce(function(a, b) { return a + b; });
                avg_atar = sum_atar / atar_list.length;
                $('#atar-selected').text(Math.round(avg_atar,1));
                $('#atar-range').attr('value',Math.round(avg_atar,1));

            });


            /***********************************************************************************************************/
            /**  Update value bubble as slider is adjusted (input), and run filters once slide stops moving (change)  **/
            /***********************************************************************************************************/

            $('#atar-range').on('input',function(){

                // Cache this for efficiency
                el = $(this);
                m = $('#atar-min');

                // Measure width of range input
                width = el.width()-20;
                m_width = m.outerWidth();

                // Figure out placement percentage between left and right of input
                newPoint = (el.val() - el.attr("min")) / (el.attr("max") - el.attr("min"));
                newPlace = (width * newPoint) + m_width + 30; // + 10;

                // Move bubble
                $("#atar-selected").css({
                    left: newPlace
                }).text(el.val());

                $('#message-atar').text(el.val());

            }).on('change',function(){

                if($('#handbook-filters input[name="filter-atar"]:checked').length == 1) {
                    // $(this).parent().parent().parent().prev('legend').append('<span class="fa fa-circle-o-notch fa-spin"></span>');
                    // setTimeout(function() { filtron_degrees(); },100);
                    filtron_degrees();
                }

            }).trigger('input');


        } /**  end of things to run on main degree listing  **/


    });
})(jQuery);


/****************************************************/
/**  Check if geo location point is within radius  **/
/****************************************************/

function radiusCheck(user_latitude,user_longitude,current_latitude,current_longitude,distance) {
    return Math.pow(user_latitude - current_latitude,2) + Math.pow(user_longitude - current_longitude,2) < Math.pow(distance,2);
}


/***************************************************************************/
/**  Set location/campus and region (aus/int) based on users geolocation  **/
/***************************************************************************/

function getGeoDegreeLocationRegion() {

    var loc = '';
    var reg = '';

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            // Bounding box around Australia for domestic/international detection.
            var lat_north = -10.683333; // Cape York, Qld
            var lat_south = -43.633333; // South East Cape, Tas
            var lon_west = 113.15; // Steep Point, WA
            var lon_east = 153.633333; // Cape Byron, NSW

            // Location of Callaghan Campus
            var callaghan_lat = -32.8923682;
            var callaghan_lon = 151.7042735;
            var callaghan_distance = 1;

            // Location of Central Coast Campus
            var centralcoast_lat = -33.3576431;
            var centralcoast_lon = 151.3778688;
            var centralcoast_distance = 0.5;

            // Location of Port Macquarie Campus
            var portmac_lat = -31.4405226;
            var portmac_lon = 152.8903119;
            var portmac_distance = 0.5;

            // User location - returned by browser api
            var user_latitude = position.coords.latitude;
            var user_longitude = position.coords.longitude;

            if(user_latitude > lat_south && user_latitude < lat_north && user_longitude > lon_west && user_longitude < lon_east) {

                reg = 'australian';

                if( radiusCheck(user_latitude,user_longitude,callaghan_lat,callaghan_lon,callaghan_distance) ) {
                    loc = 'newcastle';
                } else if( radiusCheck(user_latitude,user_longitude,centralcoast_lat,centralcoast_lon,centralcoast_distance) ) {
                    loc = 'central-coast';
                } else if( radiusCheck(user_latitude,user_longitude,portmac_lat,portmac_lon,portmac_distance) ) {
                    loc = 'port-macquarie';
                } else {
                    loc = 'newcastle';
                }

            } else {
                reg = 'international';
                loc = 'newcastle';
            }

            if($('.fast-fact-toggle a[href="#'+loc+'"]').length > 0) {
                $('.fast-fact-toggle a[href="#'+loc+'"]').click();
            }
            if($('.region-toggle a[href="#'+reg+'"]').length > 0) {
                $('.region-toggle a[href="#'+reg+'"]').click();
            }

        });

    }

}
