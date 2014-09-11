var mongoose = require('mongoose')
  , crypto = require('crypto')
  ;

//define user schema
var userSchema = mongoose.Schema({
  firstName:        { type: String, required: '{PATH} is required!' }
  , lastName:       { type: String, required: '{PATH} is required!' }
  , username:       {
    type: String
    , required: '{PATH} is required!'
    , unique:true
  }
  , password_salt:  { type: String, required: '{PATH} is required!' }
  , password_hash:  { type: String, required: '{PATH} is required!' }
  , roles:          [String]
});

//user instance methods
userSchema.methods = {
  authenticate: function(passwordToMatch) {
    console.log("trying to authenticate username '" + this.username + "'");
    // console.log(this);
    // console.log(User.hashPassword(this.password_salt, passwordToMatch) === this.password_hash);
    // var inputHash = User.hashPassword(this.password_salt, passwordToMatch);
    // var storedHash = this.password_hash;
    // console.log(inputHash);
    // console.log(storedHash);
    return User.hashPassword(this.password_salt, passwordToMatch) === this.password_hash;
  }
  , hasRole: function(role) {
    return this.roles.indexOf(role) > -1;
  }
};

//user model static methods
userSchema.statics = {
  createPasswordSalt: function() {
    return crypto.randomBytes(256).toString('base64');
  }
  , hashPassword: function(salt, password) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(password).digest('hex');
  }
}

var User = mongoose.model('User', userSchema);

//user model methods
function createDefaults() {
  User.find({}).exec(function(err, users) {
    if(users.length === 0) {
      var password_salt, password_hash;
      password_salt = User.createPasswordSalt();
      password_hash = User.hashPassword(password_salt, 'admin');
      User.create({firstName:'Admin', lastName:'Admin', username:'admin', password_salt: password_salt, password_hash: password_hash, roles: ['admin']});
      console.log("created initial default user w/ username 'admin' and password 'admin'");
    }
  });
};

exports.createDefaults = createDefaults;
