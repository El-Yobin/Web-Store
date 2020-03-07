const path = require('path');
const express = require('express');
const connect = require('connect');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const _ = require('lodash');
const db = require('./dbConnect');

const app = express();

app.set('port', process.env.PORT || 4000);

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

    next();
});

app.use(connect().use(cookieParser()));
app.use(
    connect().use(
        session({
            secret: 'work hard',
            resave: true,
            saveUninitialized: false
        })
    )
);

app.get('/api/products', (req, res) => {
    if (req.query.category) {
        db.any(`select * from product where category='${req.query.category}'`)
            .then(products => res.send(products))
            .catch(error => console.error(error));
    }
});

app.get('*', (req, res) => {
    console.log('server get *');
    res.send(
        'Server is working. Please post at "/contact" to submit a message.'
    );
});

app.listen(app.get('port'));
