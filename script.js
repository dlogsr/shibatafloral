var windowHeight = $(window).height() * 0.6;
var remainingHeight = $(window).height() *0.4;
var docked = false;
var lockedcat = "";

var $navCat = $('.navcat');
var $debugBox = $('#debug');
var $topBar = $('#topbar');
var $crest = $('#crest');
var $mainContent = $('#maincontent');
var $mainBG = $('#mainbg');
var $waiting = $('#waiting');


function resizeIt(){
	windowHeight = $(window).height() * 0.6;
	if(docked == false){
		$topBar.css({"height":windowHeight});
		if(windowHeight <= 667){
			$crest.css("margin-top",windowHeight-122);
		}
		else{
			$crest.css("margin-top",545);
		}

	}
}

$(document).ready(function(){

	resizeIt();
	
	$navCat.hover(
		function() {
			var catId = $(this).attr('id');
			var catIdSel = $('#'+catId+'bar');
			catIdSel.removeClass('catActive');
			catIdSel.addClass('catHilite');
		},
		function() {
			var catId = $(this).attr('id');
			var catIdSel = $('#'+catId+'bar');
			$debugBox.html(catId);
			if(catId.toString() != lockedcat){
				catIdSel.removeClass("catHilite");
			}
			else {
				catIdSel.removeClass("catHilite");
				catIdSel.addClass("catActive");
			};
		}
	);

	//function to make sure the navbar stays highlighted once you click a category,
	//and disappears after you click the crest
	
	$crest.click(function() {
		if(docked == true){
			$('#'+lockedcat+'bar').removeClass('catActive');
			$debugBox.html(lockedcat);
			lockedcat="";
			if(windowHeight <= 667){
				$crest.stop(true, true).animate({"margin-top":windowHeight-122},1000).css('overflow','visible');
			}
			else {
				$crest.stop(true, true).animate({"margin-top":525},1000).css('overflow','visible');	
			}
			$topBar.stop(true, true).animate({"height":windowHeight},1000, function() {
				docked = false;
			});
			$mainBG.stop(true, true).animate({"margin-top":"0"},1500,function(){
				$mainContent.addClass('hidden');
			});
			$('#introtext, #intro').fadeIn(1000);
			$mainContent.fadeOut(350);
		}
		else {
		};
	});
	$navCat.click(function() {
		dockedAniComplete = false;
		var category = $(this).attr('id');
		if(category.toString() == lockedcat.toString() || category.toString() == 'null') {
			//do nothing; you are already on that page
		}
		else {
				if(category == 'products' || category == 'specials'){
					var categorypage = category+".php"; 
				}
				else {
					var categorypage = category+".html";
				};
				$('#'+lockedcat+'bar').removeClass('catActive');
				lockedcat = category; // set the locked category to what was clicked
				$mainContent.fadeOut(350, function(){
					$mainContent.empty();
					$waiting.removeClass('hidden');
					$mainContent.load(categorypage, function(response, status, xhr) {
					if (status == "error") {
						var msg = "Sorry but there was an error: ";
						$debugBox.html(msg + xhr.status + " " + xhr.statusText);
					}
					$mainContent.fadeIn(350);
					$waiting.addClass('hidden');
				});
			});
		};
			
			
		if(docked == false){
			$('#introtext, #intro').fadeOut(350);
			$mainContent.removeClass('hidden');
			$crest.stop(true, true).animate({"margin-top":150-122},1000).css('overflow','visible');;
			$topBar.stop(true, true).animate({"height":"150px"},1000, function() {
				docked = true;
			});
			$mainBG.stop(true, true).animate({"margin-top":"-453"},1500,function(){
				//$('#locMap').attr('src','https://www.google.com/maps?q=620+Brannan+Street,+San+Francisco,+CA&hl=en&z=14&iwloc=near');
			});
		} else {
		}
	});


});

$(window).resize(function() {
	resizeIt();
});
// JavaScript Document