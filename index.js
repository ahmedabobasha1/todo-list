const { response } = require("express");
const express = require("express");
const { param } = require("express/lib/request");
const res = require("express/lib/response");
const { json } = require("express/lib/response");
const app = express();
const PORT = 4444;
const fs = require("fs");
const helpers = require("./helper.js");
// to parse json data

app.use(express.json());


// routes

app.get('/todo', (req, response) => {
   
    response.send(helpers.listall());
});

app.get('/todo/:id',(req,response)=>{
    let res = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    const id = req.params.id;
    let newdData= res.find((elm)=>{return elm.id === parseInt(id) });

    response.send(newdData);
});

app.post('/todo', (req, response) => {
    const parseData = req.body
    helpers.add(parseData);
   response.send(parseData);
}
);

app.put("/todo/:id", (req, response) => {

    const id = req.params.id;
    const parseData = req.body
    helpers.edit(id, parseData)
    response.send()
});

app.delete("/todo/:id", (req, response) => {
    const id = req.params.id;
    helpers.remove(id)
    response.end("item remove succes")
});

app.get('/todocheck',(req,response) =>{
    
    let res = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    const newData = res.filter((elm)=>{return elm.checked == true});
   
    response.send(newData);
 });

app.get('/todouncheck',(req,response)=>{
    let res = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    const newData = res.filter((elm)=>{return elm.checked == false});
    response.send(newData);
});

app.put('/check/:id',(req,response)=>{
    const id=req.params.id
    helpers.check(id);
    response.send(helpers.check(id))


});


app.get('/uncheck/:id',(req,response)=>{
    const id=req.params.id
    helpers.uncheck(id);
    response.send(helpers.uncheck(id))


})











app.listen(PORT, (err) => {
    if (!err) return console.log(`server starts at port ${PORT}`);
})