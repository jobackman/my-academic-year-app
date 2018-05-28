//Created by Stefan Etoh, 2014-03-18
//function that binds the #left-div to the top of the page when you scroll past 154px i.e. height of the header

$(document).ready(function(){
	var height = $(window).height();
	
	$(window).bind('scroll', function () {
	    var distanceToTop = $(window).scrollTop();
		
		if(distanceToTop<154){
			$('#fixed').removeClass('fixed');
			$('#fixed').removeClass('col-md-11');
		}

	
	    else{
	        $('#fixed').addClass('fixed');     
			$('#fixed').addClass('col-md-11');
	    } 
	});
});
