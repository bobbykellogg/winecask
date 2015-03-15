var $mobileDate = new Date();
$mobileDate.setTime($mobileDate.getTime() + (30 * 60 * 1000));
var $mobileName = "wine-cask-mobile";
var $mobileOpts = {expires: $mobileDate, path: '/'};

$(function() {
	$("#full-site-button").click(function(e) {
		$.cookie($mobileName, "full", $mobileOpts);
	});
});
