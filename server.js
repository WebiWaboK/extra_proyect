const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
const sessionMiddleware = require('./middlewares/session');
const flashMiddleware = require('./middlewares/flash');
const bodyParserMiddleware = require('./middlewares/bodyParser');
const cookieParserMiddleware = require('./middlewares/cookieParser');

app.use(bodyParserMiddleware);
app.use(express.json());
app.use(cookieParserMiddleware);
app.use(sessionMiddleware);
app.use(flashMiddleware);

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
