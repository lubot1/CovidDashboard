var len;
var date;
var caseData = new Array();
var dataObject;
var dateArray = [];
var dailyCaseArray = [];
var todayDate = new Date(Date.now());

function myCallback(data) {
  dataObject = data;
  caseData=data.result.records;
}
//var caseDataArray = caseData[0];

window.onload = pageReady;

function pageReady() {
  var covidTotal = document.getElementById('CaseTotal');
  var yesterdayCases = document.getElementById('DailyCases');

  len = caseData.length;
  //console.log(dataObject);
  covidTotal.textContent = len;
  //yesterdayCases.innerHTML = dailyCases;
  for(var loopDate = new Date('March 5, 2020 00:00:00'); loopDate <= todayDate; loopDate.setDate(loopDate.getDate() + 1)) {
    var dailyCases = 0;
    for(let i = 0; i < len; i++) {
      var reportDate = new Date(Date.parse(caseData[i].Accurate_Episode_Date));
      if(loopDate.getTime() == reportDate.getTime()) {
        dailyCases++;
      }
    }
    dailyCaseArray.push(dailyCases);
  }

  console.log(dailyCaseArray);

  var svg = d3.select("body").append("svg").attr("height","520").attr("width","100%");
  svg.selectAll("rect")
    .data(dailyCaseArray)
    .enter().append("rect")
      .attr("height",function(d,i) { return d; })
      .attr("width","1")
      .attr("x",function(d,i){ return i*5; })
      .attr("y",function(d,i){ return 520-(d); });

}
