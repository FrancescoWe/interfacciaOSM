const express = require('express');
const request = require('request');
var querystring = require('querystring');
var http = require('http');

const router = express.Router();


//API that returns a single node to which a question will be associated
router.get('/', async (req,res) => {
    const fs = require('fs');
    const nodeFiles = fs.readdirSync('./singleNodesFiles');
    const i = Math.floor(Math.random() * nodeFiles.length);
    //console.log(nodeFiles[i]);
    try {
        const data = fs.readFileSync('./singleNodesFiles/'+nodeFiles[i], 'utf8')
        //console.log(data);
        res.json(data);
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: err });
    }   
    //res.json(nodeFiles[i])
});

router.get('/way', async(req,res) => {
    const fs = require('fs');
    const wayFiles = fs.readdirSync('./singleWaysFiles');
    const i = Math.floor(Math.random() * wayFiles.length);
    try{
        const data = fs.readFileSync('./singleWaysFiles/' + wayFiles[i], 'utf8');
        //const data = fs.readFileSync('./singleWaysFiles/way22986312.geojson', 'utf8')
        //console.log(data);
        res.json(data);
    }catch(err){
        console.error(err);
        res.status(400).json({message: err});
    }
})

//You need to specify both the id and the type of the object you want to retrieve.
//API that returns the question associated to the Node/Way and to the ID sent in the body.
router.post('/questions', async (req,res) => {
    const fs = require('fs');
    let id = req.body.id;
    let type = req.body.type;var http = require('http');
    type = type.toUpperCase();
    let trovato = false
    let myArr = [];
    try{
        var csvFile = fs.readFileSync("./Quests/wayQuests.csv", 'utf8');
        csvFile = csvFile.split("\r\n");
        for (let i of csvFile){
            let myData = i;
            myData = myData.split("|");
            if(myData[0] == type && myData[2] == id){
                myArr.push(myData[1]);
                //res.json(myData[1]);
                trovato = true;
            }
            //csvFile[i] = csvFile[i].split(",");
        }
        if(trovato==true){
            console.log(myArr);
            //console.log(myData[1]);
            //res.json(myData[1]);
            res.json(myArr)
        }
        if(trovato == false){
            res.status(404).json({message: "Not Found"});
        }

    } catch (err){
        console.error(err);
        res.status(400).json({message: err});
    }
});

router.get('/engine', async (req,res) =>{
    engineUrl = "https://dev.smartcommunitylab.it/gamification-v3/model/game/610bb66e08813b000102e66c/action"
    var user = "papyrus";
    var pw = "papyrus0704!";
    var pwuser = user + ":" + pw;
    var auth = 'Basic ' + Buffer.from(user + ':' + pw).toString('base64');
    console.log(auth);
    console.log(pwuser);
    //var header = {'Host': 'https://dev.smartcommunitylab.it/gamification-v3/model/game', 'Authorization': auth};
    //var request = request('GET', '/', header);


    request({
        uri: engineUrl,
        headers : {
            "Authorization" : auth
        },
        json:true
    },
    function(error,response,body){
        if(error){
            console.log("this is my error:" + error);
            console.log("this is my response: " + response);
        }
        console.log("this is my response: " + response);
        console.log("this is body: " +JSON.stringify(body));
        const myJson = JSON.stringify(response);
        console.log("this is json: " +myJson);
    })
    


    /*request(engineUrl, function(error,response,body){
        const myJson = JSON.parse(body);
        console.log(myJson);
        res.status(200).send(myJson);
    })*/

    /*var form = {username: user, password: pw}
    form = querystring.stringify(form)
    request.get({
        uri: engineUrl,
        body: form,
        json:true
    },
    function(error,response,body){
        if(error){
            console.log("this is my error:" + error);
            console.log("this is my response: " + response);
        }
        console.log("this is my response: " + response);
        console.log("seems Like it worked");
        const myJson = JSON.stringify(response);
        console.log("this is body: " +JSON.stringify(body));
        console.log("this is json: " +myJson);
        res.status(200).send(myJson);
    })*/
});

module.exports = router