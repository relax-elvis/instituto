// Custom JS
function changeLogoToBlack() {
	var logotypeBlack = document.querySelector('.header img[data-fixed-head]');
	var logotypeSrc = document.querySelector('.header img[data-fixed-head]').getAttribute('data-src');
	var logotypeBlackAttr = document.querySelector('.header img[data-fixed-head]').getAttribute('data-fixed-head');
	logotypeBlack.src = logotypeBlackAttr;
}
function changeLogoToWhite() {
	var logotypeBlack = document.querySelector('.header img[data-fixed-head]');
	var logotypeSrc = document.querySelector('.header img[data-fixed-head]').getAttribute('data-src');
	logotypeBlack.src = logotypeSrc;
}

function createButtonScrollTop() {
	var div = document.createElement('div');
	div.classList.add('top-scroll');
	document.body.appendChild(div);
}
createButtonScrollTop();

var last_scroll_top = 0;

window.addEventListener('scroll', function(e) {

	var top_display = 100;

	var scroll_top = this.scrollY;
	if ((scroll_top > last_scroll_top) && (scroll_top > top_display)) {
		//downscroll code
		document.querySelector('.top-scroll').classList.remove('show');
	} else {
		document.querySelector('.top-scroll').classList.add('show');
		if(scroll_top <= 0) {
			document.querySelector('.top-scroll').classList.remove('show');
		} 
	}

	last_scroll_top = scroll_top;

});

// top-scroll button
function scrollToTop(duration) {
    // cancel if already on top
    if (document.scrollingElement.scrollTop === 0) return;

    const totalScrollDistance = document.scrollingElement.scrollTop;
    let scrollY = totalScrollDistance, oldTimestamp = null;

    function step (newTimestamp) {
        if (oldTimestamp !== null) {
            // if duration is 0 scrollY will be -Infinity
            scrollY -= totalScrollDistance * (newTimestamp - oldTimestamp) / duration;
            if (scrollY <= 0) return document.scrollingElement.scrollTop = 0;
            document.scrollingElement.scrollTop = scrollY;
        }
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}
var topScroll = document.querySelector('.top-scroll');
topScroll.addEventListener('click', function() {
	scrollToTop(1000);
});
// /top-scroll button

if(window.outerWidth > 991) {
	var navigationPage = document.querySelector('.in-nav-map-page-g');
	if(navigationPage !== null) {
		window.addEventListener('scroll', function() {
			if(pageYOffset >= (navigationPage.offsetTop + navigationPage.height)) {
				navigationPage.classList.add('fix');
			} else {
				navigationPage.classList.remove('fix');
			}
		});
	} else {
		var header = document.querySelector('.header');
		var logotypeBlack = document.querySelector('.header img[data-fixed-head]');
		var logotypeSrc = document.querySelector('.header img[data-fixed-head]').getAttribute('data-src');
		var logotypeBlackAttr = document.querySelector('.header img[data-fixed-head]').getAttribute('data-fixed-head');


		window.addEventListener('scroll', function() {
			if(pageYOffset >= header.offsetHeight) {
				document.body.style.paddingTop = header.offsetHeight + 'px';
				header.classList.add('fix');
				logotypeBlack.src = logotypeBlackAttr;
			} else {
				document.body.style.paddingTop = '0';
				header.classList.remove('fix');
				logotypeBlack.src = logotypeSrc;
			}
		});
		///
	}
	// on table and mobile 
		
		// function f_scroll() {

		//    last_scroll_top = 0;
		//    top_display = 100;

		//    $(window).off('scroll')
		//    $(window).on('scroll', function(){

		// 	   var scroll_top = $(this).scrollTop();

		// 	   if ((scroll_top > last_scroll_top) && (scroll_top >top_display)) {
		// 		   //downscroll code
		// 		   $('.js-header').addClass('has-transform-header');
		// 		   $('.js-footer').addClass('has-transform-footer');
		// 	   } else {
		// 		   $('.js-header').removeClass('has-transform-header');
		// 		   $('.js-footer').removeClass('has-transform-footer');
		// 	   }

		// 	   last_scroll_top = scroll_top;
		//    });

		//    actions botons message and call 

		   
		//    var $window = $(window);
		//    var maxWidth = 600; /* <--- Custom size here*/

		//    $window.on('scroll resize', function(){

		// 	   if ($(window).width() <= maxWidth) {  
		// 		   $('.js-input-focus').on('focusin', function() {
		// 			   $('.js-header').addClass('has-transform-header');
		// 			   $('.js-footer').addClass('has-transform-footer');
		// 		   });

		// 		   $('.js-input-focus').on('focusout', function(){
		// 			   $('.js-header').removeClass('has-transform-header');
		// 			   $('.js-footer').removeClass('has-transform-footer');
		// 		   });


		// 	   }   

		//    });

		// }
		// f_scroll();
	///

	
}
if(window.innerWidth < 991) {
	var headerMenu = document.querySelector('.header .mobile-block .menu-active');
	var navMapPage = document.querySelector('.in-nav-map-page-g');
	var navMapPagePositionTop = navMapPage == null ? false : navMapPage.offsetTop;

	var head = document.querySelector('.header');
	headerMenu.addEventListener('change', function() {
		head.classList.add('h-100');
		document.querySelector('body').style.overflow = 'hidden';
	});
	var headerClose = document.querySelector('.header .mobile-block .menu-close');
	headerClose.addEventListener('change', function() {
		head.classList.remove('h-100');
		document.querySelector('body').style.overflow = 'auto';
	});

	var header = document.querySelector('.header');

	var last_scroll_top_h = 0;
	var formBtn = document.querySelector('.in-form-g');
	var formBtnY = formBtn == null ? formBtn = 0 : formBtn.offsetTop;
	var btnFix = document.querySelector('.mobile-block.fixed');

	window.addEventListener('scroll', function(e) {
		if(formBtnY !== 0) {
			if(this.scrollY >= formBtnY) {
				console.log('1 hello');
				btnFix.style.transform = 'translateY(100%)';
			} else {
				btnFix.style.transform = 'translateY(0)';
			}
		}

		var top_display = 100;

		var scroll_top = this.scrollY;

		if(navMapPage !== null) {
			if(scroll_top <= navMapPagePositionTop) {
				navMapPage.classList.remove('transform-map-page');
				navMapPage.style.top = 0;
			} else {
				navMapPage.classList.add('transform-map-page');
				navMapPage.style.top = header.offsetHeight + 'px';
			}
		}
		if (scroll_top > last_scroll_top_h && scroll_top > top_display) {
			//downscroll code
			console.log('down');
			header.classList.remove('transform-header');
			if(navMapPage !== null) navMapPage.style.top = 0;
		} else {
			console.log('1 top');
			if(scroll_top <= 0) {
				header.classList.remove('transform-header');
				changeLogoToWhite();
			} else {
				header.classList.add('transform-header');
				changeLogoToBlack();
			}
		}

		last_scroll_top_h = scroll_top;

	});

}