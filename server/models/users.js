const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    name: {type: String, require: true},
    mobile: {type: String},
    temp_mobile: {type: String, default: "", require: true},
    mobile_otp: {type: String, default: "", require: true},
    accessToken: {type: String, default: null},
    notes: [{type : mongoose.Schema.Types.ObjectId, ref: 'Note'}],
    likedNotes:[{type: mongoose.Schema.Types.ObjectId ,  ref: 'Note'}],
    comments:[{type: mongoose.Schema.Types.ObjectId ,  ref: 'Comment'}],
    viewedNotes: [{type : mongoose.Schema.Types.ObjectId, ref: 'Note'}],
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;