const functions = require('firebase-functions');
const express  = require('express');
const engines = require('consolidate');
const bodyParser = require("body-parser");
const path = require("path");
const fs = require('fs');

const app = express();
const static = express.static(__dirname + "/public");
const exphbs = require("express-handlebars");

app.use("/public",static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars',exphbs({defaultLayout: "main"}));
app.set("view engine","handlebars");

app.get('/timestamp', (request, response) =>{
    response.send(`${Date.now()}`);
});
app.get('/', function(req, res){
    res.render("test/home");
})
app.post("/", function(req, res){
    let test = JSON.stringify(req.body);

    try{
        fs.writeFileSync('test.json', test, 'utf-8');
        res.send('Website has been made. check it by the button on the page.');
        //res.render("test/home",{title:test});
    }catch(e){
        res.status(500).json({error:e});
    }
});

app.post("/result", function(req, res){
    let test1 = fs.readFileSync('test.json', 'utf-8');
    let json = JSON.parse(test1);
    let extralist = [];
    let title = json.result.parameters.title;
    let imgurl = json.result.contexts[2].parameters.image;
    let description = json.result.contexts[2].parameters.description;
    let tmplist = json.result.contexts[2].parameters.extralist;
    let forminputs = json.result.contexts[1].forminputnumber;
    let address = json.result.parameters.address;
    let email = json.result.parameters.email;
    let phone = json.result.parameters.phone;
    extralist = tmplist[0].split(' ');
    res.render("test/result",{title:title,
        imgurl:imgurl,
        description:description,
        forminputs:forminputs,
        address:address,
        email:email,
        phone:phone})
});
// app.get('/timestamp-cached', (request, response) =>{
//     response.set('Cache-control', 'public, max-age=100, s-maxage=600');
//     response.send(`${Date.now()}`);
// });

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);
