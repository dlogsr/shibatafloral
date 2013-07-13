var windowHeight = $(window).height() * 0.6;
var remainingHeight = $(window).height() *0.4;
var docked = false;
var lockedcat = "";

$(document).ready(function(){
	var $navCat = $('.navcat');
	var $debugBox = $('#debug');
	var $topBar = $('#topbar');
	var $crest = $('#crest');
	var $mainContent = $('#maincontent');
	var $mainBG = $('#mainbg');
	var $waiting = $('#waiting');
	
	$topBar.css({"height":windowHeight});
	$crest.css("margin-top",windowHeight-122);
	
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
			$crest.stop(true, true).animate({"margin-top":windowHeight-122},1000).css('overflow','visible');
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
				if(category == 'products'){
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
			$mainBG.stop(true, true).animate({"margin-top":"-666"},1500,function(){
				$('#locMap').attr('src','https://www.google.com/maps?q=620+Brannan+Street,+San+Francisco,+CA&hl=en&z=14&iwloc=near');
			});
		} else {
		}
	});


});

$(window).resize(function() {
	windowHeight = $(window).height() * 0.6;
	remainingHeight = $(window).height() *0.4;
	if(docked == false){
		$('#topbar').css({"height":windowHeight});
		$('#crest').css("margin-top",windowHeight-122);
	}
});
// JavaScript Document