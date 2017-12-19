calculatorView.init();

document.getElementById('btn-time').addEventListener("click", (function(){
	var distance = document.getElementById('distance1TIME').value;
	var pace = document.getElementById('pace1').value;

	if(document.getElementById('unitsDistanceTIME').value == "KM"){
		distance = distance * 1000;
		calculator.markFromPacePerKm(pace, distance);
	}else if(document.getElementById('unitsDistanceTIME').value == "MILES"){
		distance = calculator.distanceConverter.milesToImperial(distance);
		calculator.markFromPacePerMile(pace, distance);
	}
}));

document.getElementById('btn-timeCut').addEventListener("click", (function(){
	var distance = document.getElementById('distance1TIME').value;
	var pace = document.getElementById('pace1').value;
	var cut = document.getElementById('cut').value;

	if(document.getElementById('unitsDistanceTIME').value == "KM"){
		distance = distance * 1000;
		cut = cut * 1000;
		calculator.tableTimeFromPacePerKm(pace, distance, cut);
	}else if(document.getElementById('unitsDistanceTIME').value == "MILES"){
		calculator.tableTimeFromPacePerMile(pace, distance, cut);
	}
}));

document.getElementById('btn-pace').addEventListener("click", (function(){
	var distance = document.getElementById('distance1').value;
	var time = {
		hours: document.getElementById('time1Pace').value*1,
		minutes: document.getElementById('time2Pace').value*1,
		seconds: document.getElementById('time3Pace').value*1
	}
	time1 = calculator.timeConverter.timeToSeconds(time);

	if(document.getElementById('unitsPace').value == "KM"){
		calculator.paceInKm(time1, distance);
	}else if(document.getElementById('unitsPace').value == "MILES"){
		calculator.paceInMiles(time1, distance);
	}
}));