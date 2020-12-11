var caseData = [];
var dataObject;
var dailyCaseArray = [];
var dateArray = [];
var peelRegionPopulation = 1382000;
var activeCaseArray = [];
var activeCases;
var yesterdayCases;
var perCapita;

function myCallback(data) {
  dataObject = data;
  caseData = data.result.records;
}

window.onload = pageReady;

function pageReady() {
  //Extract page elements needed to display data
  var covidTotal = document.getElementById('CaseTotal');
  var yesterdayCasesBox = document.getElementById('DailyCases');
  var perCapitaText = document.getElementById('PerCapita');
  var perCapitaBox = document.getElementsByClassName('PerCapitaBox')[0];
  var dangerLevel = document.getElementById("DangerLevel");
  var ctx = document.getElementById('newChart');

  //Extract data needed, and place into arrays
  for(let i = 0; i < caseData.length; i++) {
    var recordDate = new Date(Date.parse(caseData[i].Date));
    dailyCaseArray.push(caseData[i].Peel_Public_Health);
    dateArray.push(recordDate.toISOString().substring(0, 10));
    //This is to find how many active covid cases there are in the region
    //Length to check for active cases is because the median incubation period is around 5-6 days and patients usually only get tested when symptomatic
    //To make this more accurate we should use symptomatic episode date, but this is in a different dataset
    if((caseData.length-i) < 7) {
      activeCaseArray.push(caseData[i].Peel_Public_Health);
    }
  }

  //Method to sum array found at https://www.tutorialrepublic.com/faq/how-to-find-the-sum-of-an-array-of-numbers-in-javascript.php
  dailyCases = dailyCaseArray.reduce(function(a,b) {
    return a + b;
  },0);
  activeCases = activeCaseArray.reduce(function(a,b) {
    return a + b;
  },0);

  //Calculate cases/100,000 people
  yesterdayCases = dailyCaseArray[dailyCaseArray.length-1];
  perCapita = (activeCases/peelRegionPopulation)*100000;

  //Display info extracted from data on page
  covidTotal.innerHTML = dailyCases;
  yesterdayCasesBox.innerHTML = yesterdayCases;
  perCapitaText.innerHTML = perCapita.toFixed(2);

  //Checks what the covid cases are like per capita and assigns a background colour to explain the danger based on a traffic light model
  if(perCapita < 10) {
    perCapitaBox.style.backgroundColor = '#3EC300';
    dangerLevel.innerHTML = "Cases are low, your region is safe";
  }
  else if(perCapita >= 10 && perCapita < 100) {
    perCapitaBox.style.backgroundColor = '#FFFC31';
    dangerLevel.innerHTML = "Cases are rising, keep caution";
  }
  else {
    perCapitaBox.style.backgroundColor = '#FF3A33';
    dangerLevel.innerHTML = "Cases are high, your region is in danger";
  }

  //Graph properties
  // Graph made using chart.js framework
  var myChart = new Chart(ctx, {
    type: 'bar',
    options: {
      // If this isn't set to false it takes up the whole page
      scales: {
        yAxes: [{scaleLabel: {display: true, labelString: "Cases"}}],
        xAxes: [{scaleLabel: {display: true, labelString: "Day"}}]
      },
      responsive: false,
      title: {
        display: true,
        text: 'Covid-19 in Peel, per day',
        fontSize: 20,
        fontColor: 'black'
      }
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
