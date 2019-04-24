var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/FindUrPanditji', {useCreateIndex: true , useNewUrlParser: true });

var db = mongoose.connection;

// User Schema
var UserSchema = mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    username: {
        type: String,
        index: true
    },
    email: {
        type: String,
        index: true
    },
    password: {
        type: String,
        index: true
    },
    contact_no: {
       type: Number,
       index: true 
    },
    years_experience: {
        type: Number,
        index: true
    },
    address: {
        type: String,
        index: true
    },
    profile_image: {
        type: String,
        index: true
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

//functions of passport
//using exports as they are functions from thr outside
module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}
module.exports.getUserByUsername = (username, callback) => {
    var query = {username: username};
    User.findOne(query, callback);
}
module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        callback(null, isMatch);
    });
}
module.exports.createUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}