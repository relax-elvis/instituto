function doScrolling(elementY, duration) { 
  var startingY = window.pageYOffset;
  var diff = elementY - startingY;
  var start;

  // Bootstrap our animation - it will get called right before next frame shall be rendered.
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    // Elapsed milliseconds since start of scrolling.
    var time = timestamp - start;
    // Get percent of completion in range [0, 1].
    var percent = Math.min(time / duration, 1);

    window.scrollTo(0, startingY + diff * percent);

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  })
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var id = this.getAttribute('href');
        var pos = document.querySelector(id).offsetTop;
        if(id == '#btn-solicitar') {
        	var parentOffset = document.querySelector('#casos-exito').offsetTop;
        	pos = pos + parentOffset;
        }
        doScrolling(pos, 600);
        console.log('click');
        document.querySelector('#apartados').checked = false;
        //scrollToTop(1000);
        // document.querySelector(this.getAttribute('href')).scrollIntoView({
        //     behavior: 'smooth'
        // });
    });
});

var navMapPage = document.querySelector('.in-nav-map-page-g');
var link = navMapPage.querySelectorAll('a.nav-link');
var idElement = {};
var topPost = [];
link.forEach(function (item) {
	var href = item.getAttribute('href');
	var id = document.querySelector(href);
	var obj = href.substring(1);
	if(id == null) {
		return;
	} else {
		var pos = id.offsetTop;
		//topPost.push(pos);
		idElement[obj] = pos;
	}
});
console.log(idElement);
var el = 0;
var mapPageAllA = document.querySelectorAll('.in-nav-map-page-g a');
window.addEventListener('scroll', function() {
	for(var item in idElement) {
		if(this.pageYOffset >= idElement[item] && idElement[item] > el) {
			el = idElement[item];
			mapPageAllA.forEach(function(item) {
				item.classList.remove('active');
			});
			document.querySelector('.in-nav-map-page-g a[href="#' + item + '"]').classList.add('active');
			console.log(item);
			//document.querySelector('.in-nav-map-page-g a[href=#' + item + ']').classList.add('active');
		}

		if(this.pageYOffset <= idElement[item] && idElement[item] < el) {
			el = idElement[item];
			mapPageAllA.forEach(function(item) {
				item.classList.remove('active');
			});
			document.querySelector('.in-nav-map-page-g a[href="#' + item + '"]').classList.add('active');
			console.log(item);
			//document.querySelector('.in-nav-map-page-g a[href=#' + item + ']').classList.add('active');
		}
	}
	// for(var i = 0; i < topPost.length; i++) {
	// 	var item = topPost[i];
	// 	if(this.pageYOffset >= topPost[i]) {
	// 		console.log(topPost[i]);
	// 	}
	// }
});