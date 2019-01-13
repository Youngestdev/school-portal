const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const URI = process.env.MONGO_URI;

const StudentRoute = require('./routes/student');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cors());

// connect mongoose
mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('Connected to Database'))
  .catch(err => console.log('An error occurred...', err));

app.use('/portal', StudentRoute);

app.listen(PORT, () => console.log(`server running at port: ${PORT}`));
