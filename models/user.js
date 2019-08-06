var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema
var UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
});

// Create a model
const User = mongoose.model('User', UserSchema);

// Export the model
module.exports = User;