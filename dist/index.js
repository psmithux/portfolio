const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require ('./routes/api/posts');

// app.use('http://localhost:5000/api/posts', posts);
app.use('/api/posts', posts);

//handle production
if(process.env.NODE_ENV==='production'){
    //static folder
    app.use(express.static(__dirname + '/public/'));
    //handle spa
    app.get(/.*/, (req, res)=>res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log (`Server started on port ${port}`));