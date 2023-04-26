(function() {
	// popup cookie
	document.addEventListener('DOMContentLoaded', function () {
		var button = document.querySelector(".cc_dialog.interstitial .cc_b_inner button.cc_b_cp").cloneNode(true);
		document.querySelector(".cc_dialog.interstitial .cc_b_inner button.cc_b_cp").style.display = 'none';
		document.querySelector('.cc_dialog .cc_dialog_text').appendChild(button);
		document.querySelector('.cc_dialog .cc_dialog_text button.cc_b_cp').addEventListener('click', function() {
			document.querySelector(".cc_dialog.interstitial .cc_b_inner button.cc_b_cp").click();
		});
	});
	// /popup cookie
	document.querySelector('footer .subscribe-button input').addEventListener('click', function(e) {
		e.preventDefault();
		document.querySelector('.newsletter').classList.add('active');
		
		var heightNewsCont = document.querySelector('.newsletter .in-form-g.modal .container').offsetHeight;
		var heightWindow = window.innerHeight;
		if(window.innerHeight < heightNewsCont) {
			document.querySelector('.newsletter .in-form-g.modal .container').style.height = heightWindow + 'px';
			document.querySelector('.newsletter .in-form-g.modal .container').style.overflowY = 'auto';
		}
	});
	document.querySelector('.in-form-g.modal .modal-close').addEventListener('click', function(e) {
		e.preventDefault();
		document.querySelector('.newsletter').classList.remove('active');
	});
	// Custom JS
	if(window.outerWidth < 1201 && window.outerWidth > 675) {
		if(document.querySelector('.in-other-pages .in-content .in-sidebar') !== null) {
			var sideBar = document.querySelector('.in-other-pages .in-content .in-sidebar');
			document.querySelector('.in-other-pages .in-content .in-sidebar').remove();

			var content = document.querySelector('.in-other-pages .in-content .row .col-9 > article');
			document.querySelector('.in-other-pages .in-content .row .col-9 > article').remove();
			var div = document.createElement('div');
			div.classList.add('row');
			document.querySelector('.in-other-pages .in-content .row .col-9').append(div);

			document.querySelector('.in-other-pages .in-content .row .col-9 .row').append(content);
			document.querySelector('.in-other-pages .in-content .row .col-9 .row').append(sideBar);

			document.querySelector('.in-other-pages .in-content .row .col-9 .row article').classList.add('col-8');
			document.querySelector('.in-other-pages .in-content .col-9 .row .in-sidebar').classList.add('col-4');
		}
	}
	if(window.outerWidth < 991) {
		if(document.querySelector('.in-contact-page .in-contact-form .map') !== null) {
			var map = document.querySelector('.in-contact-page .in-contact-form .map');
			document.querySelector('.in-contact-page .in-contact-form .map').remove();
			document.querySelector('.in-contact-page .in-contact-form .container').after(map);
		}

		function $getElement(tag) {
			return document.querySelector(tag);
		}
		var articleCommnetBlock = $getElement('.in-comments-g');
		var articleTableBlock = $getElement('#comments-g-table');
		var socialShareArticle = $getElement('.social-share.article');

		function removeElement(array) {
			array.forEach(function (item) {
				document.querySelector(item).remove();
			}); 
		}
		if(document.querySelector('.in-comments-g') !== null) {
			removeElement(['.in-comments-g', '.social-share.article']);
			articleTableBlock.appendChild(articleCommnetBlock);
			articleTableBlock.insertBefore(socialShareArticle, articleCommnetBlock);
		}
		
	}

	

})();

$(document).ready(function(){

	if($('.in-descr .descr').length !== 0) {
		var itemContent = $('.in-descr .descr > *');
		for(var i = 0; i < itemContent.length; i++) {
			if(i <= 5) {
				$(itemContent[i]).fadeIn(300);
			} else {
				$(itemContent[i]).fadeOut(300);
			}
		}
		$('.in-descr .block-text label[for=show]').click(function() {
			if(!$(this).next().prop('checked')) {
				$('.in-descr .descr > *').fadeIn(300);
			} else {
				for(var i = 0; i < itemContent.length; i++) {
					if(i <= 5) {
						$(itemContent[i]).fadeIn(300);
					} else {
						$(itemContent[i]).fadeOut(300);
					}
				}
			}
		});
	}


    function sendData(formbtn, id) {
    	$(formbtn).click(function() {
    		$(id).submit();
    	});
    }


	// CONTACT FORM 

	$('#cf-form').validate({

		rules: {

			firstname: {
				required: true,
				minlength: 2
			},
			email: {
				required: true,
				email: true
			},
			phone: {
				required: true,
				digits: true
			},
			privacidad: {
				required: true,
			}
		},
		submitHandler: function(form) {

			$(form).submit(function(e) {
				e.preventDefault();

		    	var formData = $(this).serialize();

		        $.ajax({
		            type : 'POST',
		            url : '/webhooks/Form.php',
		            data : formData,
		            dataType : 'json',
		            encode : true,
		            success: function (data, status, xhr) { },
		            error: function (jqXhr, textStatus, errorMessage) {}
		        })
		        .done(function(data) {

		        	$('#cf-form').fadeOut(0);

					if(data.status == 'success') $('.form-success').fadeIn(300);
				
					else $('.form-error').fadeIn(300); 

					// SEND TO GTM	
					
					window.dataLayer = window.dataLayer || [];
					window.dataLayer.push({

						'event': 'cf-form',
						'product': $('input[name="page"]').val(),
						'email': $('#email-contact').val()

					});

		        });


			});
		}

	}); 
	
	sendData('#cf-form .btn', '#cf-form');
	
	// NEWSLETTER

	$('form#newsletter').validate({
		rules: {
			firstname: {
				required: true,
				minlength: 2
			},
			email: {
				required: true,
				email: true
			},
			privacidad: {
				required: true,
			}
		},
		submitHandler: function(form) {

			$('form#newsletter').submit(function(e) {
				e.preventDefault();

		    	var formData = $(this).serialize();

		        $.ajax({
		            type : 'POST',
		            url : '/webhooks/Newsletter.php',
		            data : formData,
		            dataType : 'json',
		            encode : true,
		            success: function (data, status, xhr) {},
		            error: function (jqXhr, textStatus, errorMessage) {}
		        })
		        .done(function(data) {

		        	$('#newsletter').fadeOut(0);

					if(data.status == 'success') $('.form-success').fadeIn(300);
				
					else $('.form-error').fadeIn(300); 

					// SEND TO GTM	
					
					window.dataLayer = window.dataLayer || [];
					window.dataLayer.push({

						'event': 'news-form',
						'email': $('#email-news').val()

					});		

		        });
			});
		}

	});
	
	sendData('#newsletter .btn', '#newsletter');
	
});
