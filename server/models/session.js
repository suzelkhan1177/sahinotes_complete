const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
   user: {type: mongoose.Schema.Types.ObjectId , require: true, ref: 'User'},
   expires: {type: Date, require: true}
},{

    timestamps: true
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
