const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, min: 4, unique: true},
    hashedPassword: {type: String, required: true },
    salt: {type: String},
});

const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel