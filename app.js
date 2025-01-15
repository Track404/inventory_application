require('dotenv').config();
const path = require('node:path');

const express = require('express');

const app = express();
const dbRoute = require('./routes/dbRoute');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/', dbRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
