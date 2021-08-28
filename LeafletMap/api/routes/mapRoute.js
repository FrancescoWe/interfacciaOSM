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
    let myArr = []; //the array containing the questions about that specific node.
    let myElements = []; //the row corresponding to the node or way chosen
    try{
        var csvFile = fs.readFileSync("./Quests/wayQuests.csv", 'utf8');
        csvFile = csvFile.split("\r\n");
        for (let i of csvFile){
            let myData = i;
            myData = myData.split("|");
            if(myData[0] == type && myData[2] == id){
                myArr.push(myData[1]);
                myElements.push(myData);
                //console.log("THIS IS MYDATA: " + myElements);
                //res.json(myData[1]);
                trovato = true;
            }
            //csvFile[i] = csvFile[i].split(",");
        }
        if(trovato==true){
            //console.log(myArr);
            //console.log(myData[1]);
            //res.json(myData[1]);
            res.json(myElements);
        }
        if(trovato == false){
            res.status(404).json({message: "Not Found"});
        }

    } catch (err){
        console.error(err);
        res.status(400).json({message: err});
    }
})

//In the body you have to specify the answer, question, points, object to which you answered and you have to specify also the player.
//API that calls the gamification engine in order to call the rule for a Pin that is getting answered
router.post('/engine', async (req,res) =>{
    let playerId = req.body.playerId;
    let answer = req.body.answer;
    let question = req.body.question;
    //let points = parseFloat(req.body.points).toFixed(1);
    let points = req.body.points;
    points = "20.0"; ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let element = req.body.element; //my Entire Node or Way
    engineUrl = "https://dev.smartcommunitylab.it/gamification-v3/gengine/execute"
    var user = "papyrus";
    var pw = "papyrus0704!";
    //var pwuser = user + ":" + pw;
    var auth = 'Basic ' + Buffer.from(user + ':' + pw).toString('base64');
    now = new Date();
    nowIso = now.toISOString();

    mybody = {
        "actionId": "PinAnswerCompleted",
        "data": {"points": points},
        "executionMoment": nowIso,
        "gameId": "610bb66e08813b000102e66c",
        "playerId": playerId
    }
    secondEngineUrl = "https://dev.smartcommunitylab.it/gamification-v3/exec/game/610bb66e08813b000102e66c/action/PinAnswerCompleted"

    request({
        method: 'POST',
        uri: engineUrl,
        headers : {
            "Authorization" : auth
        },
        body: {
            "actionId" : 'PinAnswerCompleted',
            "data" : {
                "gameID": "610bb66e08813b000102e66c",
                "playerID": playerId,
                "solution": {points: points}
            },
            "executionMoment": nowIso,
            "gameId": "610bb66e08813b000102e66c",
            "playerId": playerId
        },
        json:true
    },
    function(error,response,body){
        if(error){
            console.log("this is my error:" + error);
            console.log("this is my response: " + response);
        }

        // prints date & time in YYYY-MM-DD format
        //console.log(nowIso);
        console.log("MYPOINTS " + points);
        console.log(JSON.stringify(body));
        console.log("this is body: " +JSON.stringify(body));
        const myJson = JSON.stringify(response);
        console.log("this is json: " +myJson);
    })
});

router.delete('/deleteUser', async (req,res) =>{
    var user = "papyrus";
    var pw = "papyrus0704!";
    //var pwuser = user + ":" + pw;
    var auth = 'Basic ' + Buffer.from(user + ':' + pw).toString('base64');
    gameID = "610bb66e08813b000102e66c"
    playerID = "ID11"
    engineUrl = "https://dev.smartcommunitylab.it/gamification-v3/data/game/" + gameID + "/" + "player/" + playerID 
    console.log(engineUrl)
    request({
        method: 'DELETE',
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
        // prints date & time in YYYY-MM-DD format
        //console.log(nowIso);
        console.log(JSON.stringify(body));
        console.log("this is body: " +JSON.stringify(body));
        const myJson = JSON.stringify(response);
        console.log("this is json: " +myJson);
    })
})

module.exports = router


router.post('/validation', async (req,res) =>{
    let playerId = req.body.playerId;
    let answer = req.body.answer;
    let question = req.body.question;
    //let points = parseFloat(req.body.points).toFixed(1);
    let element = req.body.element; //my Entire Node or Way
    engineUrl = "https://dev.smartcommunitylab.it/gamification-v3/gengine/execute"
    var user = "papyrus";
    var pw = "papyrus0704!";
    //var pwuser = user + ":" + pw;
    var auth = 'Basic ' + Buffer.from(user + ':' + pw).toString('base64');
    now = new Date();
    nowIso = now.toISOString();

    console.log("PLAYERID: "+playerId);
    mybody = {
        "actionId": "ValidatePoint",
        "data": {},
        "executionMoment": nowIso,
        "gameId": "610bb66e08813b000102e66c",
        "playerId": playerId
    }
    secondEngineUrl = "https://dev.smartcommunitylab.it/gamification-v3/exec/game/610bb66e08813b000102e66c/action/PinAnswerCompleted"
    
    request({
        method: 'POST',
        uri: engineUrl,
        headers : {
            "Authorization" : auth
        },
        body: {
            "actionId" : 'PointInserted',
            "data" : {
                "gameID": "610bb66e08813b000102e66c",
                "playerID": playerId,
                "solution": {points: "3.0"}
            },
            "executionMoment": nowIso,
            "gameId": "610bb66e08813b000102e66c",
            "playerId": playerId
        },
        json:true
    },
    function(error,response,body){
        if(error){
            console.log("this is my error:" + error);
            console.log("this is my response: " + response);
        }

        // prints date & time in YYYY-MM-DD format
        //console.log(nowIso);
        console.log(JSON.stringify(body));
        console.log("WAAAAAAAAAAAAAAAAAAAAAAAAAAthis is body: " +JSON.stringify(body));
        const myJson = JSON.stringify(response);
        console.log("this is json: " +myJson);
    })
});