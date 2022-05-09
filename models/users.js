const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    first_name : String,
    last_name: String,
    email: String,
    gender: String,
    ip_address: String,
});

module.exports = mongoose.model('users',userSchema);