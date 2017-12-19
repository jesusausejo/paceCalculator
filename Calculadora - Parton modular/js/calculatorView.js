var calculatorView = (function () {

   function timeCalculator(time) {
      document.getElementById('time1').value=time.hours+" hours";
      document.getElementById('time2').value=time.minutes+" minutes";
      document.getElementById('time3').value=time.seconds.toFixed(2)+" seconds";
   }

   function timeCalculatorCut(array) {
      tbBody = document.createElement("tbody");
      miTabla = document.createElement("table");
      miTabla.setAttribute("class", "table");

      thead = document.createElement("thead");
      thead.setAttribute("class", "thead-dark");
      thead.setAttribute("witdh", "100%");
      th3 = document.createElement("th");
      th1 = document.createElement("th");
      th2 = document.createElement("th");
      th1.innerHTML = "Distance";
      th2.innerHTML = "Time";
      th3.innerHTML = "#";
      thead.appendChild(th3);
      thead.appendChild(th1);
      thead.appendChild(th2);
      miTabla.appendChild(thead);



      for(var i=0;i<array.length;i++){
         tr = document.createElement("tr");
         td1 = document.createElement("td");
         td2 = document.createElement("td");
         td3 = document.createElement("td");
         if(document.getElementById('unitsDistanceTIME').value=='KM'){
            td1.innerHTML = array[i].distance+" metros";
         }else if(document.getElementById('unitsDistanceTIME').value=='MILES'){
            td1.innerHTML = array[i].distance+" yardas";
         }
         td3.innerHTML = i+1;
         if(array[i].mark.hours>0){
            td2.innerHTML = array[i].mark.hours+" hours, "+array[i].mark.minutes+" minutes and "+array[i].mark.seconds.toFixed(2)+" seconds"; 
         }else if(array[i].mark.hours==0){
            td2.innerHTML = array[i].mark.minutes+" minutes and "+array[i].mark.seconds.toFixed(2)+" seconds";
         }
         tr.appendChild(td3);
         tr.appendChild(td1);
         tr.appendChild(td2);
         tbBody.appendChild(tr);
      }
      miTabla.appendChild(tbBody);
      miCapa = document.getElementById('result');
      miCapa.appendChild(miTabla);
   }

   function paceCalculator(pace) {
         document.getElementById('pace1Pace').value=pace[0].toFixed(2)+" min/KM || "+pace[1].toFixed(2)+ " min/Miles";
   }

   return {
      init: function () {
         events.subscribe('tableCalculated', timeCalculatorCut);
         events.subscribe('timeCalculated', timeCalculator);
         events.subscribe('paceCalculated', paceCalculator);
      }
   }
}());