//after app = express();
app.engine('handlebars', engine.handlebars);
app.get('/timestamp', (request, response) =>{
    response.send(`${Date.now()}`);
});
app.post("/", function(req, res){
    let test = req.body.id;

    try{
        res.render("test/result",{id:test});
    }catch(e){
        res.status(500).json({error:e});
    }
});