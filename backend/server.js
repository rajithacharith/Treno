const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routing = require('./routes');

const PORT=4000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/',routing);

app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }else
        console.log('Server is up and running in Port:'+PORT+'.');
});