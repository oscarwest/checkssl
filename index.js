// Require the framework and instantiate it
let express = require('express');
let opensslService = require('./opensslService');
let validUrl = require('valid-url');

let app = express();
app.use(express.json());

app.post('/status', (req, res) => {
  var body = req.body;
  var validUrls = body.filter((value) => {
    return validUrl.isHttpsUri(value);
  });

  return res.send(opensslService.getCertInfo(validUrls));
})


app.listen(3000, function () {
  console.log('Listening on 3000!')
})