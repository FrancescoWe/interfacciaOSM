const express = require('express');
const app = express();
const bodyParser = require ("body-parser");

app.set('view engine', 'ejs')

//Import Routes
const mapsRoute = require('./api/routes/mapRoute');
const fs = require('fs');

//ROUTES
//app.use('/', mapsRoute)

app.use(bodyParser.urlencoded({extendeed:false}));
app.use(bodyParser.json());
app.use('/api/mapRoute', mapsRoute);

app.get('/', (req,res) => {
    const files = fs.readdirSync('./singleNodesFiles')
    //console.log(files);
    res.render('leafletTry', {files: files, webPreferences: {nodeIntegration: true}});
})

//Porta in cui ascolto
app.listen(3000)