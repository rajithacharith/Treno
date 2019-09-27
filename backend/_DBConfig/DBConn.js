const mongoose = require('mongoose');

const DBName='Treno';

mongoose.connect('mongodb://user:charith123@ds029297.mlab.com:29297/treno',{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('Database connection established.');
}).catch((err)=>{
    console.log(err);
});

module.exports = mongoose;