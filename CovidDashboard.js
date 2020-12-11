var caseData = new Array();
var dataObject;
var dateArray = [];
var dailyCaseArray = [];

function myCallback(data) {
  dataObject = data;
  caseData = data.result.records;
}

window.onload = pageReady;

function pageReady() {
  var covidTotal = document.getElementById('CaseTotal');
  var yesterdayCasesBox = document.getElementById('DailyCases');

  for(let i = 0; i < caseData.length; i++) {
    dailyCaseArray.push(caseData[i].Peel_Public_Health);
    dateArray.push(caseData[i].date);
  }
  //Method to sum array found at https://www.tutorialrepublic.com/faq/how-to-find-the-sum-of-an-array-of-numbers-in-javascript.php
  dailyCases = dailyCaseArray.reduce(function(a,b) {
    return a + b;
  },0);

  covidTotal.innerHTML = dailyCases;
  yesterdayCasesBox.innerHTML = dailyCaseArray[dailyCaseArray.length-1];

  var svg = d3.select("body").append("svg").attr("height","520").attr("width","100%");
  svg.selectAll("rect")
    .data(dailyCaseArray)
    .enter().append("rect")
      .attr("height",function(d,i) { return d; })
      .attr("width","1")
      .attr("x",function(d,i){ return i*5; })
      .attr("y",function(d,i){ return 520-(d); });

}
