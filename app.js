import express from 'express';
import path from 'path';
import morgan from 'morgan';
import methodOverride from 'method-override'
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import hbs from 'hbs';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import { router } from './src/routes/index.js';
import 'dotenv/config';
import './src/database/conexiondb.js';


const app = express();
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//Middleware
app.use(morgan('common')); // 'dev' - 'combined'
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));
hbs.registerPartials(path.join(__dirname, 'src/views/partials'));

app.use(router);
app.get('/', (req, res) =>{
    res.render('index')
})

app.listen(PORT, () => {
    console.log(`Aplicación con Yarn y ES6 corriendo en el Puerto: ${PORT}`);
});