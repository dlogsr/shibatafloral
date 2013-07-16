//shibatafloral location changing script

$(document).ready(function(){
	var $locCat = $('.locCat');
	var $locWindow = $('#locWindow');
	var $locInfo = $('#locInfo');
	var $locMap = $('#locMap');
	var $linkYelp = $('#linkYelp');
	var $linkGmap = $('#linkGmap');

	//default values: SF. set as image to help with loading/ani slowdown
	//$locMap.attr('src','locmap_default.jpg');

	var addyArray = {
		SFO: "620 Brannan St<br />(between 5th St & I-280) <br />San Francisco, CA 94107<br /><br />(415) 495-8611",
		LAX: "755 Wall St<br />Ste 11<br />Los Angeles, CA 90014<br /><br />(213) 995-9900",
		PDX: "3622 N Leverman St<br />Portland, OR 97217<br /><br />(503) 285-7700"
	};
	
	var gmapsArray={
		SFO: "https://www.google.com/maps?q=620+Brannan+Street,+San+Francisco,+CA&hl=en&z=14&iwloc=near&output=embed",
		LAX: "https://www.google.com/maps?q=755+Wall+Street,+Los+Angeles,+CA&hl=en&z=14&iwloc=near&output=embed",
		PDX: "https://www.google.com/maps?q=3622+N+Leverman+St,+Portland,+OR&hl=en&&z=14&iwloc=near&output=embed"
	};
	
	var yelpArray={
		SFO: "http://www.yelp.com/biz/shibata-floral-company-san-francisco",
		LAX: "http://www.yelp.com/biz/shibata-floral-company-los-angeles",
		PDX: "http://www.yelp.com/biz/shibata-floral-company-portland"
	};
	
	$locCat.click(function(){
		var locID = $(this).attr('id');
		//locID = 'loc'+locID;
		addyID = ['addy'+locID];
		$locWindow.removeClass().addClass('locElement').addClass('locAddy');
		$locWindow.addClass('loc'+locID);
		$locInfo.html(addyArray[locID]);
		$locMap.attr('src',gmapsArray[locID]+'&output=embed');
		$linkGmap.attr('href',gmapsArray[locID]);
		$linkYelp.attr('href',yelpArray[locID]);
	});
});