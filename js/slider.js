var position = 0;
var slidesToShow = 1;
var slidesToScroll = 1;
var container = document.querySelector('.carousel');
var track = document.querySelector('.carousel__viewport');
var btnPrev = document.querySelector('.carousel__prev');
var btnNext = document.querySelector('.carousel__next');
var items = document.querySelectorAll('.carousel__slide')
var itemsCount = items.length;
var itemWidth = container.clientWidth / slidesToShow;
var movePosition = slidesToScroll * itemWidth;

items.forEach((item,i) => {
    item.style.minWidth = `${itemWidth}px`;
});


var swiptePos = 1;
var swiptePosDots = swiptePos;

if(window.outerWidth <= 991) {
    document.querySelector('.carousel__prev').remove();
    document.querySelector('.carousel__next').remove();
    var list = document.querySelector('.carousel');
    var containerDots = document.createElement('ul');
    containerDots.classList.add('dots');
    for(var i = 0; i < itemsCount; i++) {
        var dotsLi = document.createElement('li');
        var dotsA = document.createElement('a');
        dotsA.setAttribute('item-slide', i+1);
        dotsLi.appendChild(dotsA);
        containerDots.appendChild(dotsLi);
        list.appendChild(containerDots);
    }
    containerDots.querySelector('li:first-child').classList.add('active');

    var positionDot = 0;
    var setPositions = () => {
        track.style.transform = `translateX(${positionDot}px)`
    }
    containerDots.querySelectorAll('li').forEach(function (item) {
        item.addEventListener('click', function() {
            containerDots.querySelectorAll('li').forEach(function(item) {
                item.classList.remove('active');
            });
            this.classList.add('active');
            positionDot = this.querySelector('a').getAttribute('item-slide');

            

            //var itemsLeft = itemsCount - (Math.abs(positionDot) + slidesToShow * itemWidth) / itemWidth;
            //console.log(this.querySelector('a').getAttribute('item-slide'));
            //positionDot = itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
            positionDot -= (positionDot-1) * movePosition;
            setPositions();

            swiptePos = parseInt(this.querySelector('a').getAttribute('item-slide'));
            swiptePosDots = parseInt(this.querySelector('a').getAttribute('item-slide'));
            return swiptePos, swiptePosDots;
        })
    });
}

function bNext() {
        console.log('next', swiptePos);
        swiptePos = swiptePos == 0 ? swiptePos = 1 : swiptePos - 1;
        if(swiptePos == 0) {
            swiptePos = 1;
            return false;
        } else {
            var itemsLeft = Math.abs(position) / itemWidth;
            position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
            setPosition()
            checkBtns()
            document.querySelectorAll('.dots li').forEach(function(item) {
                item.classList.remove('active');
            });
            document.querySelector('.dots li:nth-child('+swiptePos+')').classList.add('active');  
        }
}
function bPrev() {
    console.log('prev', swiptePos);
    if(swiptePos == itemsCount) {
        return false;
    } else {
        swiptePos = swiptePos == 0 ? swiptePos = 1 : swiptePos + 1;

        var itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
        position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
        setPosition()
        checkBtns()
        document.querySelectorAll('.dots li').forEach(function(item) {
            item.classList.remove('active');
        });
        document.querySelector('.dots li:nth-child('+swiptePos+')').classList.add('active');
    }
}
    
btnNext.addEventListener('click',() => {
    bPrev();
})
btnPrev.addEventListener('click',() => {
    bNext();
});
var setPosition = () => {
    track.style.transform = `translateX(${position}px)`
}
var checkBtns = () => {
    btnPrev.disabled = position === 0
    btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth
}

checkBtns();


window.onload = function() {
    (function(d) {
        var
            ce = function(e, n) {
                var a = document.createEvent("CustomEvent");
                a.initCustomEvent(n, true, true, e.target);
                e.target.dispatchEvent(a);
                a = null;
                return false
            },
            nm = true,
            sp = {
                x: 0,
                y: 0
            },
            ep = {
                x: 0,
                y: 0
            },
            touch = {
                touchstart: function(e) {
                    sp = {
                        x: e.touches[0].pageX,
                        y: e.touches[0].pageY
                    }
                },
                touchmove: function(e) {
                    nm = false;
                    ep = {
                        x: e.touches[0].pageX,
                        y: e.touches[0].pageY
                    }
                },
                touchend: function(e) {
                    if (nm) {
                        ce(e, 'fc')
                    } else {
                        var x = ep.x - sp.x,
                            xr = Math.abs(x),
                            y = ep.y - sp.y,
                            yr = Math.abs(y);
                        if (Math.max(xr, yr) > 20) {
                            ce(e, (xr > yr ? (x < 0 ? 'swl' : 'swr') : (y < 0 ? 'swu' : 'swd')))
                        }
                    };
                    nm = true
                },
                touchcancel: function(e) {
                    nm = false
                }
            };
        for (var a in touch) {
            d.addEventListener(a, touch[a], false);
        }
    })(document);
    //EXAMPLE OF USE
    var l = function(e) {
        swiptePos = swiptePos == 0 ? swiptePos = 1 : swiptePos++;
        position = 1;
        var itemsLeft = ++itemsCount - (Math.abs(swiptePos) + slidesToShow * itemWidth) / itemWidth;
        console.log(itemsCount);
        console.log('swiptePos',swiptePos);
        if(swiptePos >= items.length) {
            itemsCount = --swiptePos;
            return false;
        } else {
            movePosition = swiptePos * itemWidth;
            //console.log('movePosition', movePosition);
            console.log('swiptePos', swiptePos);
            position -= Math.ceil(itemsLeft) >= slidesToScroll ? swiptePos * itemWidth : itemsLeft * itemWidth;
            console.log('swiptePos', swiptePos);
            //console.log('position', position);
            setPosition();
            checkBtns();
            document.querySelectorAll('.dots li').forEach(function(item) {
                item.classList.remove('active');
            });
            document.querySelector('.dots li:nth-child('+(++swiptePos)+')').classList.add('active');
            //console.log('prev', swiptePos);
        }
    };
    var r = function(e) {
        swiptePos = swiptePos == 0 ? swiptePos = 1 : --swiptePos;
        if(swiptePos == 0) {
            swiptePos = 1;
            return false;
        } else {
            //movePosition = (itemWidth / ++swiptePos) - movePosition;
            //movePosition = position;
            //var itemsLeft = Math.abs(position) / itemWidth;
            var itemsLeft = Math.abs(movePosition) / itemWidth;
            position = itemsLeft >= slidesToScroll ? -(--swiptePos * itemWidth) : itemsLeft * itemWidth;
            //position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
            setPosition();
            checkBtns();
            document.querySelectorAll('.dots li').forEach(function(item) {
                item.classList.remove('active');
            });
            document.querySelector('.dots li:nth-child('+(++swiptePos)+')').classList.add('active');  
        }
    };
    //document.body.addEventListener('fc', h, false); // 0-50ms vs 500ms with normal click
    document.body.addEventListener('swl', l, false);
    document.body.addEventListener('swr', r, false);
    //document.body.addEventListener('swu', h, false);
    //document.body.addEventListener('swd', h, false);
}
// document.body.addEventListener('swr',function() {console.log('right')},false);
// document.body.addEventListener('swl',function() {console.log('left')},false);