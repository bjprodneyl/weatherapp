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
					cityInfo += "<div class='todayWthr'><img src='http://openweathermap.org/img/w/" + y["weather"][0]["icon"] + ".png'></div>";
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
 
 //.municipality
 var cityInQuestion = null;
 var targetCityElem = "";
 var targetCityName = "";
 var getCOSForecast = "https://api.openweathermap.org/data/2.5/forecast?id=5417598&units=imperial&cnt=5&appid=bd5b1f37f8b551e17180b3041ddc5d1f";
 var getNYForecast = "https://api.openweathermap.org/data/2.5/forecast?id=5128581&units=imperial&cnt=5&appid=bd5b1f37f8b551e17180b3041ddc5d1f";
 var getTKOForecast = "https://api.openweathermap.org/data/2.5/forecast?id=1850147&units=imperial&cnt=5&appid=bd5b1f37f8b551e17180b3041ddc5d1f";
 
 $("html").off('click', ".municipality").on('click', ".municipality", function(e) {
 	//console.log($(this).children("b").text() + " was clicked");
 	targetCityElem = $(this);
 	targetCityName = $(this).children("b").text();
 	console.log("1. displaying contents of 'this' below");
 	console.log(this);
 	console.log("Display contents of 'targetCityElem' below");
 	console.log(targetCityElem);
 	//console.log(targetCityName);
 	//$(this)
 	/* The dataPulled variable will be used to check if data for a city's forecast has been pulled yet. Will use the "this" in the javascript logic to allow browser to know our constraints */
 	var dataPulled = 0;
 	/* We will use a switch here to make the api call dynamic for whatever city we click */
 	switch (true) {
 		case (targetCityName.indexOf("Colorado Springs") !=-1):
 			cityInQuestion = getCOSForecast;
 			console.log(cityInQuestion);
 		break;
 		case (targetCityName.indexOf("New York") !=-1):
 			cityInQuestion = getNYForecast;
 			console.log(cityInQuestion);
 		break;
 		case (targetCityName.indexOf("Tokyo") !=-1):
 			cityInQuestion = getTKOForecast;
 			console.log(cityInQuestion);
 		break;
 		default:
 			console.log("this is the default");
 		break;
 	}
 	console.log("Testing the city in question remains the same or not");
 	console.log(cityInQuestion);
 	function getFiveDay(cityInQuestion) {
 		if(!$(targetCityElem).hasClass("forecastPulled")) {
	 		$.ajax({
	 			type: 'POST',
	 			url: cityInQuestion,
	 			data: '{}',
	 			contentType: 'application/x-www-form-urlencoded; charset=utf-8',
	 			dataType: 'json',
	 			beforeSend: function(data) {
	 				console.log('About to get 5 day for specific city');
	 			},
	 		}).done(function(data) {
	 			console.log('Display contents of "data below"');
	 			console.log(data);
	 			var cityForecastResults = data;
	 			var fiveDay = "";
				console.log(data);
				console.log("display contents of cityForecastResults below:");
				console.log(cityForecastResults);
				console.log("stringifying data below:");
				console.log(JSON.stringify(data));
				/*$.each(cityForecastResults["list"], function(x,y) {
					
					cityInfo += "<div class='col-12 col-md-4 municipalityBlock'>";	
						cityInfo += "<div class='municipality col-12'>";
							cityInfo += "<b>" + y["name"] + "</b>";
							cityInfo += "<div class='currentTemp'>" + Math.round(y["main"]["temp"]) + "</div>";
						cityInfo += "</div>";
					cityInfo += "</div>";
					*/
		 			fiveDay += "<ul class='col-12 localForecast'>";
		 				/* Day 1 */
		 				fiveDay += "<li>";
		 					fiveDay += "<span class='forecastDay'>Day 1</span>" +
		 								"<span class='foreCastDesc'>" + cityForecastResults["list"][0]['weather'][0]['description'] + " <img src='http://openweathermap.org/img/w/" + cityForecastResults["list"][0]['weather'][0]["icon"] + ".png'></span>" +
			 							"<span class='foreCastHiLow'>" + Math.round(cityForecastResults["list"][0]['main']['temp_min']) + " " + Math.round(cityForecastResults["list"][0]['main']["temp_max"]) + "</span>";
	 					fiveDay += "</li>";
		 				/* Day 2 */
		 				fiveDay += "<li>";
		 					fiveDay += "<span class='forecastDay'>Day 2</span>" +
		 								"<span class='foreCastDesc'>" + cityForecastResults["list"][1]['weather'][0]['description'] + " <img src='http://openweathermap.org/img/w/" + cityForecastResults["list"][1]['weather'][0]["icon"] + ".png'></span>" +
			 							"<span class='foreCastHiLow'>" + Math.round(cityForecastResults["list"][1]['main']['temp_min']) + " " + Math.round(cityForecastResults["list"][1]['main']["temp_max"]) + "</span>";
	 					fiveDay += "</li>";
	 					/* Day 3 */
	 					fiveDay += "<li>";
		 					fiveDay += "<span class='forecastDay'>Day 3</span>" +
		 								"<span class='foreCastDesc'>" + cityForecastResults["list"][2]['weather'][0]['description'] + " <img src='http://openweathermap.org/img/w/" + cityForecastResults["list"][2]['weather'][0]["icon"] + ".png'></span>" +
			 							"<span class='foreCastHiLow'>" + Math.round(cityForecastResults["list"][2]['main']['temp_min']) + " " + Math.round(cityForecastResults["list"][2]['main']["temp_max"]) + "</span>";
	 					fiveDay += "</li>";
	 					/* Day 4 */
	 					fiveDay += "<li>";
		 					fiveDay += "<span class='forecastDay'>Day 4</span>" +
		 								"<span class='foreCastDesc'>" + cityForecastResults["list"][3]['weather'][0]['description'] + " <img src='http://openweathermap.org/img/w/" + cityForecastResults["list"][3]['weather'][0]["icon"] + ".png'></span>" +
			 							"<span class='foreCastHiLow'>" + Math.round(cityForecastResults["list"][3]['main']['temp_min']) + " " + Math.round(cityForecastResults["list"][3]['main']["temp_max"]) + "</span>";
	 					fiveDay += "</li>";
	 					/* Day 5 */
	 					fiveDay += "<li>";
		 					fiveDay += "<span class='forecastDay'>Day 5</span>" +
		 								"<span class='foreCastDesc'>" + cityForecastResults["list"][4]['weather'][0]['description'] + " <img src='http://openweathermap.org/img/w/" + cityForecastResults["list"][4]['weather'][0]["icon"] + ".png'></span>" +
			 							"<span class='foreCastHiLow'>" + Math.round(cityForecastResults["list"][4]['main']['temp_min']) + " " + Math.round(cityForecastResults["list"][4]['main']["temp_max"]) + "</span>";
	 					fiveDay += "</li>";
		 			fiveDay += "</ul>";
				/*});*/
	 			
	 			console.log("2. Display contents of 'targetCityElem' below");
	 			console.log(targetCityElem);
	 			$(targetCityElem).append(fiveDay);
	 			$(targetCityElem).addClass("forecastPulled");
	 		}).fail(function(data) {
				alert("fail" + JSON.stringify(data));
			}).always(function(data) {
				console.log("All AJAX methods complete");
			});
 		} else {
 			$(targetCityElem).children("ul").toggle();
 		}
 	}
 	getFiveDay(cityInQuestion);
 });