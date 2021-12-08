const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors=require("cors");
var path = require('path');

app.use(bodyParser.json());
//ROUTES 
const postsRoute = require('./routes/posts');
/*app.use(function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization");
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
}); */

app.use(cors());
//app.options('*', cors())

app.use('/posts', postsRoute);
/////////////////////////////////////////////////////////////////////////
app.use(express.static('public'));
var geom_files = path.join(__dirname,'/tippecanoe_funzionante')
app.use('/tippecanoe',express.static(geom_files))
app.use('/images', express.static(__dirname + '/Images'));
//////////////////////////////////////////////////////////////////////////
app.get('/', (req,res)=>{
    res.send("OK HOME");
});

app.listen(process.env.PORT || 5000);
