/*
 Copyright (C) Rodney T Little 2017
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */
/*
	/	The cities for my app are as follows:
	/ 	1. Colorado Springs, CO = 5417598
	/	2. New York, NY = 5128581
	/ 	3. Toyko, JP = 1850147
*/
 
 $(document).ready(function (url) {
	var myCities = "https://api.openweathermap.org/data/2.5/group?id=5417598,5128581,1850147&units=imperial&appid=bd5b1f37f8b551e17180b3041ddc5d1f";
	var cityResults = "";
	$.ajax({
		type: 'POST',
		url: myCities,
		data: "{}",
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		dataType: 'json',
		beforeSend: function(data) {
			console.log("About to request data");
		},
	}).done(function(data) {
		//alert("done" + JSON.stringify(data));
		console.log("done" + data);
		var cityResults = data;
		var cityInfo = "";
		console.log(data);
		console.log("display contents of cityResults below:");
		console.log(cityResults);
		console.log("stringifying data below:");
		console.log(JSON.stringify(data));
		$(".municipalities").html("");
		$.each(cityResults["list"], function(x,y) {
			cityInfo += "<div class='col-12 col-md-4 municipalityBlock'>";	
				cityInfo += "<div class='municipality col-12'>";
					cityInfo += "<b>" + y["name"] + "</b>";
					cityInfo += "<div class='currentTemp'>" + Math.round(y["main"]["temp"]) + "</div>";
				cityInfo += "</div>";
			cityInfo += "</div>";
		});
		$(".municipalities").append(cityInfo);
	}).fail(function(data) {
		alert("fail" + JSON.stringify(data));
	}).always(function(data) {
		console.log("All AJAX methods complete");
	});
 });