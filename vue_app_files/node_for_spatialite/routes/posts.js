//import wayimage from './way39170833.geojson'

const express = require('express');

const router = express.Router();

//TODO REMOVE THIS GET
router.get('/reset',(req,res)=>{
    //res.send("we are on psots");
    var sqlite = require('spatialite');
    var db = new sqlite.Database('./databases/seconda_prova');
    //var query = "SELECT id from merged where ST_Distance(GeomFromText('POINT(11.194239 46.052415)',4326),geom,0)< 700.120;"
    var query = 'UPDATE question_table SET ANSWER = ""' +" WHERE ID IS '935556427' AND TYPE IS 'WAY'" ;
    db.spatialite(function(err) {
       db.each(query, function(err, row) {
            console.log(row);
        },function(err,rows){

        });
    });
    res.send("DELETED ANSWER")
});

//EXAMPLE REST API
router.get('/', (req,res)=>{
    //res.send("we are on psots");
    var sqlite = require('spatialite');
    var db = new sqlite.Database('./databases/seconda_prova');
    //var query = "SELECT id from merged where ST_Distance(GeomFromText('POINT(11.194239 46.052415)',4326),geom,0)< 700.120;"
    var query = "SELECT id,type from merged where ST_Distance(GeomFromText('POINT(11.194239 46.052415)',4326),geom,0)< 700.120 UNION ALL SELECT id,type FROM node_merged where ST_Distance(GeomFromText('POINT(11.194239 46.052415)',4326),geom,0)< 2500.120"
    db.spatialite(function(err) {
        db.each(query, function(err, row) {
        console.log(row);
        });
    });
    
    res.send("We're on post")
});

//GET ID AND TYPE OF ALL NODES AND WAYS INSIDE A CERTAIN AREA
router.post('/',(req,res)=>{
    const lat = req.body.latitude;
    const long = req.body.longitude;
    //console.log(req.body)
    var sqlite = require('spatialite');
    var db = new sqlite.Database('./databases/seconda_prova');
    var query = "SELECT id,type from merged where ST_Distance(GeomFromText('POINT(" + long + " " + lat + ")',4326),geom,0)< 700.120"+
                " UNION ALL SELECT id,type FROM node_merged where ST_Distance(GeomFromText('POINT(" + long + " " + lat + ")',4326),geom,0)< 2500.120"
    console.log(query)
    const my_array = []
    db.spatialite(function(err){
        db.each(query, function(err,row){
            element = row;
            //console.log(element)
            my_array.push(element);
        },function(err,rows){
            //console.log(element)
            console.log(my_array);
            db.close();
            //my_json = JSON.stringify(my_array)
            //HERE I SHOULD LOOK WHEThER OR NOT MY NODES AND WAYS HAVE ALREADY AN ANSWER OR NOT
            res.status(200).send(my_array);
        })
    })
})

//GET MISSION FOR THE SINGLE NODE/WAY WITH A CERTAIN ID
router.get('/:geomid&:type',(req,res)=>{
    //console.log("yeah?")
    const type = req.params.type;
    const my_id = req.params.geomid;
    var sqlite = require('spatialite');
    var db = new sqlite.Database('./databases/seconda_prova');
    //var query = "SELECT * FROM 'question_table' WHERE ID IS '" + my_id +"' AND TYPE IS '" + type + "';";
    var query = "SELECT * FROM 'question_table' WHERE ID IS '" + my_id +"' AND TYPE IS '" + type + "' AND ANSWER IS " + '""'+";";
    console.log(query)
    const my_array = [];
    db.spatialite(function(err){
        db.each(query, function(err,row){
            //console.log(row)
            element = row;
            my_array.push(element)
        },function(err,rows){
            console.log(my_array);
            db.close();
            res.status(200).send(my_array);
        })
    }) 
})

//GET ALL INFO ABOUT WAY AND NODE WITH A CERTAIN ID AND TYPE, REQUIRES DATA WITH ID AND TYPE OF THE OBJECT (ex: "data":[{"id": 23762376, "type":"way"},{"id": 292315332, "type":"way"},{"id": 303166646,  "type":"way"}],)
router.post('/getAllWithIds', (req,res)=>{
    const data = req.body.data
    var sqlite = require('spatialite');
    var db = new sqlite.Database('./databases/seconda_prova');
    if(data == null){
        res.status(400).send("no ids found")
    }
    my_array = []
    for(var i in data){
        my_array.push(data[i]);
    }
    var query = "SELECT * FROM 'question_table' WHERE ID IS "
    for (var i in my_array){
        query = query + my_array[i].id +" AND TYPE IS '" +my_array[i].type.toUpperCase() + "' OR ID IS "
    }
    query = query.substring(0, query.length-10);
    //console.log(query);
    my_result = []
    db.spatialite(function(err){
        db.each(query, function(err,row){
            element = row;
            my_result.push(element)
        },function(err,rows){
            console.log(my_result);
            db.close();
            res.status(200).send(my_result);
        })
    }) 
})

//ADD THE ANSWER TO THE ELEMENT WITH A CERTAIN ID AND QUESTION, ID ANSWER TYPE AND QUESTION ARE REQUESTED IN THE BODY
router.post('/addAnswer',(req,res)=>{
    const answer= req.body.answer;
    const id = req.body.id;
    const question = req.body.question;
    const type = req.body.type;

    console.log(answer)
    var sqlite = require('spatialite');
    var db = new sqlite.Database('./databases/seconda_prova');
    var query = "UPDATE question_table SET ANSWER = '" + answer + "' WHERE ID = " +id+" AND QUESTION = '" + question + "'" + "AND TYPE = '" + type +"';" 
    //var query = "SELECT * FROM question_table WHERE ID = 39170833 AND QUESTION = 'Posso andare in bicicletta per questa strada?';" 
    //const my_array = []
    db.spatialite(function(err){
        db.each(query, function(err,row){
            element = row;
            //my_array.push(element);
        },function(err,rows){
            //console.log(my_array);
            db.close();
            //my_json = JSON.stringify(my_array)
            if(err){
                res.status(400).send(err);
            }else{
                console.log("working...")
                res.status(200).send();
            }
        })
    })
    //console.log("queried");
})

//GET ALL GEOJSON FILES SPECIFIED IN THE BODY
router.post('/getgeojson',(req,res)=>{
    const fs = require('fs');
    const data = req.body.data
    if(data == null){
        res.status(400).send("no ids found")
    }
    var files = []//{"myjsons":[]};//[];
    //JSON.parse(files);
    //console.log("error?")
    for(var i in data){
        if(data[i].type == "node"){
            try{
                file = "./my_files/singleNodesFiles/node" + data[i].id + ".geojson";
                var file_to_add = fs.readFileSync(file,'utf-8')
                JSON.parse(file_to_add)
            }catch(err){
                console.error(err)
                res.status(400).json({message:err});
            }
        }else{
            try{
                file = "./my_files/singleWaysFiles/way" + data[i].id + ".geojson";
                var file_to_add = fs.readFileSync(file,'utf-8')
                JSON.parse(file_to_add)
            }catch(err){
                console.error(err)
                res.status(400).json({message:err});
            } 
        }
        files.push(file_to_add)
        //files.myjsons.push(file_to_add);
        JSON.stringify(files)
        //console.log("WEEEEEEE"+files)
        //JSON.parse(files)
    }
    res.json(files)
    //res.download(files);
})

//GET ALL WAYS THAT HAVE ALL ANSWERS COMPLETED
router.get('/way/checkcompleted',(req,res)=>{
    var sqlite = require('spatialite');
    var db = new sqlite.Database('./databases/seconda_prova');
    //var query = "SELECT * FROM 'question_table' WHERE ID IS '" + my_id +"' AND TYPE IS '" + type + "';";
    var query = "SELECT ID FROM 'completed_table' WHERE completed IS " + '"yes" AND type IS "way"';
    console.log(query)
    const my_array = [];
    db.spatialite(function(err){
        db.each(query, function(err,row){
            //console.log(row)
            element = row;
            my_array.push(element)
        },function(err,rows){
            console.log(my_array);
            db.close();
            res.status(200).send(my_array);
        })
    }) 
})

//GET ALL NODES THAT HAVE ALL ANSWERS COMPLETED
router.get('/node/checkcompleted',(req,res)=>{
    var sqlite = require('spatialite');
    var db = new sqlite.Database('./databases/seconda_prova');
    //var query = "SELECT * FROM 'question_table' WHERE ID IS '" + my_id +"' AND TYPE IS '" + type + "';";
    var query = "SELECT * FROM 'completed_table' WHERE completed IS " + '"yes" AND type IS "node"';
    console.log(query)
    const my_array = [];
    db.spatialite(function(err){
        db.each(query, function(err,row){
            //console.log(row)
            element = row;
            my_array.push(element)
        },function(err,rows){
            console.log(my_array);
            db.close();
            res.status(200).send(my_array);
        })
    }) 
})

//UPDATE TABLE TO KNOW IF NODE/WAY HAVE ALL THEIR ANSWERS COMPLETED
router.post("/allAnswerCompleted",(req,res)=>{
    const id = req.body.id
    var type = req.body.type
    type = type.toLowerCase();
    var sqlite = require('spatialite');
    var db = new sqlite.Database('./databases/seconda_prova');
    var query = 'UPDATE completed_table SET completed = "yes" WHERE ID = "'+id+'" AND TYPE = "'+type+'";'; 
    console.log(query)
    db.spatialite(function(err){
        db.each(query, function(err,row){
            element = row;
        },function(err,rows){
            db.close();
            if(err){
                res.status(400).send(err);
            }else{
                console.log("working...")
                res.status(200).send();
            }
        })
    })
})

//serve solo per resettare tutto durante le prove
router.get("/resetAllCompleted",(req,res)=>{
    var sqlite = require('spatialite');
    var db = new sqlite.Database('./databases/seconda_prova');
    var query = 'UPDATE completed_table SET completed = "no" WHERE ID = "935556427" AND TYPE = "way";'; 
    console.log(query)
    db.spatialite(function(err){
        db.each(query, function(err,row){
            element = row;
        },function(err,rows){
            db.close();
            if(err){
                res.status(400).send(err);
            }else{
                console.log("working...")
                res.status(200).send();
            }
        })
    })
})

router.delete('/delete/:type&:geomid',(req,res)=>{
    const fs = require('fs');
    id = req.params.geomid;
    type = req.params.type;
    console.log(id+" "+type);
    /*var file_path=""
    if(type=="WAY"){
        file_path= fs.readdirSync('./tippecanoe_funzionante/singleWaysFiles');
    }else{
        file_path= fs.readdirSync('./tippecanoe_funzionante/singleNodesFiles');
    }*/


})

/*
router.get('/anotherTry',(req,res)=>{
    file = './routes/allWaysDirectory'
    console.log("gino");
    res.download(file);
})

router.get('/lettry',(req,res)=>{
    file = './routes/way39170833.geojson'
    res.download(file);
    //res.status(200).send(file);
})*/

/*router.get('/geturls',(req,res)=>{
    const fs = require('fs');
    var fullUrl = req.protocol + '://' + req.get('host');
    //console.log(fullUrl)
    var my_array = []
    const files = fs.readdirSync('./tippecanoe_funzionante/newTry/');
    var to_add = ""
    for(var i in files){
        console.log(files[i])
        to_add = fullUrl + "/tippecanoe/newTry/" + files[i] +"/{z}/{x}/{y}.pbf"
        my_array.push(to_add)
    }
    console.log(my_array)
    res.send(my_array)
})*/

router.get('/user/getTokenApi',(req,res)=>{
    var request = require("request");

    var options = { method: 'POST',
      url: 'https://prova-osm.eu.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      body: '{"client_id":"Kw4kSkZdWcZ1NhOGrfJcDBwq0j5PkvuN","client_secret":"8TQRX_Na-yhPEgQYakBzcYcQuDE90leyPfMTj4X6MLaUWIL5SAS3jVSJUhH-3BON","audience":"https://prova-osm.eu.auth0.com/api/v2/","grant_type":"client_credentials"}' };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.send(body)
    });
})

router.post('/user/changeUsername',(req,res)=>{
    var request = require("request");
    var user_id = req.body.user_id;
    var new_name = req.body.new_name;
    var user_acc_token = req.headers.authorization;
    //console.log(request);
    var my_url = 'https://prova-osm.eu.auth0.com/api/v2/users/' + user_id;
    var my_body = {
        "nickname" : new_name
    }
    var options ={ method:'PATCH',
        url: my_url,
        headers: {'Content-Type': 'application/json',"Authorization": user_acc_token},
        body: JSON.stringify(my_body)
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        //console.log(body)
        res.send(response)
      });

})

module.exports = router;

    /*
    //console.log(this.$auth.user.nickname)
            var acc_token = await this.$auth.getTokenApi();
            var user_id = this.$auth.user.sub;
            console.log(acc_token);
            var token_to_use = "Bearer " + acc_token.access_token;
            var my_body = {
                "nickname" : new_name
            }
            var my_request = {
            method: "patch",
            headers: {"Authorization": token_to_use},
            body: my_body
            }
            var my_url = 'https://prova-osm.eu.auth0.com/api/v2/users/' + user_id;
            try{
            const fetchdata = await fetch(my_url,my_request)
            .then(response => response.json())
            .then((new_response_data)=>{
                console.log(new_response_data); 
                return new_response_data;
            }).catch((err)=>console.log(err))
                return fetchdata
            }catch(e){
                console.log(e)
            }
    */