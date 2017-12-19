var calculator = (function(){
	myCal = {};

	var time = function(hours, minutes, seconds){
		this.hours=hours;
		this.minutes=minutes;
		this.seconds=seconds;
	}

	var imperial = function(miles, yards, feet){
		this.miles=miles;
		this.yards=yards;
		this.feet=feet;
	}

	var timeConverter = (function(){

		my = {};

		/** timeToSeconds
		*
		* @param {object}
		* @return {seconds}
		* @description convert time object
		* @example { hours: 1, minutes: 34, seconds: 23} in seconds.
		*/
		var timeToSeconds = function(time){
			var seconds;
			seconds = time.hours*3600;
			seconds = seconds+time.minutes*60;
			seconds = seconds+time.seconds;

			return seconds;
		}

		my.timeToSeconds=timeToSeconds;

		/** secondsToTime
		* @param {Integer}
		* @return {object}
		* @description convert seconds in time object
		* @example { hours: 1, minutes: 34, seconds: 23}.
		*/
		var secondsToTime = function(seconds){
			var a = seconds%3600;
			var secondsTime = a%60;
			var minutesTime = a-secondsTime;
			var hoursTime = seconds-a;

			minutesTime = minutesTime/60;
			hoursTime = hoursTime/3600;

			var time1 = new time(hoursTime, minutesTime, secondsTime);
			return time1;
		}

		my.secondsToTime=secondsToTime;

		return my;

	})();
	myCal.timeConverter=timeConverter;

	var distanceConverter = (function(){

		my = {};

		/**
		* kmToMeters
		* @param {km}
		* @return {meters}
		* @description convert kilometers in meters.
		*/
		var kmToMeters = function(km){
			var m = km * 1000;

			return m;
		}
		my.kmToMeters = kmToMeters;

		/**
		* metersToKm
		* @param {meters}
		* @return {km}
		* @description convert meters in km
		*/
		var metersToKm = function(meters){
			var km = meters / 1000;

			return km;
		}
		my.metersToKm = metersToKm;

		/**
		* milesToImperial
		* @param {miles}
		* @return {object}
		* @description convert miles in imperial format
		* @example { miles: 1, yards: 343, feets: 2}.
		*
		*/
		var milesToImperial = function(miles){
			var feet = miles * 5280;

			var a = feet % 5280;

			var feetF = a % 3;
			var yardsF = a-feetF;
			var milesF = feet-a;

			yardsF = yardsF/3;
			milesF = milesF/5280;


			var imperial1 = new imperial(milesF, yardsF, feetF);
			return imperial1;
		}
		my.milesToImperial = milesToImperial;

		/**
		* yardsToImperial
		* @param {yards}
		* @return {object}
		* @description convert yards in imperial format
		* @example { miles: 1, yards: 343, feets: 2}.
		*/
		var yardsToImperial = function(yards){
			var feet = yards * 3;

			var a = feet % 5280;

			var feetF = a % 3;
			var yardsF = a-feetF;
			var milesF = feet-a;

			yardsF = yardsF/3;
			milesF = milesF/5280;


			var imperial1 = new imperial(milesF, yardsF, feetF);
			return imperial1;
		}
		my.yardsToImperial = yardsToImperial;

		/**
		* imperialToMiles
		* @param {object}
		* @return {miles}
		* @description convert imperial format
		* @example { miles: 1, yards: 343, feets: 2} in miles.
		*/
		var imperialToMiles = function(imp){
			var milesF = 0;

			var miles = imp.miles;

			var yards = imp.yards;
			yards = yards/1760;

			var feet = imp.feet;
			feet = feet/3/1760;

			milesF += miles + yards + feet;

			return milesF;
		}
		my.imperialToMiles = imperialToMiles;

		/**
		* metersToMiles
		* @param {meters}
		* @return {miles}
		* @description convert meters in miles
		*/
		var metersToMiles = function(meters){
			var miles = meters * (1/1609.344);

			return miles;
		}
		my.metersToMiles = metersToMiles;

		/**
		* milesToMeters
		* @param {miles}
		* @return {meters}
		* @description convert miles in meters
		*/
		var milesToMeters = function(miles){
			var meters = miles * 1609.344;

			return meters;
		}
		my.milesToMeters = milesToMeters;


		return my;

	})();
	myCal.distanceConverter=distanceConverter;


	/**
	* [paceInKm calcula el ritmo de carrera por kilometro y milla a
	partir del tiempo en segundos realizado y la distancia recorrida en
	kilometros]
	* @param {number} timeInSeconds
	* @param {number} distanceInKm
	* @return {[time,time]} [devuelve un array con el ritmo por
	kilometro y ritmo por milla]
	*/
	var paceInKm = function(timeInSeconds, distanceInKm){
		var paceKm = (timeInSeconds/60)/distanceInKm;
		var distanceMiles = calculator.distanceConverter.metersToMiles(calculator.distanceConverter.kmToMeters(distanceInKm));
		var paceMiles = (timeInSeconds/60)/distanceMiles;


		events.publish('paceCalculated', [paceKm, paceMiles]);
		return [paceKm, paceMiles];
	}
	myCal.paceInKm = paceInKm;

	/**
	* [paceInMiles calcula el ritmo de carrera por kilometro y milla a
	partir del tiempo en segundos realizado y la distancia recorrida en
	millas]
	* @param {number} timeInSeconds
	* @param {number} distanceInMiles
	* @return {[time,time]} [devuelve un array con el ritmo por
	kilometro y ritmo por milla]
	*/
	var paceInMiles = function(timeInSeconds, distanceInMiles){
		var paceMiles = (timeInSeconds/60)/distanceInMiles;
		var distanceKm = calculator.distanceConverter.metersToKm(calculator.distanceConverter.milesToMeters(distanceInMiles));
		var paceKm = (timeInSeconds/60)/distanceKm;


		events.publish('paceCalculated', [paceKm, paceMiles]);
		return [paceKm, paceMiles];
	}
	myCal.paceInMiles = paceInMiles;


	/**
	* [markFromPacePerKm: calcula la marca esperada al recorrer la
	distancia en kilometros al ritmo de carrera por kilometro realizado]
	* @param {time} pacePerKm
	* @param {number} distanceInMeters
	* @return {time} [devuelve el tiempo/marca esperado]
	*/
	var markFromPacePerKm = function(pacePerKm, distanceInMeters){
		var v = 1/pacePerKm; //velocity
		var x = calculator.distanceConverter.metersToKm(distanceInMeters); //espace
		var t = x/v; //time in minutes
		t = t*60; //time in seconds
		time1 = calculator.timeConverter.secondsToTime(t);

		events.publish('timeCalculated', time1);
		return time1;
	}
	myCal.markFromPacePerKm = markFromPacePerKm;


	/**
	* [markFromPacePerMile: calcula la marca esperada al recorrer la
	distancia en millas al ritmo de carrera por milla realizado]
	* @param {time} pacePerMile
	* @param {imperial} distanceInImperial
	* @return {time} [devuelve el tiempo/marca esperado]
	*/
	var markFromPacePerMile = function(pacePerMile, distanceInImperial){
		var v = 1/pacePerMile; //velocity
		var x = calculator.distanceConverter.imperialToMiles(distanceInImperial); //espace
		var t = x/v; //time in minutes
		t = t*60; //time in seconds
		time1 = calculator.timeConverter.secondsToTime(t);

		events.publish('timeCalculated', time1);
		return time1;
	}
	myCal.markFromPacePerMile = markFromPacePerMile;


	/**
	* [tableTimeFromPacePerKm: calcula la marca esperada al recorrer la
	distancia en metros al ritmo de carrera por kilometro cada
	cutDistanceInMeters]
	* @param {time} pacePerKm
	* @param {number} distanceInMeters
	* @param {number} cutDistanceInMeters
	* @return {time} [devuelve un array de objetos con propiedades
	distance=distanciaIntermedia mark=tiempo de paso en la distancia
	intermedia]
	*/
	var tableTimeFromPacePerKm = function(pacePerKm, distanceInMeters, cutDistanceInMeters){
		var dR = distanceInMeters%cutDistanceInMeters; // dR = DISTANCIA RESTANTE
		var dE = distanceInMeters-dR; // dR = DISTANCIA ENTERA
		var count = dE/cutDistanceInMeters;
		array = [];

		for(var i=1;i<=count;i++){
			var v = 1/pacePerKm;
			var d = i*cutDistanceInMeters // d = DISTANCIA INTERMEDIA
			var x = calculator.distanceConverter.metersToKm(d);
			var t = x/v; //time in minutes
			t = t*60; //time in seconds

			var time1 = calculator.timeConverter.secondsToTime(t); // tiempo de paso
			
			var obj = {
				distance : d,
				mark : time1
			}
				

			array.push(obj);
		}

		/* CALCULA EL RESTO */

		if(dR != 0){
			var vR = 1/pacePerKm;
			var xR = calculator.distanceConverter.metersToKm(dR);
			var tR = xR/vR; //time in minutes
			tR = tR*60; //time in seconds

			var time1R = calculator.timeConverter.secondsToTime(tR+t); // tiempo de paso

			var obj = {
				distance : dR,
				mark : time1R
			}
			array.push(obj);
		}

		/* ---------------- */
		events.publish('tableCalculated', array);
		return array;
	}
	myCal.tableTimeFromPacePerKm = tableTimeFromPacePerKm;


	/**
	* [tableTimeFromPacePerMile: calcula la marca esperada al recorrer
	la distancia en millas al ritmo de carrera por milla cada
	cutDistanceInYards]
	* @param {time} pacePerMile
	* @param {number} distanceInMiles
	* @param {number} cutDistanceInYards
	* @return {time} [devuelve un array de objetos con propiedades
	distance=distanciaIntermediaImperial mark=tiempo de paso en la
	distancia intermedia]
	*/
	var tableTimeFromPacePerMile = function(pacePerMile, distanceInMiles, cutDistanceInYards){
		cutDistanceInMiles = cutDistanceInYards/1760;
		var dR = distanceInMiles%cutDistanceInMiles; // dR = DISTANCIA RESTANTE
		var dE = distanceInMiles-dR; // dR = DISTANCIA ENTERA
		var count = dE/cutDistanceInMiles;
		array = [];

		for(var i=1;i<=count;i++){
			var v = 1/pacePerMile;
			var d = i*cutDistanceInMiles
			d = d*1760; // d = DISTANCIA INTERMEDIA
			var x = cutDistanceInMiles;
			var t = x/v; //time in minutes
			t = t*60; //time in seconds

			var time1 = calculator.timeConverter.secondsToTime(t); // tiempo de paso
			
			var obj = {
				distance : d,
				mark : time1
			}
				

			array.push(obj);
		}

		/* CALCULA EL RESTO */

		if(dR != 0){
			var vR = 1/pacePerMile;
			var xR = dR/1760;
			var tR = xR/vR; //time in minutes
			tR = tR*60; //time in seconds

			var time1R = calculator.timeConverter.secondsToTime(tR+t); // tiempo de paso

			var obj = {
				distance : dR,
				mark : time1R
			}
			array.push(obj);
		}

		/* ---------------- */

		events.publish('tableCalculated', array);
		return array;
	}
	myCal.tableTimeFromPacePerMile = tableTimeFromPacePerMile;


	return myCal;
})();