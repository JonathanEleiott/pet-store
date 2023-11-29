const express = require('express');
const app = express();

const client = require('./db/client.js');
client.connect();

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.use('/api/v1', require('./api/index.js'));

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));