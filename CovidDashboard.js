var len;

function myCallback(data){
  var text = '';
  len = data.result.records.length;

  console.log(data.result);
  console.log(data.result.total)
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
