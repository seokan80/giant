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
			document.querySelector('html').classList.remove('is-desktop');
			document.querySelector('html').classList.add('is-mobile');
		}else{
			document.querySelector('html').classList.remove('is-mobile');
			document.querySelector('html').classList.add('is-desktop');
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
		document.querySelector('html').setAttribute('width',this.bodyWidth);
		document.querySelector('html').setAttribute('height',this.bodyHeight);
	},
};

var Main = {
	init : function(){
		Main.swiper();
	},
	swiper: function(){
		const mainSwiper = new Swiper('.main-swiper .swiper-container', {
			autoplay: {
				delay: 5000,
			},
            loop: true,
            effect: 'fade',
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                init: function(){
                    document.querySelector('.swiper-slide-active').classList.add('on');
                },
                slideChangeTransitionStart: function(){
                    var slides = document.querySelectorAll('.swiper-slide');
                    for (var i = 0 ; i < slides.length; i++) {
                        slides[i].classList.remove('on');
                    }
                    document.querySelector('.swiper-slide-active').classList.add('on');
                }
            }
        });
	}
};

var Common = {
	init : function(){
		Common.revealed();
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
};

var Header = {
	init : function(){
		Header.scrolling();
		Header.gnb();
		Header.menu();
		window.addEventListener('mousewheel', Header.scrolling);
		window.addEventListener('touchmove', Header.scrolling);
		$(window).scroll(function(){
			Header.scrolling();
		});
	},
	scrolling : function(e){
		var scrollTop = $(window).scrollTop();

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
	menu : function(){
		$('[data-id=btn-hamburger]').on('click',function(e){
			e.preventDefault();
			$('html').toggleClass('open-mobile-menu');
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