const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('./middlewares/session');
const flash = require('express-flash');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session);
app.use(flash());

// Set views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const routes = require('./routes/routes');
app.use('/', routes);



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
