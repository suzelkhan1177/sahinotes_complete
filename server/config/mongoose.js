const mongoose = require('mongoose');
const env = require("../environment");

mongoose.connect(env.MONGO_URL);

const db = mongoose.connection;

db.on('error', function(){
    console.log("error is Connecting to tha database");
})

db.once('open', function(){
   console.log("Connected to the Database");
});

module.exports = db;