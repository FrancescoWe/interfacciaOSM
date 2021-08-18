const express = require('express');

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
    let type = req.body.type;
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

module.exports = router