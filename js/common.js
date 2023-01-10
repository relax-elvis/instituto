$(function() {

	// Custom JS
	if(window.outerWidth < 991) {
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
		removeElement(['.in-comments-g', '.social-share.article']);

		articleTableBlock.appendChild(articleCommnetBlock);
		articleTableBlock.insertBefore(socialShareArticle, articleCommnetBlock);
	}

	

});
