var len;
var date;
var dailyCases = 0;

function myCallback(data){
  len = data.result.records.length;
  var todayDate = new Date(Date.now());
  var reportDate;
  for(let i = 0; i < len; i++) {
    reportDate = new Date(Date.parse(data.result.records[i].Case_Reported_Date));
    //console.log("Todays month: " + todayDate.getMonth() + " Report Month: " + reportDate.getMonth());
    //// TODO: Find better way to compile cases reported yesterday
    if((todayDate.getDate()-1) === reportDate.getDate() && todayDate.getMonth() == reportDate.getMonth()) {
      dailyCases++;
    }
  }

  console.log(reportDate);
  console.log(data.result.records);
  console.log("Today there were " + dailyCases + " cases");
}

window.onload = pageReady;
function pageReady() {
  var covidTotal = document.getElementById('CaseTotal');
  covidTotal.textContent = len;

}
  //script = document.createElement("script");
  //script.type = "text/javascript";
  //script.src = "https://data.ontario.ca/api/3/action/datastore_search?callback=myCallback&resource_id=8a88fe6d-d8fb-41a3-9d04-f0550a44999f";
  //document.head.appendChild(script);

  //console.log(myCallback.success);
  //script.addEventListener('load', postLoadFunction);
  //document.head.appendChild(script);

  //function postLoadFunction() {
  //  console.log(myCallback());
  //}

  //var url="https://data.ontario.ca/api/3/action/datastore_search?callback=myCallback&resource_id=8a88fe6d-d8fb-41a3-9d04-f0550a44999f";
