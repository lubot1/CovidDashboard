var caseData = new Array();
var dataObject;
var dailyCaseArray = [];
var dateArray = [];

function myCallback(data) {
  dataObject = data;
  caseData = data.result.records;
}

window.onload = pageReady;

function pageReady() {
  //Extract page elements needed to display data
  var covidTotal = document.getElementById('CaseTotal');
  var yesterdayCasesBox = document.getElementById('DailyCases');
  var ctx = document.getElementById('newChart');
  //Extract data needed, and place into arrays
  for(let i = 0; i < caseData.length; i++) {
    var recordDate = new Date(Date.parse(caseData[i].Date));
    dailyCaseArray.push(caseData[i].Peel_Public_Health);
    dateArray.push(recordDate.toDateString());
  }
  //Method to sum array found at https://www.tutorialrepublic.com/faq/how-to-find-the-sum-of-an-array-of-numbers-in-javascript.php
  dailyCases = dailyCaseArray.reduce(function(a,b) {
    return a + b;
  },0);
  //Display info extracted from data on page
  covidTotal.innerHTML = dailyCases;
  yesterdayCasesBox.innerHTML = dailyCaseArray[dailyCaseArray.length-1];
  //Graph properties
  var myChart = new Chart(ctx, {
    type: 'bar',
    options: {
      // If this isn't set to false it takes up the whole page
      responsive: false
    },
    data: {
      labels:dateArray,
      datasets: [{
        label: "Daily cases",
        backgroundColor: 'red',
        data: dailyCaseArray
      }],
    }
  });
}
