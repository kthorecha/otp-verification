const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let users = new Schema({
    email: {
        type: String
    },
    otp: {
        type: Number
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Mongoose.model('users', users);