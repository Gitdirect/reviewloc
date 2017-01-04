import express from 'express';
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import bluebird from 'bluebird';

import config from './conf';
import managingRoute from './managing/routes/maina';
import authRoute from './routes/auth';
import userRoute from './routes/user';
import pageRoute from './routes/page';
import commentRoute from './routes/comment';
import categoryRoute from './routes/category';
import * as managing from './middlewares/managing';
import errorHandler from './middlewares/errorHandler';
import getUser from './middlewares/getUser';
import checkToken from './middlewares/checkToken';

const app = express();

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

mongoose.Promise = bluebird;
mongoose.connect(config.database, err => {
    if (err) throw err;
    console.log('mongo connected');
})

app.listen(config.port, err => {
    if (err) throw err;

    console.log(`Server listening on port ${config.port}`);
});

app.use(morgan('tiny')); //combined
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.secret
}));

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res, next) {
    res.render('index');
});
app.use('/managing', managingRoute);
app.use('/api', authRoute);
app.use('/api', checkToken, userRoute);
app.use(getUser);
app.use('/api', checkToken, pageRoute);
app.use('/api', categoryRoute);
app.use('/api', commentRoute);

app.use(errorHandler);