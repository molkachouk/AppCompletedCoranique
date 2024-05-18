const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Routes = require('./routes/route');
var fileupload = require("express-fileupload");
const morgan = require('morgan')
const multer  = require('multer')



require('dotenv').config({ path: './config/.env' });
require('./config/db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const cors = require('cors');
app.use(cors());
app.use('/api', Routes);
app.use('/images', express.static('public/images'));
app.use('/event_images', express.static('public/event_images'));
app.use('/students', express.static('public/students'));
app.use('/parent', express.static('public/parent'));

app.use(fileupload());
// Error Handling MiddleWare
app.use(express.urlencoded({
  extended: true,
  })
 );
 app.use(morgan('dev'))

 

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
