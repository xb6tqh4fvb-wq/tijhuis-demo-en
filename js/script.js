$(document).ready(function(){
	$('i.loader').fadeOut(300);
	$(window).trigger('resize');
	
	$('.subscribe_widget').each(function(){
		var $t=$(this);
		$t.find('a.trigger').on('click',function(e){
			e.preventDefault();
			$t.toggleClass('active');
		})
	});
	
	if($('#subscribeWrapper').length){
		$('.subscribe_widget').hide().find('.fw_form_wrapper').appendTo('#subscribeWrapper .item');
	}
	
	$('#archiveWrapper .item').append($('div.news_archive'));
	
	var t_h=0;
	$('#archiveWrapper .archive_item .archive_text').each(function(){
		t_h=Math.max(t_h,$(this).height());
	});
	$('#archiveWrapper .list').css('minHeight',t_h);
	$('#archiveWrapper .archive_item .trigger').on('click',function(e){
		e.preventDefault();
		$('#archiveWrapper .trigger.active').removeClass('active');
		$(this).addClass('active');
		$('#archiveWrapper .list').html($(this).closest('.archive_item').find('.archive_text').html());
	});
	
	$('.fw_file_upload_iframe').fileUploadHandler();
	
	$('a.menu_trigger').click(function(e){
		e.preventDefault();
		$('body').toggleClass('mobile_menu_active');
	});
	
	$('.mobile_menu li.fw_subs').append('<i class="subs_trigger"></i>')
	$('.mobile_menu .subs_trigger').click(function(e){
		e.preventDefault();
		var $li=$(this).closest('li');
		if($li.hasClass('subs_open')){
			$li.removeClass('subs_open').find('.fw_subs_wrapper:first').slideUp(300);
		}else{
			$li.addClass('subs_open').find('.fw_subs_wrapper:first').slideDown(300);
		}
	});
	
	$('.items_list .item .img').each(function(){
		if(!$(this).find('img').length) $(this).remove();
	});
	
	$('.content .video_bg').each(function(){
		if(!$(this).find('img').length) $(this).closest('.col').hide();
	});

	$('.cover:not(.c)').each(function(){
		var $t=$(this).addClass('c');
			$t.img=$t.find('img:first');

		$t.css('background-image','url('+$t.img[0].src+')').addClass('background_cover');
		/*
		$(window).resize(function(){
			$t.img.removeAttr('style');
			if($t.height()>$t.img.height()) $t.img.css({'width':'auto','height':'100%'});
			if($t.height()<$t.img.height()) $t.img.css('margin-top',Math.round(($t.height()-$t.img.height())/2));
			if($t.width()<$t.img.width()) $t.img.css('margin-left',Math.round(($t.width()-$t.img.width())/2));
		});
		$(window).load(function(){
			$t.img.removeAttr('style');
			if($t.height()>$t.img.height()) $t.img.css({'width':'auto','height':'100%'});
			if($t.height()<$t.img.height()) $t.img.css('margin-top',Math.round(($t.height()-$t.img.height())/2));
			if($t.width()<$t.img.width()) $t.img.css('margin-left',Math.round(($t.width()-$t.img.width())/2));
		});
		*/
	});
	
	$('.to_top_link a').click(function(e){
		e.preventDefault();
		$('html, body').animate({
			scrollTop:0
		},600);
	});
	
	$('.persons_list .item:last').addClass('last');
	
	$('.alt_text a.trigger').click(function(e){
		e.preventDefault();
		$(this).closest('.alt_text').toggleClass('active')
		//$(this).closest('.alt_text').find('.text_box').stop().slideToggle();
	});
	
	$('.back_link a').wrapInner('<span>');
	
	$('.news_slider .owl-carousel').owlCarousel({
		loop:true,
		nav:true,
		navText:['',''],
		dots:false,
		margin:0,
		//autoHeight:true,
		responsive:{
			0 : {
				items:1
			},
			768 : {
				items:2
			}
		},
		onInitialized :function(e){
			$(e.target).find('div.owl-item:has(div.fw_alt)').addClass('fw_alt');
		}
	});
	
	$('.header .search label').click(function(e){
		$(this).closest('.search').toggleClass('active');
	});
	$('.header .search').click(function(e){
		e.stopPropagation();
	});
	$('body').click(function(e){
		$('.header .search.active').removeClass('active');
	});
	
	$('body:has(.header_media:not(.small))').addClass('alt_header');

	if($('.header_media .royalSlider').length){
		$('.header_media .royalSlider .fw_rs_img:has(.slider_video)').each(function(){
			$(this).find('img').attr('data-rsVideo',$(this).find('.slider_video').text());
		});
		$('.header_media .royalSlider .fw_rs_img img').addClass('rsImg');
		$('.header_media .royalSlider').royalSlider({
			transitionType		: "slide",
			transitionSpeed 	: 600,
			slidesOrientation	: "horizontal",
			autoHeight			: false,
			arrowsNav			: true,
			arrowsNavAutoHide	: false,
			fadeinLoadedSlide	: false,
			globalCaption		: 0,
			loop				: true,
			loopRewind			: false,
			controlNavigation	: 'none',
			navigateByClick		: true,
			autoPlay			:
			{
				enabled			: true,
				delay			: 4000,
				pauseOnHover	: false
			},
			randomizeSlides		: false,
			imageScaleMode		: "fill",
			slidesSpacing		: 0,
			video               :
			{
				autoHideArrows	: false,
				youTubeCode		:'<iframe src="https://www.youtube.com/embed/%id%?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&autohide=1&mute=1&enablejsapi=1" allowfullscreen frameborder="no"></iframe>',
				vimeoCode		:'<iframe src="https://player.vimeo.com/video/%id%?background=1" frameborder="no" allowfullscreen></iframe>'
			},
			slideVideo: true
		});
		
		var slider = $('.header_media .royalSlider').data('royalSlider');
		
		slider.slides[0].holder.on('rsAfterContentSet', function() {
			//console.log('rsAfterContentSet')
		});
		
		slider.ev.on('rsAfterSlideChange', function() {
			if(typeof slider.currSlide.videoURL !== 'undefined' && $(window).width() >= 768){
				$(slider.currSlide.content).find('.rsPlayBtn').click()
				slider.stopAutoPlay();
			}
		});
		
		slider.ev.on('rsBeforeMove', function() {
			slider.stopVideo();
		});
		
		slider.ev.on('rsVideoStop', function() {
			//console.log('rsVideoStop');
			//slider.next();
			slider.startAutoPlay();
			//$('.rsBullets').removeClass('rsHidden');
		});
		
		slider.ev.on('rsVideoPlay', function() {
			$(slider.currSlide.content).find('iframe').wrap('<div class="iframe_wrapper"><div id="tv"></div></div>');
			$('.header_media .royalSlider').setVideoBackground();
		});
		
		if(typeof slider.currSlide.videoURL !== 'undefined'){
			$(slider.currSlide.content).find('.rsPlayBtn').click()
		}
	}
	
	function setVideos(){
		$('.video_link').each(function(){
			var $t=$(this);
			if($t.is(':contains(youtube)')){
			    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
			    var videoId = $t.text().match(regExp);
			    if (videoId && videoId[2].length == 11) {
			    	videoId=videoId[2];
					$t.html('<iframe src="https://www.youtube.com/embed/'+videoId+'?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&autohide=1&mute=1" allow="autoplay" frameborder="0" allowfullscreen></iframe>')
				}
			}else if($t.is(':contains(vimeo)')){
			    var regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
			    var videoId = $t.text().match(regExp);
				if (videoId){
					videoId=videoId[5];
					$t.html('<iframe src="https://player.vimeo.com/video/'+videoId+'?background=1" frameborder="0" allow="autoplay" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
				}
			}
		});
	}
	
	setVideos();

	if($('.video_bg:has(a[href*="youtu"])').length){
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		var vID=0;
		
		onYouTubeIframeAPIReady=function() {
			$('.video_bg:has(a[href*="youtu"])').each(function(){
				vID++;
				var $t=$(this);
				$t.append('<div class="video_box"><div class="b"><div id="player'+vID+'"></div></div></div>');
				var vid=parseVideo($t.find('a[href*="youtu"]').attr('href')).id;
				
				if(vid){
					if($t.hasClass('autoplay')){
						var player = new YT.Player('player'+vID, {
							videoId :vid,
							playerVars: {
								'autoplay': 1,
								'controls': 0,
								'loop':1,
								'disablekb':0,
								'playlist':vid,
								'rel':0
							},
							events: {
								'onStateChange':function(){
									$t.addClass('active')
								},
								'onReady':function(event){
									event.target.mute();
								}
							}
						});
					}else{
						var player = new YT.Player('player'+vID, {
							videoId :vid,
							events: {
								'onStateChange':function(){
									$t.addClass('active')
								}
							}
						});
					}
				}
			});
		}
	}
	if($('.video_bg:has(a[href*="vimeo"])').length){
		$.getScript('https://player.vimeo.com/api/player.js', function(){
			$('.video_bg:has(a[href*="vimeo"])').each(function(){
				var $t=$(this).addClass('vimeo');
					$t.lnk=$t.find('a[href*="vimeo"]');
				var vid=parseVideo($t.lnk.attr('href')).id;
				if($t.hasClass('autoplay')){
					$t.append('<div class="video_box"><div class="b"><iframe src="https://player.vimeo.com/video/'+vid+'?loop=1" frameborder="0" allow="autoplay" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div></div>')
				}else{
					$t.append('<div class="video_box"><div class="b"><iframe src="https://player.vimeo.com/video/'+vid+'" frameborder="0" allow="autoplay" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div></div>')
				}
				var iframe = $t.find('iframe')[0];
				
				var player = new Vimeo.Player(iframe);
				
				$t.lnk.on('click',function(e){
					e.preventDefault();
					$t.addClass('active');
					player.play();
				});

				if($t.hasClass('autoplay')){
					$t.addClass('active');
					player.play();
					player.setVolume(0);
				}
				
			});
		});		
	}
	
	
});

(function($) {
	if ($.rsProto != undefined) {
		$.extend($.rsProto, {
			_slideBackground: function() {
				var self = this;
				if (self.st.slideBackground) {
					self.ev.on('rsAfterInit', function() {
						for (var i = 0, $length = self.slides.length; i < $length; i++) {
							if (self.slides[i].image) {
								$(self.slides[i].content).find('.fw_rs_img').css('background-image', 'url(' + self.slides[i].image + ')');
							}
						};
					});
				}
			},
			_wrapElements: function() {
				var self = this;
				if (self.st.wrapElements) {
					self.ev.on('rsAfterInit', function() {
						for (var i = 0, $length = self.slides.length; i < $length; i++) {
							$(self.slides[i].content).find('.fw_rs_text').wrapInner('<div class="container"><div class="text"></div></div>');
						};
						//$(self._k5).wrapInner('<div class="wrapper" />');
					});
				}
			},
			_outsideArrows: function() {
				var self = this;
				if (self.st.outsideArrows) {
					self.ev.on('rsAfterInit', function() {
						/*for ( var i = 0, $length = self.slides.length; i < $length; i++) {
						if(self.slides[i].image){
						$(self.slides[i].content).find('.fw_rs_img').css('background-image', 'url('+self.slides[i].image+')');
						}
						};*/
						$(self.slider).find('.rsThumbsArrow').appendTo(self.slider);
					});
				}
			},
			_slideVideo: function() {
				var self = this;
				if (self.st.slideVideo) {
					self.ev.on('rsAfterInit', function() {
						//console.log($(self.currSlide.content).find('.rsPlayBtn'))
						//$(self.currSlide.content).find('.rsPlayBtn').click()
						/*	if($(self.currSlide.content).find('.rsPlayBtn').length){
						$(self.currSlide.content).find('.rsPlayBtn').click()
						}*/
						if (self.currSlide.videoURL != "" && $(window).width() >= 768) {
							setTimeout(function() {
								$(self.currSlide.content).find('.rsPlayBtn').click()
							}, 100);
							//setTimeout(function(){
							//$(slider.currSlide.content).find('iframe').wrap('<div class="iframe_wrapper"><div id="tv"></div></div>');
							//$t.setVideoBackground();
							//},300);
						}
					});
				}
			},
		});
		$.rsModules.slideBackground = $.rsProto._slideBackground;
		$.rsModules.wrapElements = $.rsProto._wrapElements;
		$.rsModules.outsideArrows = $.rsProto._outsideArrows;
		$.rsModules.slideVideo = $.rsProto._slideVideo;
	}
})(jQuery);

function parseVideo(url) {
	// - Supported YouTube URL formats:
	//   - http://www.youtube.com/watch?v=My2FRPA3Gf8
	//   - http://youtu.be/My2FRPA3Gf8
	//   - https://youtube.googleapis.com/v/My2FRPA3Gf8
	// - Supported Vimeo URL formats:
	//   - http://vimeo.com/25451551
	//   - http://player.vimeo.com/video/25451551
	// - Also supports relative URLs:
	//   - //player.vimeo.com/video/25451551

	url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

	if (RegExp.$3.indexOf('youtu') > -1) {
		var type = 'youtube';
	} else if (RegExp.$3.indexOf('vimeo') > -1) {
		var type = 'vimeo';
	}

	return {
		type: type,
		id: RegExp.$6
	};
};

jQuery.fn.setVideoBackground=function(){
	return $(this).each(function(){
		var $t = $(this);
			$t.video = $t.find('iframe');
			$t.videoFrame = $t.find('iframe')[0];
			$t.service = parseVideo($t.videoFrame.src);

		if ($t.service.type == 'youtube') {
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		
		} else if ($t.service.type == 'vimeo') {
			$.getScript( "https://player.vimeo.com/api/player.js", function( data, textStatus, jqxhr ) {
				var player = new Vimeo.Player($t.videoFrame);

				player.loadVideo($t.service.id).then(function(id) {
					player.setVolume(0);
					player.setLoop(false);
					player.play();
					//$('#tv').addClass('active');
				});
				
				player.on('ended', function(data) {
				    $('.header_media .royalSlider').data('royalSlider').next();
				});
			});
		}
	});
};

function onYouTubeIframeAPIReady(){
	var $id = parseVideo($('.header_media .royalSlider').find('iframe')[0].src).id;
	tv = new YT.Player("tv", {
		playerVars: {
			'autoplay': 1,
			'controls': 0,
			'autohide': 1,
			'wmode': 'opaque',
			'showinfo': 0,
			'loop': 0,
			'mute': 1/*,
			'playlist': $id*/
		},
		videoId: $id,
		events: {
			onReady: onPlayerReady,
			onStateChange: onPlayerStateChange
		}
	});
};

function onPlayerReady(e) {
	e.target.setVolume(0), 
	e.target.mute(),
	e.target.playVideo();
};

function onPlayerStateChange(e) {
	//console.log(e.data)
	if (1 == e.data) {
		$('#tv').addClass('active');
	} else if (e.data == YT.PlayerState.ENDED) {
		//alert(1);
		$('.header_media .royalSlider').data('royalSlider').next();
    }
};
$(window).load(function(){
	/*$('.eh_items').each(function(){
		new SetEqualHeights({
			root_selector: '.eh_items',
			height_nodes: ['.item']
		});
	});*/
	$('.items_list').each(function(){
		new SetEqualHeights({
			root_selector: '.items_list',
			height_nodes: ['.box']
		});
	});
	/*$('.detail_content').each(function(){
		new SetEqualHeights({
			root_selector: '.detail_content',
			height_nodes: ['.box']
		});
	});*/
	$('.double_content').each(function(){
		new SetEqualHeights({
			root_selector: '.double_content',
			height_nodes: ['.page_text']
		});
	});
	$('.locations_list').each(function(){
		new SetEqualHeights({
			root_selector: '.locations_list',
			height_nodes: ['.text']
		});
	});
	$('.double_form').each(function(){
		new SetEqualHeights({
			root_selector: '.double_form',
			height_nodes: ['h3']
		});
	});
	$('.persons_list .row').each(function(){
		new SetEqualHeights({
			root_selector: '.persons_list .row',
			height_nodes: ['.box']
		});
	});
});

$(window).scroll(function(){
	if($(window).scrollTop()>150){
		$('body').addClass('scrolled');
	}else{
		$('body').removeClass('scrolled');
	}
});

$(window).ajaxComplete(function(){
	$('.fw_file_upload_iframe').fileUploadHandler();
});

jQuery.fn.fileUploadHandler=function(){
	return $(this).each(function(){
		var $t = $(this);

			$t.field = $t.find('input[type="file"]');
			$t.label = $t.find('.fw_input');
			$t.btn = $t.find('.fw_button span');
			
		$t.btn.text('upload file');

		$t.field.on('change', function(e){
			$t.label.text(e.target.files[0].name);
			$t.btn.text('change file');
		});
	});
}