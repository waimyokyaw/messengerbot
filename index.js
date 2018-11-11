const express = require('express');
const bodyParser = require('body-parser');
const verificationController = require('./controllers/verification');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/',verificationController);
app.listen(3000, () => console.log('Webhook server is listening, port 3000'));