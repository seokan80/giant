var Init = {
	defaults : function(){
		var bodyHeight = 0;
		var bodyWidth = 0;
		var breakpoint;
		this.resize();
		window.addEventListener("resize", this.resize);
	},
	resize : function(){
		Init.getBrowserSize();
		Init.drawBreakPoint();

		Init.breakpoint = window.matchMedia('(min-width:992px)').matches;
		if(!Init.breakpoint){
			$('html').removeClass('is-desktop');
			$('html').addClass('is-mobile');
		}else{
			$('html').removeClass('is-mobile');
			$('html').addClass('is-desktop');
		}
	},
	getBrowserSize : function(){
		this.bodyHeight = Math.max(
			document.body.scrollHeight,
			document.body.offsetHeight,
			document.documentElement.clientHeight,
			document.documentElement.scrollHeight,
			document.documentElement.offsetHeight
		);
		this.bodyWidth = Math.max(
			document.body.scrollWidth,
			document.body.offsetWidth,
			document.documentElement.clientWidth,
			document.documentElement.scrollWidth,
			document.documentElement.offsetWidth
		);
	},
	drawBreakPoint : function(){
		$('html').attr('data-width',this.bodyWidth);
		$('html').attr('data-height',this.bodyHeight);
	},
};

var Main = {
	init : function(){

	},
};

var Common = {
	init : function(){
		Common.dropdown();
		Common.revealed();
		Common.common();
	},
	grid : function(){


	},
	revealed : function(){
		$('[data-event="revealed"]').each(function (i) {
			if ($(window).scrollTop() + $(window).height() > $(this).offset().top + $(this).outerHeight()) {
				$(this).addClass('in');
			}
		});
		$(window).scroll(function () {
			$('[data-event="revealed"]').each(function (i) {
				if (($(window).scrollTop() + $(window).height()) - ($(window).height() / 3) > $(this).offset().top) {
					$(this).addClass('in');
				}
			});
		});
	},
	dropdown : function(){
		$('.dropdown-custom .selected').on('click',function(e){
			e.preventDefault();
			$(this).closest('.dropdown-custom').toggleClass('active');
		});
		$(document).click(function(e) {
			if(!$('.dropdown-custom').has(e.target).length){
				$(".dropdown-custom.active").removeClass('active');
			}
		});
	},
	common : function(){
		$('[data-event="datepicker"]').datepicker();
	}
};

var Header = {
	init : function(){
		Header.scrolling();
		Header.gnb();
		Header.nav();
		Header.menu();
		Header.search();
		window.addEventListener('mousewheel', Header.scrolling);
		window.addEventListener('touchmove', Header.scrolling);
		$(window).scroll(function(){
			Header.scrolling();
		});
	},
	scrolling : function(e){
		var scrollTop = $(window).scrollTop();
		var gnbTop = $('#header').height();
		gnbTop = Number(gnbTop);

		if(scrollTop > 0){
			$('html').addClass('is-scrolled');
		}else{
			$('html').removeClass('is-scrolled');
		}
	},
	gnb : function(){
		var url = window.location.pathname;
		var $active = $('.gnb a[href="'+url+'"]');
		$active.parent().addClass('active');
		$active.parent().parents('li').addClass('active');

		var $ingDep2 = $('.dep1 > li.active');
		$('.dep1 > li > a').on('mouseenter',function(){
			$(this).parent('li').siblings().removeClass('hover');
			$(this).parent('li').siblings().removeClass('active');
			$(this).parent('li').addClass('hover');
			if($(this).next('ul').length > 0){
				$('html').addClass('open-gnb-dep2');
			}else{
				$('html').removeClass('open-gnb-dep2');
			}
		});
		$('.gnb').on('mouseleave',function(){
			$('html').removeClass('open-gnb-dep2');
			$('.dep1 > li').removeClass('hover');
			$ingDep2.addClass('active');
		});
		if($('.dep2 > li.active').length > 0){
			$('html').addClass('has-dep2');
		}
	},
	nav : function(){
		var nav = $('#nav');
		var _isNavOpen = false;

		$('#nav .focus').on('click', function(e) {
			e.preventDefault();
			_isNavOpen = true;
			if($(this).hasClass('active')){
				$('#nav .focus').removeClass('active');
			}else{
				$('#nav .focus').removeClass('active');
				$(this).addClass('active');
			}
		});

		$(document).on('click', function(e) {
			if(_isNavOpen){
				if(!$(e.target).is('#nav a') && $(e.target).parents('#nav a').length === 0){
					$('#nav .focus').removeClass('active');
				}
			}
		});
	},
	search : function(){
		$('[data-id=btn-search]').on('click',function(e){
			e.preventDefault();
			$('html').toggleClass('open-mobile-search');
			$('.h-search input[type=text]').focus();
		});
	},
	menu : function(){
		$('[data-id=btn-hamburger]').on('click',function(e){
			e.preventDefault();
			if($('html').hasClass('open-mobile-search')){
				$('html').removeClass('open-mobile-search');
			}else{
				$('html').toggleClass('open-mobile-menu');
			}
		});
		$('.mobile-header-group').click(function(e) {
			if(!$('.h-search').has(e.target).length){
				$('html').removeClass('open-mobile-search');
			}
		});
	}
};

$(function() {
	Init.defaults();
	Main.init();
	Common.init();
	Header.init();
});