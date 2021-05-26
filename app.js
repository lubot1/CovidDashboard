const express = require('express');
const request = require('request');

const app = express();
const port = 3000;
var data;
var healthUnits;
const url = "https://data.ontario.ca/api/3/action/datastore_search?resource_id=8a88fe6d-d8fb-41a3-9d04-f0550a44999f&limit=1000";
const options = {
  json: true
};

request(url,options, (error,res,body) => {
  // console.log(`Status code: ${res.statusCode}` );
  data = body.result.records;
  healthUnits = body.result.fields;
  

  // res.on('data', d => {
  //   data = d
  // });
});
console.log(data);
app.get('/', (req, res) => {
  res.send(`${data}`);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})