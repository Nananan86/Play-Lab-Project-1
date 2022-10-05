const express = require('express');
const Datastore = require('nedb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`Starting server at ${port}`);
});
app.use(express.static('public'))
app.use(express.json({limit:'1mb'}));

const database = new Datastore('databse.db');
database.loadDatabase();

app.get('/dataReceiver', (request, response) => {
    database.find({}, (err, data) => {
        if(err){
            response.end();
            return;
        }
        response.send(data);
    });
});

app.post('/dataReceiver', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data)
})