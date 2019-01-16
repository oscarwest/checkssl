const express = require('express');
const opensslService = require('./opensslService');
const validUrl = require('valid-url');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/status', async (req, res) => {
  const body = req.body;

  // Filter out invalid urls
  const validUrls = body.filter((value) => {
    return validUrl.isHttpsUri(value);
  });

  const data = await opensslService.getCertInfo(validUrls);
  return res.send(data);
})

app.get('/hc', (req, res) => {
  return res.send('{ "healthy": "true" }');
});


app.listen(PORT, function () {
  console.log(`Listening on ${PORT}!`)
});
